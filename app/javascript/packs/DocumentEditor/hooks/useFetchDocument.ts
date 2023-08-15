import { useEffect } from "react"

const useFetchDocument = async ({
  setPosition,
  setSelection,
  setElements,
  setLoaded,
  setPercentSize,
  id
}: {
  setPosition: any
  setSelection: any
  setElements: any
  setLoaded: any
  setPercentSize: any
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

    fetch(`/documents/${id}/json/size`)
      .then((result) => result.json())
      .then((result) => {
        setPercentSize(result || 100)
      })
    }, [])
}

export default useFetchDocument