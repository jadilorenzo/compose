import React, { useContext } from 'react'
import { DocumentContext } from './DocumentContext'

export const SizingContext = React.createContext<any>({})

const SizingProvider = (props: { children: React.ReactNode }) => {
  const { percentSize } = useContext(DocumentContext)

  const inchSize = percentSize * 0.0476 // in inches
  const ptSize = percentSize * 0.00065 // in pts
  const cursorToTextRatio = 0.94
  const mathToTextRatio = 0.9
  const minimumSpaceWidthRatio = 0.2

  const value = {
    inchSize: `calc(${inchSize} * 1rem)`,
    pageWidth: `calc(${inchSize * 8} * 1rem)`, // width of normal size paper
    pageHeight: `calc(${inchSize * 11.5} * 1rem)`, // height of normal size paper
    fontSize: (fontSize: number) => `calc(${ptSize * fontSize} * 1rem)`,
    cursorHeight: (fontSize: number) => `calc(${ptSize * fontSize * cursorToTextRatio} * 1rem)`,
    mininumElementWidth: (fontSize) => `calc(${ptSize * fontSize * minimumSpaceWidthRatio} * 1rem)`,
    mathFontSize: (fontSize: number) => `calc(${ptSize * fontSize * mathToTextRatio} * 1rem)`,
  }

  return (
    <SizingContext.Provider value={value}>
      {props.children}
    </SizingContext.Provider>
  )
}

export default SizingProvider