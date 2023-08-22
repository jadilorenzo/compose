import React, { useContext } from 'react'
import { DocumentContext } from '../../context/DocumentContext'
import Line from './Line'
import Cursor from './Cursor'

const Lines = () => {
  const { elementLines, elements } = useContext(DocumentContext)

  const empty = elements.length === 0
  return (
    <div className='lines'>
      {/* {empty && <Cursor fontSize={11} />} */}
      {elementLines.map((line, index) =>
        <Line key={index} line={line} index={index} />
      )}
    </div>
  )
}

export default Lines