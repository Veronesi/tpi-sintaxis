import Cell from '../class/Cell'
import Variable from '../class/Variable'
import Terminal from '../class/Terminal'
import SymbolGramatical from '../class/SymbolGramatical'

class TAS {
    /**
     * @todo ver que tipo de variable deberia ser
     */
    table: any

    constructor(){
        this.table = []
    }

    /**
     * 
     * @param table 
     */
    load(table: Array<Cell>){
        table.forEach( row => {
            // init row for this Variable
            Object.keys(this.table).includes(row.varaible) ? null : this.table[row.varaible] = []
            Object.keys(this.table[row.varaible]).includes(row.terminal) ? null : this.table[row.varaible][row.terminal] = [];

            this.table[row.varaible][row.terminal] = row.elements
        })
    }

    /**
     * 
     * @param x variable (Fila)
     * @param symbol terminal (columna)
     * @returns devuelve la produccion de la variable x que genera al terminal symbol 
     */
    getElements(x: Variable, symbol: Terminal): Array<SymbolGramatical>{
        return this.table[x][symbol]
    }
}

export default TAS
