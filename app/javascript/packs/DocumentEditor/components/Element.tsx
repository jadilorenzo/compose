import React from 'react'

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

  return (
    <span className='element' style={{
      fontWeight: bold ? 'bold' : undefined,
      textDecoration: `${underlined ? 'underline' : ''} ${strikethrough ? 'line-through' : ''}`,
      fontStyle: italics ? 'italic' : undefined,
    }}>
      {element.text}
    </span>
  )
}

export default Element