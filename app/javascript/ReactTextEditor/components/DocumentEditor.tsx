import React, { useContext } from 'react'
import { TextEditorContext } from '../context/DocumentContext'
import Character from './Character'
import Cursor from './Cursor'

const DocumentEditor = () => {
  const { setHoverSelectionIndex, setSelectionStartIndex, elements } = useContext(TextEditorContext)

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