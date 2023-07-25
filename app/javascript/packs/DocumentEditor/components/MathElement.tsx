import React, { useContext, useState } from 'react'
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Element } from '../context/DocumentContext'
import { DocumentContext } from '../context/DocumentContext';
import IconButton from '../ui/IconButton';

const MathElement = ({ element, index }: { element: Element, index: number }) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(element.text)
  const { focus, setFocus, resetSelection, changeElementText } = useContext(DocumentContext)

  return (
    <span style={{ display: 'inline-flex' }}>
      {editing ? (
        <div className='math-edit-form-container'>
          <div className='math-edit-form'>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div className='math'>
              <InlineMath math={value} />
            </div>
            <IconButton>info</IconButton>
            <IconButton toggleActive={() => {
              changeElementText({ index, text: value })
              setFocus(true)
              setEditing(false)
              resetSelection()
            }}>check</IconButton>
          </div>
        </div>
      ) : null}
      <span style={{
        opacity: focus ? 1 : 0
      }} onClick={() => {
        setEditing(true)
        if (focus) setFocus(false)
        resetSelection()
      }}>
        <InlineMath math={element.text} />
      </span>
    </span>
  )
}

export default MathElement