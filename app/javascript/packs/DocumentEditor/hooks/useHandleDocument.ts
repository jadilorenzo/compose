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
  focus, setFocus
}) => {
  useEffect(() => {
    // const mouseupHandler = () => {
    //   resetSelection()
    // }

    // window.addEventListener("auxclick", mouseupHandler)

    const keydownHandler = (e) => {
      e.preventDefault()
      const {key} = e
      if (e.metaKey) {
        switch (key) {
          case 'b':
            toggleBoldStyle()
            break;
          
          case 'i':
            toggleItalicStyle()
            break;

          case 'u':
            toggleUnderlinedStyle()
            break;

          case 'x':
            toggleStrikethroughStyle()
            break;
            
          case 'r':
            window.location.reload()
            break;
        
          default:
            break;
        }
      } else {
        if (key.split('').length === 1) {
          typeCharacter({ key, styles: activeStyles })
        } else {
          switch (key) {
            case 'ArrowLeft':
              cursorLeft()
              resetSelection()
              break;

            case 'ArrowRight':
              cursorRight()
              resetSelection()
              break;

            case 'Enter':
              typeNewLine()
              break;

            case 'Backspace':
              backspace()
              resetSelection()
              break;

            default:
              break;
          }
        }
        resetSelection()
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