import React, { useContext, useEffect, useState } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import Element from './Element'
import InlineMathElement from './InlineMathElement'
import { SizingContext } from '../../context/SizingContext'
import { isEOL, isOther } from '../../../models/utils'

const Character = ({ index, element }) => {
  const {
    setPosition,
    selection,
    resetSelection,
    select,
    selectionStartIndex,
    setSelectionStartIndex,
    hoverSelectionIndex,
    setHoverSelectionIndex,
    selectLine,
    selectWord,
  } = useContext(DocumentContext)
  const { fontSize } = useContext(SizingContext)

  const [clickCount, setClickCount] = useState(0)
  const [clickTimeout, setClickTimeout] = useState<any>(null)

  const insideSelection =
    selection
      ? index >= selection.start && index <= selection.end
      : selectionStartIndex !== undefined
        ? (index >= selectionStartIndex && index <= hoverSelectionIndex) ||
        (index <= selectionStartIndex && index >= hoverSelectionIndex)
        : false

  const onMouseDown = () => {
    setSelectionStartIndex(index)
    resetSelection()
  }

  const onMouseUp = () => {
    setHoverSelectionIndex(hoverSelectionIndex => {
      setSelectionStartIndex(selectionStartIndex => {
        if (selectionStartIndex !== hoverSelectionIndex) {
          select({
            start: selectionStartIndex, 
            end: hoverSelectionIndex 
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

  const characterStyle = {
    background: insideSelection ? '#90CAF9' : undefined,
    fontSize: fontSize(element.fontSize),
  }

  const eolStyle = {
    flexGrow: 1, 
    height: fontSize(element.fontSize)
  }

  const elementTypes = {
    MATH_I: <InlineMathElement element={element} index={index} />,
    EOF: <div className='eof' style={{ height: fontSize(element.fontSize) }} />,
    text: <Element element={element} />,
  }

  return (
    <span
      className='character'
      {...(!isOther(element) ? {
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onMouseEnter: () => setHoverSelectionIndex(index),
        onClick: onSingleClick,
        onDoubleClick: onDoubleClick,
      } : {})}
      style={isEOL(element) ? eolStyle : characterStyle}
    >
      {elementTypes[element.type] || null}
    </span>
  )
}

export default Character
