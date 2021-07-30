import Variable from '../class/Variable'
import Terminal from '../class/Terminal'
import SymbolGramatical from '../class/SymbolGramatical'

/**
 * @description Celda de la tabla de la TAS
 * @param variable 
 * @param terminal 
 * @param elements Elementos que genera la variable con respecto al terminal
 */
interface Cell {
    varaible: Variable,
    terminal: Terminal,
    elements: Array<SymbolGramatical>
}

export default Cell