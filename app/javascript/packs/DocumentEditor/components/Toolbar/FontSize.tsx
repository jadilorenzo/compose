import React, { useContext, useState, useEffect } from 'react'
import { DocumentContext } from '../../context/DocumentContext'

const minimumFontSize = 5

const FontSize = () => {
  const { setDocumentFocus, focus, setFontSize, currentFontSize, confirmFontSize } = useContext(DocumentContext)

  const onFocus = () => setDocumentFocus(false)
  const onBlur = () => {
    setDocumentFocus(true)
    if (currentFontSize > minimumFontSize) {
      confirmFontSize(currentFontSize)
    } else {
      confirmFontSize(minimumFontSize + 1)
      setFontSize(minimumFontSize + 1)
    }
  }

  const handleInputChange = (e) => {
    const newValue = Number(e.target.value)
    setFontSize(newValue)
  }

  const isTwoCharactersOrLess = currentFontSize <= 99
  const isThreeCharactersOrLess = currentFontSize > 99 && currentFontSize < 999

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onBlur()
      }
    }

    if (!focus) window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [focus]) 

  return (
    <div className='font-size'>
      <input
        type="number"
        onFocus={onFocus}
        onClick={onFocus}
        onBlur={onBlur}
        value={currentFontSize}
        onChange={handleInputChange}
        style={{
          width: `${isTwoCharactersOrLess
              ? '1.2rem'
              : isThreeCharactersOrLess
                ? '1.7rem'
                : '2.5rem'
            }`,
        }}
      />
      pt
    </div>
  )
}

export default FontSize
