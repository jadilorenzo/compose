import React, { createContext, useState } from "react"
import useHandleDocument from "../hooks/useHandleDocument"
import Document from "../../models/Document"

export const TextEditorContext = createContext<any>({})

const TextEditorProvider = (props: { children: any }) => {
  // to force update upon class change
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);
  // will require you to say "window.document." vs. "document."
  const [document, setDocumentState] = useState(new Document())
  const setDocument = (props) => {
    setDocumentState(props)
    forceUpdate()
  }

  const [selectionStartIndex, setSelectionStartIndex] = useState<number | undefined>(undefined)
  const [hoverSelectionIndex, setHoverSelectionIndex] = useState(0)
  const [activeStyles, setActiveStyles] = useState<string[]>([])
  
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
    setDocument((prevDocument) => prevDocument.styleSelection({ style: 'bold' }))
    toggleActiveStyles('bold')
  }
  
  const toggleItalicStyle = () => {
    setDocument((prevDocument) => prevDocument.styleSelection({ style: 'italics' }))
    toggleActiveStyles('italics')
  }
  
  const toggleUnderlinedStyle = () => {
    setDocument((prevDocument) => prevDocument.styleSelection({ style: 'underlined' }))
    toggleActiveStyles('underlined')
  }
  
  const toggleStrikethroughStyle = () => {
    setDocument((prevDocument) => prevDocument.styleSelection({ style: 'strikethrough' }))
    toggleActiveStyles('strikethrough')
  } 

  const createMathElement = () => {
    setDocument((prevDocument) => prevDocument.createMathElement())
  }
  
  useHandleDocument({ 
    document, setDocument, 
    activeStyles, toggleActiveStyles,
    toggleBoldStyle,
    toggleItalicStyle,
    toggleUnderlinedStyle,
    toggleStrikethroughStyle,
  })

  // console.log(document)

  return (
    <TextEditorContext.Provider value={{
      document, setDocument,
      selectionStartIndex, setSelectionStartIndex,
      hoverSelectionIndex, setHoverSelectionIndex,
      toggleBoldStyle,
      toggleItalicStyle,
      toggleUnderlinedStyle,
      toggleStrikethroughStyle,
      activeStyles,
      createMathElement
    }}>
      {props.children}
    </TextEditorContext.Provider>
  )
}

export default TextEditorProvider