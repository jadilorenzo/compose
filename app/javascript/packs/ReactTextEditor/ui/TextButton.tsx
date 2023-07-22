import React from 'react'

const TextButton = (props: { children: any }) => {
  return (
    <div className='btn-text'>{props.children}</div>
  )
}

export default TextButton