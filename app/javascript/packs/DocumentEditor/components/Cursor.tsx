import React, { useContext, useEffect, useState } from 'react'
import {DocumentContext} from '../context/DocumentContext'


const Cursor = () => {
  const { fontSize } = useContext(DocumentContext)
  const [on, setOn] = useState(true)
  
  useEffect(() => {
    setInterval(() => setOn(on => !on), 400)
  }, [])
  
  return (
    <div style={{width: '0', display: 'inline-block'}}>
      <div style={{ width: '1px', height: `calc(${fontSize} * 1rem)`, background: on ? 'black' : 'transparent'}}/>
    </div>
  )
}

export default Cursor