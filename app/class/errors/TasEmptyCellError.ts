import Variable from '../Variable'
import Terminal from '../Terminal'
class TasEmptyCellError extends Error {
    variable: Variable
    symbol: Terminal
    constructor(variable: Variable, symbol: Terminal) {
        super("");

        this.variable = variable;
        this.symbol = symbol;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, TasEmptyCellError.prototype);
    }

    showError() {
        return `TasEmptyCellError: la variable ${this.variable} no genera al terminal "${this.symbol}"`;
    }
}

export default TasEmptyCellError;