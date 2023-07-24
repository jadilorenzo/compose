import React, { createContext, useState } from "react"
import Document from "../../models/Document";
import { State } from "../../models/DocumentBase";
import defaultState from "./defaultState";

export const TextEditorContext = createContext<any>(defaultState)

class TextEditorProvider extends Document {
  constructor(props: any) {
    super()
  }

  mouseupHandler = (_e: MouseEvent) => {}
  keydownHandler = (_e: KeyboardEvent) => {}
  
  toggleActiveStyles(style: string) {
    this.setState((prevState: State) => {
      const prevStyles = prevState.activeStyles 
      if (prevStyles.includes(style)) {
        prevState.activeStyles = prevStyles.filter(prevStyle => prevStyle !== style)
      } else {
        prevState.activeStyles = [...prevStyles, style]
      }
      return prevState
    })
  }

  toggleBoldStyle() {
    this.styleSelection({ style: 'bold' })
    this.toggleActiveStyles('bold')
  }
  
  toggleItalicStyle() {
    this.styleSelection({ style: 'italics' })
    this.toggleActiveStyles('italics')
  }
  
  toggleUnderlinedStyle() {
    this.styleSelection({ style: 'underlined' })
    this.toggleActiveStyles('underlined')
  }
  
  toggleStrikethroughStyle() {
    this.styleSelection({ style: 'strikethrough' })
    this.toggleActiveStyles('strikethrough')
  }

  componentDidMount() {
    this.mouseupHandler = () => {
      this.resetSelection()
    }

    this.keydownHandler = (event) => {
      event.preventDefault()
      const { key } = event
      if (event.metaKey) {
        switch (key) {
          case 'b':
            this.toggleBoldStyle()
            break;
          case 'i':
            this.toggleItalicStyle()
            break;
          case 'u':
            this.toggleUnderlinedStyle()
            break;
          case 'x':
            this.toggleStrikethroughStyle()
            break;
          case 'r':
            window.location.reload()
            break;
          default:
            break;
        }
      } else {
        if (key.split('').length === 1) {
          this.typeCharacter({ key, styles: this.state.activeStyles })
        } else {
          switch (key) {
            case 'ArrowLeft':
              this.cursorLeft()
              this.resetSelection()
              break;
            case 'ArrowRight':
              this.cursorRight()
              this.resetSelection()
              break;
            case 'Enter':
              this.typeNewLine()
              break;
            case 'Backspace':
              this.backspace()
              this.resetSelection()
              break;
            default:
              break;
          }
        }
        this.resetSelection()
      }
    }

    window.addEventListener('keydown', this.keydownHandler)
  }

  onComponentDidUnMount() {
    window.removeEventListener('keydown', this.keydownHandler)
  }
  
  render() {
    return (
      <div>
        <TextEditorContext.Provider value={{
          toggleActiveStyles: this.toggleActiveStyles,
          toggleBoldStyle: this.toggleBoldStyle,
          toggleItalicStyle: this.toggleItalicStyle,
          toggleUnderlinedStyle: this.toggleUnderlinedStyle,
          toggleStrikethroughStyle: this.toggleStrikethroughStyle,
          createMathElement: this.createMathElement,
          ...this.state,
        }}>
          {this.props?.children}
        </TextEditorContext.Provider>
      </div>
    )
  }
}

export default TextEditorProvider