import React, { useContext } from 'react'
import {DocumentContext} from '../context/DocumentContext'
import Cursor from './Cursor'
import Element from './Element'
import MathElement from './MathElement'

const Character = ({
  index, 
  element, 
}) => {
  const {
    position,
    selection,
    select,
    selectionStartIndex, 
    setSelectionStartIndex, 
    hoverSelectionIndex, 
    setHoverSelectionIndex
  } = useContext(DocumentContext)
  
  const insideSelection = selection ? (
    index >= selection.start && index <= selection.end - 1
  ) : (selectionStartIndex !== undefined) ? (
    (index >= selectionStartIndex && index <= hoverSelectionIndex) || (index <= selectionStartIndex && index >= hoverSelectionIndex)
  ) : false

  const onMouseDown = () => setSelectionStartIndex(index)
  const onMouseUp = () => {
    if (Math.abs(selectionStartIndex || 0 - index) > 1) {
      select({
        start: (selectionStartIndex || 0) + ((selectionStartIndex || 0) > index ? + 1 : 0 ),
        end: index + ((selectionStartIndex || 0) > index ? 0 : + 1)
      })
      setSelectionStartIndex(undefined)
    }
  }
  
  return (
    <span 
      onMouseDown={onMouseDown} 
      onMouseUp={onMouseUp}
      onMouseEnter={() => setHoverSelectionIndex(index)}
      style={{ background: insideSelection ? '#90CAF9' : undefined }}
    >
      {position === index ? <Cursor/> : null}
      {(element.type === 'EOL') ? (
        <br/>
      ) : (element.type === 'MATH') ?  (
        <MathElement text={element.text} />
      ) : <Element element={element} />}
    </span>
  )
}

export default Character