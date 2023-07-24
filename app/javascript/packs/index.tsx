import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactTextEditor from '../ReactTextEditor'

const createComponent = (id: string, Component: any) => {
  const element = document.getElementById(id)
  if (element) createRoot(element).render(<Component />)
}

document.addEventListener('DOMContentLoaded', () => {
  createComponent('ReactTextEditor', () => <ReactTextEditor />)
})
