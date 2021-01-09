import Cell from '../class/Cell'
import Variable from '../class/Variable'
import Terminal from '../class/Terminal'
import SymbolGramatical from '../class/SymbolGramatical'

import TasEmptyCellError from '../class/errors/TasEmptyCellError'
import Varaible from '../class/Variable'

class TAS {
    /**
     * @todo ver que tipo de variable deberia ser
     */
    table: any

    constructor() {
        this.table = []
    }

    /**
     * @description Carga la TAS elemento a elemento
     * @param table 
     */
    load(table: Array<Cell>) {
        table.forEach(row => {

            // Cargamos la tabla
            Object.keys(this.table).includes(row.varaible)
                ? null
                // Si es la primera entrada para la variable
                : this.table[row.varaible] = []

            Object.keys(this.table[row.varaible]).includes(row.terminal)
                ? null
                // Si es la primera celda que se va a crear para esta variable la inicializamos
                : this.table[row.varaible][row.terminal] = [];

            this.table[row.varaible][row.terminal] = row.elements
        })
    }

    /**
     * @param x variable (Fila)
     * @param symbol terminal (columna)
     * @returns devuelve la produccion de la variable x que genera al terminal symbol 
     */
    getElements(x: Variable, symbol: Terminal): Array<SymbolGramatical> {
        let elements: Array<SymbolGramatical> = []
        try {
            elements = this.table[x][symbol]
            if (!elements)
                elements = this.table[x][Terminal.epsilon]
            if(!elements)
                throw new TasEmptyCellError(x, symbol);
            
            return elements;
        } catch (err) {
            if (err instanceof TasEmptyCellError)
                console.log(err.showError())
            else
                console.log(err);

            process.exit()
        }
    }
    generatePeso(x: Varaible){
        return Object.keys(this.table[x]).includes(Terminal.peso)
    }
}

export default TAS
