import React from 'react'
import Document from './components/Document'
import DocumentProvider from './context/DocumentContext'
import SizingProvider from './context/SizingContext'

export default function ReactTextEditor() {
  return (
    <DocumentProvider>
      <SizingProvider>
        <Document/>
      </SizingProvider>
    </DocumentProvider>
  )
}
