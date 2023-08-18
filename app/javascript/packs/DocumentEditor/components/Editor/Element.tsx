import React, { useContext } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import { SizingContext } from '../../context/SizingContext'

const Element = ({ element }) => {
  const activeStyles = {
    bold: false,
    underlined: false,
    italics: false,
    strikethrough: false
  }

  element.styles.forEach((style) => activeStyles[style] = true)
  
  const {bold, underlined, italics, strikethrough} = activeStyles
  const { mininumElementWidth } = useContext(SizingContext)

  return (
    <span className='element' style={{
      fontWeight: bold ? 'bold' : undefined,
      textDecoration: `${underlined ? 'underline' : ''} ${strikethrough ? 'line-through' : ''}`,
      fontStyle: italics ? 'italic' : undefined, 
      minWidth: mininumElementWidth(element.fontSize)
    }}>
      {element.text}
    </span>
  )
}

export default Element