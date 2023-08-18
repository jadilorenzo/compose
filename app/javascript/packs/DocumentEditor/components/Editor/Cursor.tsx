import React, { useContext, useEffect, useState } from 'react'
import { SizingContext } from '../../context/SizingContext'

const Cursor = (params: { fontSize?: number }) => {
  const { cursorHeight } = useContext(SizingContext)
  const [on, setOn] = useState(true)

  useEffect(() => {
    setInterval(() => {
      setOn(prevOn => !prevOn)
    }, 400)
  }, [])

  return (
    <div className='cursor-container' style={{ width: '0', display: 'inline-block' }}>
      <div className='cursor'
        style={{
          width: '1px',
          height: cursorHeight(params.fontSize),
          background: on ? 'black' : 'transparent',
        }}
      />
    </div>
  )
}

export default Cursor
