import SymbolGramatical from "./SymbolGramatical"

interface Stack {
    symbol: SymbolGramatical,
    pointer: number,
    lexema: string
}

export default Stack