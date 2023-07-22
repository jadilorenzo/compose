import React, { useEffect, useState } from 'react'

const Cursor = () => {
  const [on, setOn] = useState(true)
  
  useEffect(() => {
    setInterval(() => setOn(on => !on), 400)
  }, [])
  
  return (
    <div style={{width: '0', display: 'inline-block'}}>
      <div style={{width:  '1px', height: '.9rem', background: on ? 'black' : 'transparent'}}/>
    </div>
  )
}

export default Cursor