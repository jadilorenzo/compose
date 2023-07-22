export const remove = (arr: unknown[], index: number) => [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
]

export const insert = (arr: unknown[], index: number, element: unknown) => [
    ...arr.slice(0, index),
    element,
    ...arr.slice(index),
]
