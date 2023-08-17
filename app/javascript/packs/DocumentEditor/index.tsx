import React, { useEffect, useState } from 'react'
import Document from './components/Document'
import DocumentProvider from './context/DocumentContext'

export default function ReactTextEditor() {
  return (
    <div>
      <DocumentProvider>
        <Document/>
      </DocumentProvider>
    </div>
  )
}
