import { Element } from "../DocumentEditor/context/DocumentContext"

export const remove = (arr: unknown[], index: number) => [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
]

export const insert = (arr: unknown[], index: number, element: unknown) => [
    ...arr.slice(0, index),
    element,
    ...arr.slice(index),
]

export const isEOL = (element: Element) => element.type === 'EOL'
export const isText = (element: Element) => element.type === 'text'
export const isEOF = (element: Element) => element.type === 'EOF'
export const isOther = (element: Element) => !isEOL(element) && !isText(element) && !isEOF(element)