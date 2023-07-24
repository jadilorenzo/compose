import React, { useContext } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import IconButton from '../ui/IconButton'

const DocumentToolbar = () => {
  const {
    activeStyles,
    toggleBoldStyle,
    toggleItalicStyle,
    toggleUnderlinedStyle,
    toggleStrikethroughStyle,
    createMathElement
  } = useContext(DocumentContext)
  return (
    <div className='menu-bar surface'>
      <div className="horizontal-btn-group">
        <div className="combined-horizontal-btn-group">
          <IconButton 
            active={activeStyles.includes('bold')} 
            toggleActive={() => toggleBoldStyle()}
          >
            format_bold
          </IconButton>
          <IconButton 
            active={activeStyles.includes('underlined')} 
            toggleActive={() => toggleUnderlinedStyle()}
          >
            format_underlined
          </IconButton>
          <IconButton 
            active={activeStyles.includes('italics')} 
            toggleActive={() => toggleItalicStyle()}
          >
            format_italic
          </IconButton>
          <IconButton 
            active={activeStyles.includes('strikethrough')} 
            toggleActive={() => toggleStrikethroughStyle()}
          >
            format_strikethrough
          </IconButton>
        </div>
        <IconButton 
            toggleActive={() => createMathElement()}
        >
          function
        </IconButton>
      </div>
    </div>
  )
}

export default DocumentToolbar