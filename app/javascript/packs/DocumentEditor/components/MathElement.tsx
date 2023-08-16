import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'
import { Element } from '../context/DocumentContext'
import { DocumentContext } from '../context/DocumentContext'

const MathElement = ({ element, index }: { element: Element, index: number }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(element.text)
  const { focus, setFocus, resetSelection, changeElementText } = useContext(DocumentContext)
  const formRef = useRef<HTMLFormElement | null>(null)

  const toggleEditing = (value) => {
    setEditing(value)
    setFocus(!value)
    resetSelection()
  }

  const handleSubmit = () => {
    setValue(value => {
      changeElementText({ index, text: value })
      return value
    })
    setFocus(true)
    setEditing(false)
    resetSelection()
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if ((event.key === 'Enter' && event.metaKey) || (event.key === 'Enter' && event.ctrlKey)) {
      event.preventDefault()
      if (formRef.current) {
        handleSubmit()
      }
    }
  }, [])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('keydown', handleKeyPress)
      }
    }
  }, [handleKeyPress, editing])

  return (
    <span className='math-element'>
      <div style={{display: 'inline-block', height: 0}}>
        {editing ? (
          <div className='math-edit-form-container'>
            <form ref={formRef}>
              <textarea
                value={value}
                onBlur={() => toggleEditing(false)}
                autoFocus
                onChange={(e) => setValue(e.target.value)}
              />
            {(value.includes("\\")) ? <span><InlineMath math={value} /></span> : null}
            </form>
          </div>
        ) : null}
      </div>
      <span style={{ opacity: focus ? 1 : 1 }} onClick={() => toggleEditing(true)} className='inline-math'>
        <InlineMath math={element.text} />
      </span>
    </span>
  )
}

export default MathElement
