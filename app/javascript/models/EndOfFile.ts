import Character from "./Character"

export default class EndOfFile extends Character {
  constructor() {
    super({ text: '' })
  }
  type = 'EOF'
}
