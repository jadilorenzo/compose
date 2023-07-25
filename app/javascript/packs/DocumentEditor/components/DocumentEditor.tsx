import React, { useContext } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import Character from './Character'
import Cursor from './Cursor'

const DocumentEditor = () => {
  const { elements, setHoverSelectionIndex, setSelectionStartIndex,  } = useContext(DocumentContext)

  const resetHoverIndex = () => {
    setHoverSelectionIndex(0)
    setSelectionStartIndex(undefined)
  }

  return (
    <>
     <div className='editor-area'>
        <div className='editor surface'>
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
    </>
  )
}

export default DocumentEditor