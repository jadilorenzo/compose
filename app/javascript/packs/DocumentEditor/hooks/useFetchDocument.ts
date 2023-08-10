import { useEffect } from "react"

const useFetchDocument = async ({
  setPosition,
  setSelection,
  setElements,
  setLoaded,
  id
}: {
  setPosition: any
  setSelection: any
  setElements: any
  setLoaded: any
  id: string
}) => {
  useEffect(() => {
    fetch(`/documents/${id}/json/body`)
      .then((result) => result.json())
      .then((result) => {
        setElements(result.elements || [])
        setPosition(result.position || 0)
        setSelection(result.selection || undefined)
        setLoaded(true)
      })
  }, [])
}

export default useFetchDocument