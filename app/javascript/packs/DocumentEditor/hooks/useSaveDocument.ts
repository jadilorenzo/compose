import { useEffect } from "react"
import { Element, Selection } from "../context/DocumentContext"

const useFetchDocument = ({
  position,
  elements,
  setElements,
  setPosition,
  setPercentSize,
  loaded,
  id,
  percentSize,
}: {
  position: number
  elements: Element[]
  loaded: boolean
  setElements: any
  setPercentSize: any
  setPosition: any
  id: string,
  percentSize: number,
}) => {
  useEffect(() => {
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]')
    const csrfToken = csrfTokenElement?.getAttribute('content')
    const root = document.getElementById('DocumentEditor')
    const id = root?.getAttribute('data-id')

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken as string, 
    }

    if (loaded) return () => {
      setElements(elements => {
        setPosition(position => {
          setPercentSize(size => {
            fetch(`/documents/${id}`, {
              method: 'PATCH',
              headers,
              body: JSON.stringify({
                body: JSON.stringify({
                  position,
                  elements,
                }),
                size,
              })
            }).then(result => result.json()).then(result => console.log(JSON.parse(result.body)))
            return size
          })
          return position
        })
        return elements
      })
    }
  }, [position, percentSize])
}

export default useFetchDocument