import React from 'react'
import { createRoot } from 'react-dom/client'
import Document from './DocumentEditor'

const createComponent = (id: string, Component: any) => {
  const element = document.getElementById(id)
  if (element) createRoot(element).render(<Component />)
}

document.addEventListener('turbolinks:load', () => {
  createComponent('DocumentEditor', () => <Document />)
})
