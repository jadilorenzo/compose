interface Paramaters {
  text: string
  type ?: 'text' | 'EOF' | 'EOL' | 'MATH_I' | 'MATH_B'
  styles ?: string[]
  fontSize ?: number 
}

export const defaults: Paramaters = { text: "", type: "text", styles: [], fontSize: 11 }

export default class Character {
  styles: string[]
  text: string
  type: string
  fontSize: number
  constructor({ 
    text = defaults.text, 
    type = defaults.type, 
    styles = defaults.styles, 
    fontSize = defaults.fontSize
  }: Paramaters) {
    this.text = text
    this.type = (type as string)
    this.styles = (styles as string[])
    this.fontSize = (fontSize as number)
  }
}
