import React, { useContext, useState } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import Character from './Character'
import Cursor from './Cursor'

const DocumentEditor = () => {
  const { elements, setHoverSelectionIndex, setSelectionStartIndex, size, setSize } = useContext(DocumentContext)
  
  const resetHoverIndex = () => {
    setHoverSelectionIndex(0)
    setSelectionStartIndex(undefined)
  }

  return (
    <>
     <div className='editor-area'>
        <div className='editor-page' style={{ width: `calc(${size} * 8rem)`}}>
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
    </>
  )
}

export default DocumentEditor