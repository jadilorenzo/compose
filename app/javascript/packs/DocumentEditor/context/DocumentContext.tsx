import React, { useState } from 'react'
import Character from '../../models/Character'
import EndOfFile from '../../models/EndOfFile'
import EndOfLine from '../../models/EndOfLine'
import { insert, remove } from '../../models/utils'
import useHandleDocument from '../hooks/useHandleDocument'

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

  const _createCharacter = ({ text, styles = [] }: { text: string, styles?: string[] }): Character => {
    return new Character({ text, styles })
  }

  const _createEndOfFile = ():EndOfFile => new EndOfFile()
  const _createEndOfLine = ():EndOfLine => new EndOfLine()

  const _handleEndOfFileCharacter = () => {
    _removeEndOfFileCharacter()
    _addEndOfFileCharacter()
  }

  const _removeEndOfFileCharacter = () => {
    setElements(elements => elements.filter(character => !(character.type === 'EOF')))
  }

  const _addEndOfFileCharacter = () => {
    setElements([...elements, _createEndOfFile()])
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
    
    _handleEndOfFileCharacter()
    setElements(elements => insert(
      elements,
      position,
      endOfLine ? _createEndOfLine() : _createCharacter({ text: key, styles })
    ) as Element[])
    cursorRight()
    _handleEndOfFileCharacter()
  }

  const cursorLeft = () => {
    if (position !== 0) setPosition(position => position - 1)    
  }

  const cursorRight = () =>  {
    if (position !== elements.length - 1) setPosition(position => position + 1)
  }

  const select = (selection: Selection) => {
    if (
      Math.abs(
        selection.start -
        selection.end
      ) > elements.length
    ) throw new Error(`Invalid selection: ${JSON.stringify(selection)}`)

    let sortedSelection = selection
    if (selection.start > selection.end) sortedSelection = { start: selection.end, end: selection.start }

    setSelection(sortedSelection)
  }

  const resetSelection = () => {
    setSelection(undefined)
  }

  const _removeCharacter = () => {
    _removeEndOfFileCharacter()

    const index = position
    const lastIndex = index === elements.length
    setElements(elements => remove(
      elements,
      index - 1
    ) as Element[])
    cursorLeft()

    _handleEndOfFileCharacter()
  }

  const _toggleStyle = ({ character, style }: { character: Element, style: string }) => {
    if (character.styles?.includes(style)) {
      character.styles = character.styles.filter(oldStyle => oldStyle !== style)
    } else {
      character.styles = [...character.styles, style]
    }
  }

  const backspace = () => {
    if (selection) {
      setPosition(selection.end)
      while (
        position !==
        selection.start
      ) {
        _removeCharacter()
      }
    } else {
      _removeCharacter()
    }
  }

  const _textOfSelection = ({ selection }: { selection: Selection }) => {
    return elements.slice(selection.start, selection.end).map(element => element.text).join('')
  }

  const createMathElement = () => {
    if (selection) {
      const text = _textOfSelection({ selection: selection })
      setPosition(selection.start)
      backspace()
      resetSelection()

      _handleEndOfFileCharacter()
      setElements(elements => insert(
        elements,
        position,
        new Character({ type: 'MATH', text })
      ) as Element[])
      cursorRight()
      _handleEndOfFileCharacter()
    } else {
      _handleEndOfFileCharacter()
      setElements(elements => insert(
        elements,
        position,
        new Character({ type: 'MATH', text: 'f(x)' })
      ) as Element[])
      cursorRight()
      _handleEndOfFileCharacter()
    }
  }

  const styleSelection = ({ style }: { style: string }) =>{
    if (selection) {
      setPosition(selection.start)
      while (
        position !==
        selection.end
      ) {
        _toggleStyle({ character: elements[position], style })
        cursorRight()
      }
    }
  }


  const toggleActiveStyles = (style: string) => {
    console.log(style)
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

  useHandleDocument({
    typeCharacter,
    typeNewLine,
    resetSelection,
    backspace,
    cursorLeft,
    cursorRight,
    activeStyles, toggleActiveStyles,
    toggleBoldStyle,
    toggleItalicStyle,
    toggleUnderlinedStyle,
    toggleStrikethroughStyle,
  })

  return (
    <DocumentContext.Provider value={{
      position,
      elements,
      selection,
      selectionStartIndex,
      hoverSelectionIndex,
      activeStyles,
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
      // _createCharacter,
      // _createEndOfFile,
      // _createEndOfLine,
      // _handleEndOfFileCharacter,
      // _removeEndOfFileCharacter,
      // _addEndOfFileCharacter,
      // _removeCharacter,
      // _toggleStyle,
      // _textOfSelection,
    }}>
      {props.children}
    </DocumentContext.Provider>    
  )
}

export default DocumentProvider