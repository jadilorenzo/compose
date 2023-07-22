import React from 'react'
import DocumentEditor from './DocumentEditor';
import DocumentHeader from './DocumentHeader';
import DocumentToolbar from './DocumentToolbar';

const TextEditor = () => {
  return (
    <div className='text-editor surface'>
      <DocumentHeader />
      <DocumentToolbar />
      <DocumentEditor />
    </div>
  )
}

export default TextEditor