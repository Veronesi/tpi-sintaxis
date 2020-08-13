import Cell from '../class/Cell'
import Variable from '../class/Variable'
import Terminal from '../class/Terminal'


/**
 * @description variable = "Fila A en el excel, Columna X-esima"
 *              terminal = "Primera columna del excel, Fila Y-esima"
 *              elements = "la celda [X;Y]"
 */
const table: Array<Cell> = [
    { 
        varaible: Variable.Programa,
        terminal: Terminal.id, 
        elements: [
            Variable.DeclaracionVariables
        ] },
    {
        varaible: Variable.DeclaracionVariables,    // <DeclaracionVariables> [A;3]
        terminal: Terminal.vars,                    // "vars" [C;1]
        elements: [                                 // “vars” <ListaVariables> [C;3]
            Terminal.vars, 
            Variable.ListaVariables
        ]
    },{
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.id,
        elements: [
            Terminal.epsilon
        ]
    }
]

export default table