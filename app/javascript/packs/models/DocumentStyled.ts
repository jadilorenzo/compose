import DocumentBase from "./DocumentBase";

class StyledDocument extends DocumentBase {
  styleSelection({ style }: { style: string }): this {
    if (this.selection) {
      this.position = this.selection.start
      while (
        this.position !==
        this.selection.end
      ) {
        this._toggleStyle({ character: this.elements[this.position], style })
        this.cursorRight()
      }
    }
    return this
  }
}

export default StyledDocument