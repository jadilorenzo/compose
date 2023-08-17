import React, { useContext, useEffect, useState } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import Cursor from './Cursor'
import Element from './Element'
import MathElement from './MathElement'

const Character = ({
  index,
  element,
}) => {
  const {
    position,
    setPosition,
    selection,
    resetSelection,
    select,
    selectionStartIndex,
    setSelectionStartIndex,
    hoverSelectionIndex,
    setHoverSelectionIndex,
    fontSize,
    selectLine,
    selectWord,
  } = useContext(DocumentContext)

  const [clickCount, setClickCount] = useState(0)
  const [clickTimeout, setClickTimeout] = useState<any>(null)

  const insideSelection = selection ? (
    index >= selection.start && index <= selection.end - 1
  ) : (selectionStartIndex !== undefined) ? (
    (index >= selectionStartIndex && index <= hoverSelectionIndex) || (index <= selectionStartIndex && index >= hoverSelectionIndex)
  ) : false

  const onMouseDown = () => {
    setSelectionStartIndex(index)
    resetSelection()
  }

  const onMouseUp = () => {
    setHoverSelectionIndex(hoverSelectionIndex => {
      setSelectionStartIndex((selectionStartIndex) => {
        if (selectionStartIndex !== hoverSelectionIndex) {
          select({
            start: (selectionStartIndex || 0) + ((selectionStartIndex || 0) > index ? + 1 : 0),
            end: index + ((selectionStartIndex || 0) > index ? 0 : + 1)
          })
        } else {
          setPosition(selectionStartIndex)
        }
        return undefined
      })
      return undefined
    })
  }

  const onSingleClick = () => {
    setClickCount(click => click + 1)
    setClickTimeout(
      setTimeout(() => {
        setClickCount(0)
      }, 500)
    )
  }

  const onDoubleClick = () => {
    selectWord(index)
  }

  const onTripleClick = () => {
    clearTimeout(clickTimeout)
    setClickCount(0)
    selectLine(index)
  }

  useEffect(() => {
    if (clickCount >= 3) onTripleClick()
  }, [clickCount])

  return (
    <span
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={() => setHoverSelectionIndex(index)}
      onClick={onSingleClick}
      onDoubleClick={onDoubleClick}
      className='character'
      style={{
        background: insideSelection ? '#90CAF9' : undefined,
        fontSize: `calc(${fontSize * element.fontSize} * 1rem)`
      }}
    >
      {position === index ? <Cursor fontSize={element.fontSize} /> : null}
      {(element.type === 'EOL') ? (
        <br style={{width: 'fit-container'}}/>
      ) : (element.type === 'MATH') ? (
        <MathElement element={element} index={index} />
      ) : (element.type === 'EOF') ? (
        <div style={{ height: `calc(${fontSize * element.fontSize} * 1rem)`, width: '100%' }} />
      ) : <Element element={element} />}
    </span>
  )
}

export default Character
