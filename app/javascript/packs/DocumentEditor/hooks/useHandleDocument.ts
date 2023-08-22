import { useEffect, useContext } from "react"
import { DocumentContext } from "../context/DocumentContext"
import { FocusContext } from "../context/FocusContext"

const useHandleDocument = (documentRef) => {
  const {
    typeCharacter,
    typeNewLine,
    resetSelection,
    backspace,
    cursorLeft,
    cursorRight,
    activeStyles, toggleActiveStyles,
    toggleBoldStyle,
    toggleItalicStyle,
    toggleUnderlinedStyle,
    toggleStrikethroughStyle,
    setPercentSize,
    selectLine,
    setPosition
  } = useContext(DocumentContext)
  const { focus, setFocus } = useContext(FocusContext)

  const handleMetaKey = (key) => {
    const metaKeyHandlers = {
      b: toggleBoldStyle,
      i: toggleItalicStyle,
      u: toggleUnderlinedStyle,
      x: toggleStrikethroughStyle,
      r: () => window.location.reload(),
      "=": () => setPercentSize(percentSize => percentSize + 50),
      "-": () => setPercentSize(percentSize => percentSize - 50),
    }

    const keyHandler = metaKeyHandlers[key]
    if (keyHandler) {
      keyHandler()
    }
  }

  const handleRegularKey = (key) => {
    const regularKeyHandlers = {
      ArrowLeft: cursorLeft,
      ArrowRight: cursorRight,
      Enter: typeNewLine,
      Backspace: backspace,
    }

    const keyHandler = regularKeyHandlers[key]
    if (keyHandler) {
      keyHandler()
      resetSelection()
    }
  }

  useEffect(() => {
    const keydownHandler = (e) => {
      e.preventDefault()
      const { key, ctrlKey, metaKey } = e

      if (metaKey || ctrlKey) {
        handleMetaKey(key)
      } else if (key.length === 1) {
        typeCharacter({ key, styles: activeStyles })
        resetSelection()
      } else {
        handleRegularKey(key)
      }
    }

    const focusHandler = () => setFocus(true) // Focus gained
    const blurHandler = () => setFocus(false) // Focus lost
    
    
    // Cleanup: Remove event listeners
    const cleanup = () => {
      documentRef.current.removeEventListener('keydown', keydownHandler);
      documentRef.current.removeEventListener('focus', focusHandler);
      documentRef.current.removeEventListener('blur', blurHandler);
    }
    if (!documentRef.current) return cleanup
    if (!focus) { return cleanup } else {
      documentRef.current.focus()
      documentRef.current.addEventListener('keydown', keydownHandler);
      documentRef.current.addEventListener('focus', focusHandler);
      documentRef.current.addEventListener('blur', blurHandler);
    }

    
    return cleanup
  }, [activeStyles, focus])
}

export default useHandleDocument