import React, { useContext, useEffect, useRef, useState } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import { SizingContext } from '../../context/SizingContext'
import Lines from './Lines'
import useHandleDocument from '../../hooks/useHandleDocument'

const Editor = () => {
  const { setHoverSelectionIndex, setSelectionStartIndex } = useContext(DocumentContext)
  const { inchSize, pageWidth } = useContext(SizingContext)
  const documentRef = useRef(null)
  
  const resetHoverIndex = () => {
    setHoverSelectionIndex(0)
    setSelectionStartIndex(undefined)
  }

  useHandleDocument(documentRef)

  return (
    <div contentEditable={false}>
      <div contentEditable suppressContentEditableWarning className='editor' ref={documentRef} autoFocus>
        <div className='editor-page' style={{ width: pageWidth }}>
          <div style={{ padding: inchSize }} onMouseLeave={resetHoverIndex}>
            <Lines /> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor