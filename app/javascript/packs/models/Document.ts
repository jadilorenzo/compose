import StyledDocument from "./DocumentStyled";
import { Element, Selection } from "./DocumentBase"
import Character from "./Character";
import { insert } from "./utils";

class Document extends StyledDocument {
  _textOfSelection({ selection }: { selection: Selection }): string {
    return this.elements.slice(selection.start, selection.end).map(element => element.text).join('')
  }
  
  createMathElement(): this {
    if (this.selection) {
      const text = this._textOfSelection({selection: this.selection})
      this.position = this.selection.start
      this.backspace()
      this.resetSelection()

      this._handleEndOfFileCharacter()
      this.elements = insert(
        this.elements,
        this.position,
        new Character({type: 'MATH', text})
      ) as Element[]
      this.cursorRight()
      this._handleEndOfFileCharacter()
    } else {
      this._handleEndOfFileCharacter()
      this.elements = insert(
        this.elements,
        this.position,
        new Character({type: 'MATH', text: 'f(x)'})
      ) as Element[]
      this.cursorRight()
      this._handleEndOfFileCharacter()
    }
    return this
  }
}

export default Document