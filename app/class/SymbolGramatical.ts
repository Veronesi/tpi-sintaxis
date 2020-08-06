import Terminal from './Terminal'
import Variable from './Variable'

const SymbolGramatical = {
    ...Terminal,
    ...Variable,
 }
 
 type SymbolGramatical = Terminal | Variable

export default SymbolGramatical