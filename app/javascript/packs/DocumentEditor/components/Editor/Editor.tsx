import React, { useContext, useEffect, useRef, useState } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import Character from './Character'
import Cursor from './Cursor'
import { SizingContext } from '../../context/SizingContext'

const Editor = () => {
  const { elements, setHoverSelectionIndex, setSelectionStartIndex } = useContext(DocumentContext)
  const { inchSize, pageWidth } = useContext(SizingContext)
  
  const resetHoverIndex = () => {
    setHoverSelectionIndex(0)
    setSelectionStartIndex(undefined)
  }

  const empty = elements.length === 0

  return (
    <div className='editor'>
      <div className='editor-page' style={{ width: pageWidth }}>
        <div style={{ padding: inchSize }}>
          {empty && <Cursor/>}
          <span onMouseLeave={resetHoverIndex}>
            {elements.map((element, index) => (
              <Character 
                key={JSON.stringify({element, index})}
                index={index} 
                element={element} 
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Editor