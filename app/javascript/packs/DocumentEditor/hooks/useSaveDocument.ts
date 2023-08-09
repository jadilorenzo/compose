import { useEffect } from "react"
import { Element, Selection } from "../context/DocumentContext"

const useFetchDocument = ({
  position,
  elements,
  setElements,
  setPosition,
  loaded
}: {
  position: number
  elements: Element[]
  loaded: boolean
  setElements: any
  setPosition: any
}) => {
  useEffect(() => {
    const csrfTokenElement = document.getElementById('csrf-token')
    const csrfToken = csrfTokenElement?.dataset.token
    const root = document.getElementById('DocumentEditor')
    const id = root?.getAttribute('data-id')

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken as string, 
    };

    if (loaded) return () => {
      setElements(elements => {
        setPosition(position => {
          fetch(`/documents/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              body: JSON.stringify({
                position,
                elements,
              })
            })
          }).then(result => result.json()).then(result => console.log(JSON.parse(result.body)))
          return position
        })
        return elements
      })
    }
  }, [elements, position])
}

export default useFetchDocument