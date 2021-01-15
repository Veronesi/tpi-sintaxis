import InputString from "../class/InputString"
import "../class/SymbolGramatical"
import LexicalItem from "../class/LexicalItem"
import Terminal from "../class/Terminal"

interface StackChar {
  type: string,
  lexema: string
}

class LexicalAnalyzer {
  inputString: InputString
  lexicals: Array<LexicalItem>

  constructor(inputString: string) {
    this.inputString = new InputString(inputString)
    this.lexicals = []
  }

  parser() {
    let char = "";
    let stackChar: Array<StackChar> = []
    let complete = false;

    // Borramos los espacios en blancos al inicio del terminal
    this.inputString.clearSpace()

    while (!complete) {
        char = this.inputString.next()

      // Obtenemos el tipo del proximo caracter
      if (char) {
        let groups = char.match(/^(?<string>[A-z])|(?<number>\d)|(?<symbol>\D)/)?.groups
        let nextChar = { type: 'NaT', lexema: 'NaL' }
        for (let typeChar in groups) {
          nextChar = groups[typeChar] ? { type: typeChar, lexema: groups[typeChar] } : nextChar;
        }
        try {
          if (stackChar.length) {
            // Verificamos si es valido:
            if (this.checkTypeValidate(stackChar[0], nextChar, stackChar[stackChar.length-1],stackChar.length)) {
              stackChar.push(nextChar)
            } else {
              complete = true
              // Creamos un nuevo lexema
              
              this.inputString.back()

              this.setLexical(stackChar)
            }
          } else {
            stackChar.push(nextChar)
          }
        } catch (error) {
          console.log(error)
        }
      }
      if (this.inputString.overflow()) {
        complete = true
        this.setLexical(stackChar)
      }
    }
  }

  setLexical(stackChar: Array<StackChar>) {
    let terminal = stackChar.reduce((acc, x) => { return acc + x.lexema }, '')

    switch (stackChar[0].type) {
      case 'string':

        if (terminal.toTerminal() == Terminal.DEFAULT) {
          this.lexicals.push({
            symbol: Terminal.id,
            lexema: terminal
          })
        } else {
          this.lexicals.push({
            symbol: terminal.toTerminal(),
            lexema: terminal
          })
        }
        break;
      case 'number':
        this.lexicals.push({
          symbol: Terminal.numero,
          lexema: terminal
        })
        break;
      default:
        if(/^".*"$/.test(terminal)){
          this.lexicals.push({
            symbol: Terminal.comilla,
            lexema: Terminal.comilla
          })

          this.lexicals.push({
            symbol: Terminal.cadena,
            lexema: terminal.slice(1,-1)
          })

          this.lexicals.push({
            symbol: Terminal.comilla,
            lexema: Terminal.comilla
          })
          return
        }
        if (terminal.toTerminal() == Terminal.DEFAULT) {
          throw new Error('LexicalError!')
        } else {
          this.lexicals.push({
            symbol: terminal.toTerminal(),
            lexema: terminal
          })
        }
        break;
    }
  }

  /**
   * @description verifica si el tipo del caracter proximo es valido para el primero
   */
  checkTypeValidate(first: StackChar, last: StackChar, lastest: StackChar,length: number = 1) {
    if ((first.lexema == '"' && lastest.lexema != '"' && length > 1) || (first.lexema == '"' && length < 3))
      return true
    if (first.type == 'string' && (last.type == 'string' || last.type == 'number'))
      return true
    if (first.type == last.type && last.type == 'number')
      return true

    if (last.lexema == '*' && ['*', '/'].includes(first.lexema))
      return true

    return last.lexema == "=" && first.lexema == "="
  }

}

export default LexicalAnalyzer