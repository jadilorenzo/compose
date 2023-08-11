import React, { useContext } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import IconButton from '../ui/IconButton'
import TextButton from '../ui/TextButton'
import DocumentName from './DocumentName'

const DocumentToolbar = () => {
  const {
    activeStyles,
    toggleBoldStyle,
    toggleItalicStyle,
    toggleUnderlinedStyle,
    toggleStrikethroughStyle,
    createMathElement,
    percentSize,
    setPercentSize
  } = useContext(DocumentContext)

  return (
    <div className='menu-bar surface'>
      <DocumentName />
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
      <div style={{flexGrow: 1}}/>
      <div style={{display: 'flex'}}>
        <IconButton onClick={() => setPercentSize(percentSize => percentSize + 25)}>
          add_circle
        </IconButton>
        <div className='size'>{percentSize}%</div>
        <IconButton onClick={() => setPercentSize(percentSize => percentSize - 25)}>
          remove_circle
        </IconButton>
      </div>
    </div>
  )
}

export default DocumentToolbar