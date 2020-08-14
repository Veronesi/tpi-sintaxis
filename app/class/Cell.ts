import Variable from '../class/Variable'
import Terminal from '../class/Terminal'
import SymbolGramatical from '../class/SymbolGramatical'

/**
 * @description Celda de la tabla de la tas
 * @param variable 
 * @param terminal
 * @param elements
 */
interface Cell {
    varaible: Variable,
    terminal: Terminal,
    elements: Array<SymbolGramatical>
}

export default Cell