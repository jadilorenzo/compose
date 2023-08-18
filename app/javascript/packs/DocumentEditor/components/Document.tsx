import React from 'react'
import Editor from './Editor/Editor'
import Toolbar from './Toolbar/Toolbar'

const TextEditor = () => {
  return (
    <div className='document'>
      <Toolbar />
      <Editor />
    </div>
  )
}

export default TextEditor