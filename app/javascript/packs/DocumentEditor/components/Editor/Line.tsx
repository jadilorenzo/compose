import React, { useContext } from 'react'
import { DocumentContext, Element } from '../../context/DocumentContext'
import Character from './Character'
import Cursor from './Cursor'

const Line = (params: {line: Element[], index: number}) => {
  const {
    position,
    elementLines
  } = useContext(DocumentContext)

  const globalIndex = (elementIndex: number) => {
    return elementLines.slice(0, params.index).reduce((sum, line) => sum + line.length, 0) + elementIndex
  }
  
  return (
    <div className='line'>
      {params.line.map((element, index) => 
        <React.Fragment key={index}>
          {position === globalIndex(index) && <Cursor key={index} fontSize={element.fontSize} />}
          <Character
            key={JSON.stringify({ element, index: globalIndex(index) })}
            index={globalIndex(index)}
            element={element}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default Line