import { useEffect } from "react"

const useHandleDocument = ({
  document, setDocument, 
  activeStyles, toggleActiveStyles,
  toggleBoldStyle,
  toggleItalicStyle,
  toggleUnderlinedStyle,
  toggleStrikethroughStyle
}) => {
  useEffect(() => {
    const mouseupHandler = () => {
      setDocument((prevDocument) => prevDocument.resetSelection())
    }

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
          setDocument((prevDocument) => prevDocument.typeCharacter({ key, styles: activeStyles }))
        } else {
          switch (key) {
            case 'ArrowLeft':
              setDocument((prevDocument) => prevDocument.cursorLeft())
              setDocument((prevDocument) => prevDocument.resetSelection())
              break;

            case 'ArrowRight':
              setDocument((prevDocument) => prevDocument.cursorRight())
              setDocument((prevDocument) => prevDocument.resetSelection())
              break;

            case 'Enter':
              setDocument((prevDocument) => prevDocument.typeNewLine())
              break;

            case 'Backspace':
              setDocument((prevDocument) => prevDocument.backspace())
              setDocument((prevDocument) => prevDocument.resetSelection())
              break;

            default:
              break;
          }
        }
        setDocument((prevDocument) => prevDocument.resetSelection())
      }
    }

    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [activeStyles])
}

export default useHandleDocument