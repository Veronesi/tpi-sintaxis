import SymbolGramatical from "../class/SymbolGramatical"
import TAS from './tas'
import table from '../configs/table'
import Stack from "../class/Stack"
import Tree from "../class/Tree"

class SyntacticAnalizer {
    TAS: TAS
    stack: Array<Stack>
    inputString: string
    constructor() {
        this.inputString = "" // change for input string
        this.TAS = new TAS()
        this.TAS.load(table)
        this.stack = []

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