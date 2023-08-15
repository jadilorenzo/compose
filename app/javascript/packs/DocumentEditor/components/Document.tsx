import React from 'react'
import DocumentEditor from './DocumentEditor';
import DocumentToolbar from './DocumentToolbar';

const TextEditor = () => {
  return (
    <div className='text-editor'>
      <DocumentToolbar />
      <DocumentEditor />
    </div>
  )
}

export default TextEditor