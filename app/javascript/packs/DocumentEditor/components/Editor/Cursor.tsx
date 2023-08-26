import React, { useContext, useEffect, useState } from 'react'
import { SizingContext } from '../../context/SizingContext'
import { FocusContext } from '../../context/FocusContext'

const Cursor = (params: { fontSize?: number }) => {
  const { cursorHeight } = useContext(SizingContext)
  const { focus } = useContext(FocusContext)
  const [on, setOn] = useState(true)

  useEffect(() => {
    setInterval(() => {
      setOn(prevOn => !prevOn)
    }, 400)
  }, [])

  if (!focus) return null
  
  return (
    <div className='cursor-container'>
      <div className={`cursor cursor-${on ? 'on' : 'off'}`}
        style={{
          height: cursorHeight(params.fontSize),
        }}
      />
    </div>
  )
}

export default Cursor
