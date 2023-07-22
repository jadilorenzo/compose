import Character from './Character'
import EndOfFile from './EndOfFile'
import EndOfLine from './EndOfLine'
import { insert, remove } from './utils'

export type Element = EndOfFile | EndOfLine | Character

export interface Selection { start: number, end: number }

export default class DocumentBase {
  // position: Position = { x: 0, y: 0 }
  position: number = 0
  elements: Element[] = []
  selection: undefined | Selection = undefined

  _createCharacter({ text, styles = [] }: { text: string, styles?: string[] }): Character {
    return new Character({ text, styles })
  }

  _createEndOfFile(): EndOfFile {
    return new EndOfFile()
  }

  _createEndOfLine(): EndOfLine {
    return new EndOfLine()
  }

  _handleEndOfFileCharacter(): this {
    this._removeEndOfFileCharacter()
    this._addEndOfFileCharacter()
    return this
  }

  _removeEndOfFileCharacter(): this {
    this.elements = this.elements.filter(character => !(character.type === 'EOF'))
    return this
  }

  _addEndOfFileCharacter(): this {
    this.elements = [...this.elements, this._createEndOfFile()]
    return this
  }

  typeNewLine(): this {
    return this.typeCharacter({ key: '', endOfLine: true })
  }

  typeCharacter({ key, styles = [], endOfLine = false }: {
      key: string,
      styles?: string[]
      endOfLine?: boolean
  }): this {
    if (key.split('').length !== 1 && !endOfLine) {
      throw new Error(`Single key expected. Received "${key}"`)
    }
    if (this.selection) this.backspace()
    
    this._handleEndOfFileCharacter()
    this.elements = insert(
      this.elements,
      this.position,
      endOfLine ? this._createEndOfLine() : this._createCharacter({ text: key, styles })
    ) as Element[]
    this.cursorRight()
    this._handleEndOfFileCharacter()
    return this
  }

  cursorLeft(): this {
    if (this.position !== 0) this.position = this.position - 1
    return this
  }

  cursorRight(): this {
    if (this.position !== this.elements.length - 1) this.position = this.position + 1
    return this
  }

  setSelection(selection: Selection): this {
    if (
      Math.abs(
        selection.start -
        selection.end
      ) > this.elements.length
    ) throw new Error(`Invalid selection: ${JSON.stringify(selection)}`)

    let sortedSelection = selection
    if (selection.start > selection.end) sortedSelection = { start: selection.end, end: selection.start }

    this.selection = sortedSelection
    return this
  }

  resetSelection() {
    this.selection = undefined
    return this
  }

  _removeCharacter(): this {
    this._removeEndOfFileCharacter()

    const index = this.position
    const lastIndex = index === this.elements.length
    this.elements = remove(
      this.elements,
      index - 1
    ) as Element[]
    this.cursorLeft()

    this._handleEndOfFileCharacter()
    return this
  }

  _toggleStyle({ character, style }: { character: Element, style: string }) {
    if (character.styles?.includes(style)) {
      character.styles = character.styles.filter(oldStyle => oldStyle !== style)
    } else {
      character.styles = [...character.styles, style]
    }
  }

  backspace(): this {
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
    return this
  }
}
