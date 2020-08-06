import SymbolGramatical from "./SymbolGramatical"
import Tree from "./Tree"

interface Stack {
    symbol: SymbolGramatical,
    tree?: Tree
}

export default Stack