import { useEffect } from "react"

const useHandleDocument = ({
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
  focus, setDocumentFocus,
  setPercentSize,
  selectLine,
  setPosition,
}) => {
  const handleMetaKey = (key) => {
    console.log(key)
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

    if (!focus) return () => window.removeEventListener('keydown', keydownHandler)
    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [activeStyles, focus])
}

export default useHandleDocument