import SymbolGramatical from './SymbolGramatical'

class Tree {
    symbol: SymbolGramatical
    Lexema: String
    childs: Array<Tree>
    constructor({ symbolGramatical, lexema = "", childs = [] }: { symbolGramatical: SymbolGramatical, lexema: String, childs: Array<Tree> }) {
        this.symbol = symbolGramatical
        this.Lexema = lexema
        this.childs = childs
    }
}

export default Tree