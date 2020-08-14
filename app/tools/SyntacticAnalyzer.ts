import SymbolGramatical from "../class/SymbolGramatical"
import TAS from './tas'
import table from '../configs/table'
import Stack from "../class/Stack"
import Tree from "../class/Tree"

/**
 * @description Analizador Sintáctico Descendente Predictivo No Recursivo
 * @property TAS: la tabla Variable/Terminal
 * @property stack: pila de elementos 
 * @property inputString: Cadena de entrada
 */
class SyntacticAnalizer {
    TAS: TAS
    stack: Array<Stack>
    inputString: string
    constructor() {
        this.inputString = "" // change for input string
        this.TAS = new TAS()
        this.TAS.load(table)
        this.stack = []

        // Cargamos el simbolo $
        this.stack.push({
            symbol: SymbolGramatical.peso,
            tree: new Tree({
                symbolGramatical: SymbolGramatical.peso,
                lexema: '$',
                childs: []
            })
        })
    }
}

export default SyntacticAnalizer