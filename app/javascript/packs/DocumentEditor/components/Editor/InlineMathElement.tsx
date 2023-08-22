import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'
import { Element } from '../../context/DocumentContext'
import { DocumentContext } from '../../context/DocumentContext'
import { SizingContext } from '../../context/SizingContext'
import { FocusContext } from '../../context/FocusContext'

const InlineMathElement = ({ element, index }: { element: Element, index: number }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(element.text)
  const { resetSelection, changeElementText } = useContext(DocumentContext)
  const { mathFontSize } = useContext(SizingContext)
  const { setFocus } = useContext(FocusContext)
  const formRef = useRef<HTMLFormElement | null>(null)

  const toggleEditing = (value: boolean) => {
    setEditing(value)
    setFocus(!value)
    resetSelection()
  }

  const handleSubmit = () => {
    setValue(value => {
      changeElementText({ index, text: value })
      return value
    })
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
      <div className='math-edit-form-container'>
        {editing ? (
          <form ref={formRef}>
            <textarea
              value={value}
              onBlur={() => toggleEditing(false)}
              autoFocus
              onChange={(e) => setValue(e.target.value)}
            />
          {(value.includes("\\")) ? <InlineMath math={value} /> : null}
          </form>
        ) : null}
      </div>
      <span style={{
        fontSize: mathFontSize(element.fontSize),
        height: mathFontSize(element.fontSize)
      }} onClick={() => {
        toggleEditing(true)
      }} className='inline-math'>
        <InlineMath math={element.text} />
      </span>
    </span>
  )
}

export default InlineMathElement
