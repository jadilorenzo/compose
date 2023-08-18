import { useEffect } from "react"
import { Element } from "../context/DocumentContext"

const useWatchFontSize = ({elements, setElements}) => {
  useEffect(() => {
    const elementLines: Element[][] = [[]]
    elements.forEach((element: Element, index) => { 
      if (index === 0) {
        elementLines[elementLines.length - 1].push(element)
      } else if (element.type === "EOL") {
        elementLines.push([element])
      } else {
        elementLines[elementLines.length - 1].push(element) 
      }
    })

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
  }, [elements])
}

export default useWatchFontSize