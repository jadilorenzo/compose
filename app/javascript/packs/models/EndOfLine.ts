import Character from "./Character"

export default class EndOfLine extends Character {
  constructor() {
    super({ text: '' })
  }
  type = 'EOL'
}
