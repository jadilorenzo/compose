import React from 'react'
import Document from './components/Document'
import DocumentProvider from './context/DocumentContext'
import SizingProvider from './context/SizingContext'
import FocusProvider from './context/FocusContext'

export default function ReactTextEditor() {
  return (
    <FocusProvider>
      <DocumentProvider>
        <SizingProvider>
          <Document/>
        </SizingProvider>
      </DocumentProvider>
    </FocusProvider>
  )
}
