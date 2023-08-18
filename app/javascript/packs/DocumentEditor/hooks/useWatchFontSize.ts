import { useEffect } from "react"
import { Element } from "../context/DocumentContext"

const useWatchFontSize = ({elements, setElements, elementLines}) => {
  useEffect(() => {
    let anyUpdate = false
    const updatedElements = elementLines.map(line => {
      const fontSize = line[0]?.fontSize || 11; // Default font size
      return line.map(element => {
        if (element.fontSize !== fontSize) {
          anyUpdate = true
          element.fontSize = fontSize
        }
        return element
      })
    }).flat()

    if (anyUpdate) setElements(updatedElements)
  }, [elements, elementLines])
}

export default useWatchFontSize