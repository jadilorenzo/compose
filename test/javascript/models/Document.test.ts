import Document from "../../../app/javascript/packs/models/Document";

describe('Document', () => {
  describe('#createMathElement', () => {
    it('takes previous selection', () => {
      const document = new Document()
      document.typeCharacter({key: 'x'})
      document.typeCharacter({key: '^'})
      document.typeCharacter({key: '2'})
      document.setSelection({start: 0, end: 3})
      document.createMathElement()
      expect(document.elements[0].text).toBe('x^2')
    })
  })
})