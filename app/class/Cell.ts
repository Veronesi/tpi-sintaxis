import Variable from '../class/Variable'
import Terminal from '../class/Terminal'
import SymbolGramatical from '../class/SymbolGramatical'

interface Cell {
    varaible: Variable,
    terminal: Terminal,
    elements: Array<SymbolGramatical>
}

export default Cell