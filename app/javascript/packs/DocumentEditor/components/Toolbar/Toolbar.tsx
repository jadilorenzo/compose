import React, { useContext } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import IconButton from '../../ui/IconButton'
import TextButton from '../../ui/TextButton'
import Title from './Title'
import FontSize from './FontSize'

const Toolbar = () => {
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
  
  const boldButton = (
    <IconButton 
      tooltip="Bold" 
      active={activeStyles.includes('bold')} 
      toggleActive={() => toggleBoldStyle()}>
      format_bold
    </IconButton>
  )
  const underlinedButton = (
    <IconButton 
      tooltip="Underlined" 
      active={activeStyles.includes('underlined')} 
      toggleActive={() => toggleUnderlinedStyle()}>
      format_underlined
    </IconButton>
  )
  const italicsButton = (
    <IconButton 
      tooltip="Italics" 
      active={activeStyles.includes('italics')} 
      toggleActive={() => toggleItalicStyle()}>
      format_italic
    </IconButton>
  )
  const strikethroughButton = (
    <IconButton 
      tooltip="Strikethrough" 
      active={activeStyles.includes('strikethrough')} 
      toggleActive={() => toggleStrikethroughStyle()}>
      format_strikethrough
    </IconButton>
  )

  return (
    <div className='toolbar'>
      <div className='content'>
        <Title />
        <div className="horizontal-btn-group">
          <div className="combined-horizontal-btn-group">
            {boldButton}
            {underlinedButton}
            {italicsButton}
            {strikethroughButton}
          </div>
          <IconButton toggleActive={() => createMathElement()} tooltip="Function">function</IconButton>
          <FontSize />
          <div style={{flexGrow: 1}}/>
          <div className='size'>
            <IconButton onClick={() => setPercentSize(percentSize => percentSize + 25)}>
              add
            </IconButton>
            <div className='text'>{percentSize}%</div>
            <IconButton onClick={() => setPercentSize(percentSize => percentSize - 25)}>
              remove
            </IconButton>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Toolbar