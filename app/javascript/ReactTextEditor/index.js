import React, { useEffect, useState } from 'react'
import Document from './components/Document'
import TextEditorProvider from './context/DocumentContext'

export default function ReactTextEditor() {
  return (
    <div>
      <TextEditorProvider>
        <Document/>
      </TextEditorProvider>
    </div>
  )
}
