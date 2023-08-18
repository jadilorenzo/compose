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
    <div className='cursor-container'>
      <div className='cursor'
        style={{
          height: cursorHeight(params.fontSize),
          background: on ? 'black' : 'transparent',
        }}
      />
    </div>
  )
}

export default Cursor
