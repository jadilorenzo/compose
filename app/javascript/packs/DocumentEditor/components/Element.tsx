import React, { useContext } from 'react'
import { DocumentContext } from '../context/DocumentContext'

const Element = ({ element }) => {
  const activeStyles = {
    bold: false,
    underlined: false,
    italics: false,
    strikethrough: false
  }
  element.styles.forEach((style) => {
    activeStyles[style] = true
  })
  const {bold, underlined, italics, strikethrough} = activeStyles
  const {fontSize} = useContext(DocumentContext)

  return (
    <span className='element' style={{
      fontWeight: bold ? 'bold' : undefined,
      textDecoration: `${underlined ? 'underline' : ''} ${strikethrough ? 'line-through' : ''}`,
      fontStyle: italics ? 'italic' : undefined, 
      minWidth: `calc(${fontSize * element.fontSize / 5} * 1rem)`
    }}>
      {element.text}
    </span>
  )
}

export default Element