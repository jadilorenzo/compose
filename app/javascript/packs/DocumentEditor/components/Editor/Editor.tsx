import React, { useContext, useEffect, useRef, useState } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import { SizingContext } from '../../context/SizingContext'
import Lines from './Lines'

const Editor = () => {
  const { elements, setHoverSelectionIndex, setSelectionStartIndex } = useContext(DocumentContext)
  const { inchSize, pageWidth } = useContext(SizingContext)
  
  const resetHoverIndex = () => {
    setHoverSelectionIndex(0)
    setSelectionStartIndex(undefined)
  }

  return (
    <div className='editor'>
      <div className='editor-page' style={{ width: pageWidth }}>
        <div style={{ padding: inchSize }} onMouseLeave={resetHoverIndex}>
          <Lines /> 
        </div>
      </div>
    </div>
  )
}

export default Editor