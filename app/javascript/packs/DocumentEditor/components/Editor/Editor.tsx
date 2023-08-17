import React, { useContext, useEffect, useRef, useState } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import Character from './Character'
import Cursor from './Cursor'

const Editor = () => {
  const { elements, setHoverSelectionIndex, setSelectionStartIndex, size } = useContext(DocumentContext)
  
  const resetHoverIndex = () => {
    setHoverSelectionIndex(0)
    setSelectionStartIndex(undefined)
  }

  return (
    <div className='editor'>
      <div className='editor-page' style={{ width: `calc(${size * 8} * 1rem)`}}>
        <div style={{ padding: `calc(${size} * 1rem)`}}>
          {elements.length === 0 ? <Cursor/> : null}
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