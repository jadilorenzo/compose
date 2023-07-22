import DocumentStyled from "../../../app/javascript/packs/models/DocumentStyled"

describe('DocumentStyled', () => {
  describe('#styleSelection', () => {
    let document
    beforeEach(() => {
      document = new DocumentStyled()
      document.typeCharacter({ key: 'A' })
      document.typeCharacter({ key: 'B' })
      document.typeCharacter({ key: 'C' })
    })

    it('styles bold correctly', () => {
      document.setSelection({
        start: 0,
        end: 2
      })
      document.styleSelection({ style: 'bold' })
      expect(document.elements[0].styles?.includes('bold')).toBeTruthy()
      expect(document.elements[1].styles?.includes('bold')).toBeTruthy()
      expect(document.elements[2].styles?.includes('bold')).toBeFalsy()
    })

    it('styles underlined correctly', () => {
      document.setSelection({
        start: 0,
        end: 2
      })
      document.styleSelection({ style: 'underlined' })
      expect(document.elements[0].styles?.includes('underlined')).toBeTruthy()
      expect(document.elements[1].styles?.includes('underlined')).toBeTruthy()
      expect(document.elements[2].styles?.includes('underlined')).toBeFalsy()
    })

    it('styles strikethrough correctly', () => {
      document.setSelection({
        start: 0,
        end: 2
      })
      document.styleSelection({ style: 'strikethrough' })
      expect(document.elements[0].styles?.includes('strikethrough')).toBeTruthy()
      expect(document.elements[1].styles?.includes('strikethrough')).toBeTruthy()
      expect(document.elements[2].styles?.includes('strikethrough')).toBeFalsy()
    })

    it('styles italics correctly', () => {
      document.setSelection({
        start: 0,
        end: 2
      })
      document.styleSelection({ style: 'italics' })
      expect(document.elements[0].styles?.includes('italics')).toBeTruthy()
      expect(document.elements[1].styles?.includes('italics')).toBeTruthy()
      expect(document.elements[2].styles?.includes('italics')).toBeFalsy()
    })
  })
})
