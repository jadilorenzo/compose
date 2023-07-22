import Character from '../../../app/javascript/packs/models/Character'
import DocumentBase, { Element } from '../../../app/javascript/packs/models/DocumentBase'
import EndOfFile from '../../../app/javascript/packs/models/EndOfFile'
import EndOfLine from '../../../app/javascript/packs/models/EndOfLine'

describe('DocumentBase', () => {
  const exampleElements = [
    new Character({text: 'A', styles: [ 'bold' ]}),
    new Character({text: 'B', styles: [ 'bold' ]}),
    new Character({text: 'a'}),
    new Character({text: 'b'})
  ]

  const exampleElementsWithParagraphBreak = [
    new Character({text: 'A', styles: [ 'bold' ]}),
    new EndOfLine(),
    new Character({text: 'B'}),
  ]

  const setupDocumentBase = (elements: Element[]): DocumentBase => {
    const document = new DocumentBase()
    document.elements = elements
    document._handleEndOfFileCharacter()
    return document
  }

  describe('#typeCharacter', () => {
    it('can type characters', () => {
      const document = new DocumentBase()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      expect(document.elements).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })

    it('can type characters with moved cursor', () => {
      const document = new DocumentBase()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeCharacter({ key: 'D' })
      document.cursorLeft()
      document.typeCharacter({ key: 'C' })
      expect(document.elements).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })

    it('can type characters with newline', () => {
      const document = new DocumentBase()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeNewLine()
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      expect(document.elements).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new EndOfLine(),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })

    it('can type characters with newline and moved cursor', () => {
      const document = new DocumentBase()
      document.typeCharacter({ key: 'A' })
      document.typeNewLine()
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      document.cursorLeft()
      document.cursorLeft()
      document.cursorLeft()
      document.typeCharacter({ key: 'B' })
      expect(document.elements).toEqual([
        new Character({ text: 'A' }),
        new Character({ text: 'B' }),
        new EndOfLine(),
        new Character({ text: 'C' }),
        new Character({ text: 'D' }),
        new EndOfFile()
      ])
    })
  })

  it('#cursorLeft', () => {
    const document = new DocumentBase()
    document.typeCharacter({ key: 'A' })
    document.typeCharacter({ key: 'B' })
    document.typeNewLine()
    document.typeCharacter({ key: 'C' })
    document.typeCharacter({ key: 'D' })
    const positions = [
      document.position,
      document.cursorLeft().position,
      document.cursorLeft().position,
      document.cursorLeft().position,
      document.cursorLeft().position,
      document.cursorLeft().position,
    ]
    expect(positions).toEqual([
      5,
      4,
      3,
      2,
      1,
      0
    ])
  })

  describe('#backspace', () => {
    it('removes single character', () => {
      const document = new DocumentBase()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.backspace()
      expect(document.elements).toHaveLength(2)
      expect(document.position).toEqual(1)
    })

    it('removes selection', () => {
      const document = new DocumentBase()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.setSelection({
        start: 1,
        end: 0
      })
      document.backspace()
      expect(document.elements).toHaveLength(2)
      expect(document.position).toEqual(0)
    })

    it('removes selection including new line', () => {
      const document = new DocumentBase()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeNewLine()
      document.typeCharacter({ key: 'C' })
      document.typeCharacter({ key: 'D' })
      document.setSelection({
        start: 0,
        end: 3
      })
      document.backspace()
      expect(document.elements).toHaveLength(3)
      expect(document.position).toEqual(0)
      expect(document.elements).toEqual([
        new Character({ text: 'C'}),
        new Character({ text: 'D'}),
        new EndOfFile()
      ])
    })
  })

  it('#setSelection', () => {
    const document = new DocumentBase()
    document.typeCharacter({ key: 'A' })
    document.typeCharacter({ key: 'B' })
    document.setSelection({
      start: 1,
      end: 0
    })
    expect(document.selection).toEqual({
      start: 0,
      end: 1
    })
  })
})
