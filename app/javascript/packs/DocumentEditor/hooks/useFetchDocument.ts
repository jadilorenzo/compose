import { useEffect } from "react"

const useFetchDocument = async ({
  setPosition,
  setSelection,
  setElements,
  setLoaded
}) => {
  useEffect(() => {
    const root = document.getElementById('DocumentEditor')
    const id = root?.getAttribute('data-id')
    fetch(`/documents/${id}/json`)
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