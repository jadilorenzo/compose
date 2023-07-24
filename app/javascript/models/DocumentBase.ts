import React from 'react'
import Character from './Character'
import EndOfFile from './EndOfFile'
import EndOfLine from './EndOfLine'
import { insert, remove } from './utils'

export type Element = EndOfFile | EndOfLine | Character

export interface Selection { start: number, end: number }

interface DocumentBaseState {
  position: number,
  elements: Element[],
  selection: undefined | Selection
}

interface ProviderState {
  selectionStartIndex: number | undefined
  hoverSelectionIndex: number
  activeStyles: string[]
}

export interface State extends DocumentBaseState, ProviderState { }


export default class DocumentBase extends React.Component<{children?: React.ReactNode} | undefined> {
  constructor(props?: any)  {
    super(props)
  }

  state: State = {
    position: 0,
    elements: [],
    selection: undefined,
    selectionStartIndex: undefined,
    hoverSelectionIndex: 0,
    activeStyles: []
  }
  length = this.state.elements.length
  elements = this.state.elements
  position = this.state.position
  selection = this.state.selection


  _createCharacter({ text, styles = [] }: { text: string, styles?: string[] }): Character {
    return new Character({ text, styles })
  }

  _createEndOfFile(): EndOfFile {
    return new EndOfFile()
  }

  _createEndOfLine(): EndOfLine {
    return new EndOfLine()
  }

  _resetEndOfFileCharacter() {
    this._removeEndOfFileCharacter()
    this._addEndOfFileCharacter()
  }

  _removeEndOfFileCharacter() {
    this.setState((prevState: DocumentBaseState) => ({ 
      ...prevState, 
      elements: prevState.elements.filter(character => !(character.type === 'EOF')) 
    }))
  }

  _addEndOfFileCharacter() {
    this.setState((prevState: DocumentBaseState) => ({
      ...prevState,
      elements: prevState.elements.filter(character => !(character.type === 'EOF'))
    }))
  }

  typeNewLine() {
    return this.typeCharacter({ key: '', endOfLine: true })
  }

  typeCharacter({ key, styles = [], endOfLine = false }: {
      key: string,
      styles?: string[]
      endOfLine?: boolean
  }) {
    if (key.split('').length !== 1 && !endOfLine) {
      throw new Error(`Single key expected. Received "${key}"`)
    }
    if (this.selection) this.backspace()
    
    this._resetEndOfFileCharacter()
    this.setState((prevState: DocumentBaseState) => ({
      ...prevState,
      elements: insert(
        prevState.elements,
        prevState.position,
        endOfLine ? this._createEndOfLine() : this._createCharacter({ text: key, styles })
      ) as Element[]
    }))
    this.cursorRight()
    this._resetEndOfFileCharacter()
  }

  cursorLeft() {
    if (this.position !== 0) this.setState((prevState: DocumentBaseState) => ({ position: prevState.position - 1 }))
    return this.position
  }

  cursorRight() {
    if (this.position !== this.length - 1) this.setState((prevState: DocumentBaseState) => ({ position: prevState.position + 1 }))
    return this.position
  }

  setSelection(selection: Selection) {
    if (
      Math.abs(
        selection.start -
        selection.end
      ) > this.length
    ) throw new Error(`Invalid selection: ${JSON.stringify(selection)}`)

    let sortedSelection = selection
    if (selection.start > selection.end) sortedSelection = { start: selection.end, end: selection.start }

    this.selection = sortedSelection
  }

  resetSelection() {
    this.selection = undefined
  }

  _removeCharacter() {
    this._removeEndOfFileCharacter()

    const index = this.position
    this.setState((prevState: DocumentBaseState) => ({
      ...prevState,
      elements: remove(
        prevState.elements,
        index - 1
      ) as Element[]
    }))
    this.cursorLeft()

    this._resetEndOfFileCharacter()
  }

  _toggleStyle({ character, style }: { character: Element, style: string }) {
    if (character.styles?.includes(style)) {
      character.styles = character.styles.filter(oldStyle => oldStyle !== style)
    } else {
      character.styles = [...character.styles, style]
    }
  }

  backspace() {
    if (this.selection) {
      this.position = this.selection.end
      while (
        this.position !==
        this.selection.start
      ) {
        this._removeCharacter()
      }
    } else {
      this._removeCharacter()
    }
  }

  render(): any {
    throw new Error("Missing Override")
    return null
  }
}
