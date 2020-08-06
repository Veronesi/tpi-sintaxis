"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TAS {
    constructor() {
        this.table = [];
    }
    /**
     *
     * @param table
     */
    load(table) {
        table.forEach(row => {
            // init row for this Variable
            Object.keys(this.table).includes(row.varaible) ? null : this.table[row.varaible] = [];
            Object.keys(this.table[row.varaible]).includes(row.terminal) ? null : this.table[row.varaible][row.terminal] = [];
            this.table[row.varaible][row.terminal] = row.elements;
        });
    }
    /**
     *
     * @param x variable (Fila)
     * @param symbol terminal (columna)
     * @returns devuelve la produccion de la variable x que genera al terminal symbol
     */
    getElements(x, symbol) {
        return this.table[x][symbol];
    }
}
exports.default = TAS;
