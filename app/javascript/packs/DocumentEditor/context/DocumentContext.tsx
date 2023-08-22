import React, { useContext, useEffect, useRef, useState } from 'react'
import Character from '../../models/Character'
import EndOfFile from '../../models/EndOfFile'
import EndOfLine from '../../models/EndOfLine'
import { insert, isEOF, isEOL, remove } from '../../models/utils'
import useHandleDocument from '../hooks/useHandleDocument'
import useFetchDocument from '../hooks/useFetchDocument'
import useSaveDocument from '../hooks/useSaveDocument'
import useWatchFontSize from '../hooks/useWatchFontSize'
import { FocusContext } from './FocusContext'

export type Element = EndOfFile | EndOfLine | Character

export interface Selection { start: number, end: number }

export const DocumentContext = React.createContext<any>({})

const DocumentProvider = (props: { children: React.ReactNode }) => {
  const [position, setPosition] = useState<number>(0)
  const [elements, setElements] = useState <Element[]>([])
  const [selection, setSelection] = useState<undefined | Selection>(undefined)
  const [selectionStartIndex, setSelectionStartIndex] = useState<number | undefined>(undefined)
  const [hoverSelectionIndex, setHoverSelectionIndex] = useState(0)
  const [activeStyles, setActiveStyles] = useState<string[]>([])
  const [focus, setDocumentFocus] = useState<boolean>(true)
  const [percentSize, setPercentSize] = useState<number>(100)
  const [currentFontSize, setFontSize] = useState<number>(elements[position]?.fontSize || 11)
  const size = percentSize/21
  const fontSize = size * (0.15/11)
  if (percentSize <= 0) setPercentSize(100)
  if (percentSize > 300) setPercentSize(300)
  const {setFocus} = useContext(FocusContext)

  const [loaded, setLoaded] = useState<boolean>(false)

  const _createCharacter = ({ text, styles = [], fontSize = 11 }: { text: string, styles?: string[], fontSize: number }): Character => {
    return new Character({ text, styles, fontSize })
  }

  const _createEndOfFile = ():EndOfFile => new EndOfFile()
  const _createEndOfLine = ():EndOfLine => new EndOfLine()

  const _resetEndOfFileCharacter = () => {
    _removeEndOfFileCharacter()
    _addEndOfFileCharacter()
  }

  const _removeEndOfFileCharacter = () => {
    setElements(elements => elements.filter(character => !(character.type === 'EOF')))
  }

  const _addEndOfFileCharacter = () => {
    setElements(elements => [...elements, _createEndOfFile()])
  }

  const typeNewLine = () => typeCharacter({ key: '', endOfLine: true })

  const typeCharacter = ({ key, styles = [], endOfLine = false } : {
      key: string,
      styles?: string[]
      endOfLine?: boolean
  }) => {
    if (key.split('').length !== 1 && !endOfLine) {
      throw new Error(`Single key expected. Received "${key}"`)
    }
    if (selection) backspace()
    
    _resetEndOfFileCharacter()
    setPosition((position) => {
      setFontSize((fontSize) => {
        setElements(elements => {
          return insert(
              elements,
              position,
              endOfLine ? _createEndOfLine() : _createCharacter({ text: key, styles, fontSize })
          ) as Element[]
        })
        return fontSize
      })
      return position + 1
    })
    _resetEndOfFileCharacter()
  }

  const cursorLeft = () => {
    setPosition(position => {
      if (position !== 0) return position - 1
      return position
    })
  }

  const cursorRight = () =>  {
    setElements(elements => {
      setPosition(position => {
        if (position !== elements.length - 1) return position + 1
        return position
      })
      return elements
    })
  }
  
  const select = (newSelection: Selection) => {
    setSelection(() => {
      if (
        Math.abs(
          newSelection.start -
          newSelection.end
        ) > elements.length
      ) throw new Error(`Invalid selection: ${JSON.stringify(newSelection)}`)
      
      let sortedSelection = newSelection
      if (newSelection) if (newSelection.start > newSelection.end) sortedSelection = { start: newSelection.end, end: newSelection.start }
      
      return sortedSelection
    })
  }

  const findLine = (index: number) => {
    return find(index, isEOL)
  }

  const selectLine = (index: number) => {
    select(findLine(index))
  }

  const findWord = (index: number) => {
    return find(index, element => isEOL(element) || element.text === ' ') 
  }

  const selectWord = (index) => {
    select(findWord(index))
  }

  const find = (index, elementSearch) => {
    const reversedElements = elements.slice(0, index + 1).reverse()

    let start = reversedElements.findIndex(elementSearch)
    start = start !== -1 ? index - start : 0

    let end = elements.findIndex((element, i) => i > index && elementSearch(element))

    if (end === -1) end = elements.length

    return { 
      start: start + (start !== 0 ? 1 : 0), 
      end: end - (end !== elements.length ? 1 : 0) 
    }
  }

  const resetSelection = () => {
    // setFocus(true)
    setSelection(undefined)
  }

  const _removeCharacter = (customPosition?: number) => {
    _removeEndOfFileCharacter()

    setPosition(position => {
      const currentPosition = (customPosition || position)
      setElements(elements => remove(
        elements,
        currentPosition - 1
      ) as Element[])
      if (position !== 0) cursorLeft()
      return currentPosition
    })

    _resetEndOfFileCharacter()
  }

  const _toggleStyle = ({ character, style }: { character: Element, style: string }) => {
    if (character.styles?.includes(style)) {
      character.styles = character.styles.filter(oldStyle => oldStyle !== style)
    } else {
      character.styles = [...character.styles, style]
    }
  }

  const backspace = () => {
    setSelection(selection => {
    setPosition(position => {
        if (selection) {
          setElements(elements => {
            elements.splice(selection.start, selection.end - selection.start + 1)
            return elements
          })
          return selection?.start || position
        } else {
          if (position === 0) return position
          _removeCharacter()
        }
        return position
      })
      return selection
    })
  }

  const _textOfSelection = ({ selection }: { selection: Selection }) => {
    return elements.slice(selection.start, selection.end + 1).map(element => element.text).join('')
  }

  const createMathElement = (inline = true) => {
    setPosition(position => {
      setSelection(selection => { 
        if (selection) {
          const text = _textOfSelection({ selection })
          position = selection.start
          backspace()
          resetSelection()
    
          _resetEndOfFileCharacter()
          setElements(elements => insert(
            elements,
            position,
            new Character({ type: inline ? 'MATH_I' : 'MATH_B', text })
          ) as Element[])
          cursorRight()
          _resetEndOfFileCharacter()
        } else {
          _resetEndOfFileCharacter()
          setElements(elements => insert(
            elements,
            position,
            new Character({ type: inline ? 'MATH_I' : 'MATH_B', text: 'fx' })
          ) as Element[])
          cursorRight()
          _resetEndOfFileCharacter()
        }
        return undefined
      })
      return position
    })
  }

  const styleSelection = ({ style }: { style: string }) => {
    setElements(elements => {
      setSelection(selection => {
        if (!selection) return

        let positionCounter = selection.start
        while (
          positionCounter !==
          selection.end + 1
        ) {
          _toggleStyle({ character: elements[positionCounter], style })
          positionCounter++
        }
          
        setPosition(selection.end)
        return selection
      })
      return elements
    })
  }


  const toggleActiveStyles = (style: string) => {
    setActiveStyles((prevStyles) => {
      if (prevStyles.includes(style)) {
        return prevStyles.filter(prevStyle => prevStyle !== style)
      } else {
        return [...prevStyles, style]
      }
    })
  }


  const toggleBoldStyle = () => {
    styleSelection({ style: 'bold' })
    toggleActiveStyles('bold')
  }

  const toggleItalicStyle = () => {
    styleSelection({ style: 'italics' })
    toggleActiveStyles('italics')
  }

  const toggleUnderlinedStyle = () => {
    styleSelection({ style: 'underlined' })
    toggleActiveStyles('underlined')
  }

  const toggleStrikethroughStyle = () => {
    styleSelection({ style: 'strikethrough' })
    toggleActiveStyles('strikethrough')
  }

  const changeElementText = ({ index, text }) => {
    setElements((elements) => {
      elements[index].text = text
      return elements
    })
  }

  const confirmFontSize = (fontSize) => {
    const {start, end} = findLine(position)
    setElements((elements) => {
      let positionCounter = start
      while (
        positionCounter !==
        end
      ) {
        elements[positionCounter].fontSize = fontSize
        positionCounter++
      }
      return elements
    })
  }

  const elementLines: Element[][] = [[]]
  elements.forEach((element: Element, index) => {
    if (isEOL(element)) {
      elementLines[elementLines.length - 1].push(element)
      elementLines.push([])
    } else {
      elementLines[elementLines.length - 1].push(element)
    }
  })

  useEffect(() => {
    setFontSize(elements[position]?.fontSize || 11)
  }, [position])

  useWatchFontSize({ elements, setElements, elementLines })

  const root = document.getElementById('DocumentEditor')
  const id = root?.getAttribute('data-id') as string

  useSaveDocument({
    elements,
    position,
    loaded,
    setElements,
    setPosition,
    setPercentSize,
    id,
    percentSize,
  })
  
  useFetchDocument({
    setElements,
    setPosition,
    setSelection,
    setLoaded,
    setPercentSize,
    id
  })

  return (
    <DocumentContext.Provider value={{
      id,
      position,
      elements,
      selection,
      selectionStartIndex,
      hoverSelectionIndex,
      activeStyles,
      focus,
      elementLines,
      typeNewLine,
      typeCharacter,
      cursorLeft,
      cursorRight,
      select,
      resetSelection,
      backspace,
      createMathElement,
      styleSelection,
      toggleActiveStyles,
      toggleBoldStyle,
      toggleItalicStyle,
      toggleUnderlinedStyle,
      toggleStrikethroughStyle,
      setSelectionStartIndex,
      setHoverSelectionIndex,
      changeElementText,
      setPosition,
      setDocumentFocus,
      size,
      fontSize,
      percentSize,
      setPercentSize,
      selectLine,
      selectWord,
      setFontSize,
      currentFontSize,
      confirmFontSize
    }}>
      {props.children}
    </DocumentContext.Provider>    
  )
}

export default DocumentProvider