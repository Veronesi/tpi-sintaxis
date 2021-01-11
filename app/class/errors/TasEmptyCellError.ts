import Variable from '../Variable'
import Terminal from '../Terminal'
class TasEmptyCellError extends Error {
    variable: Variable
    symbol: Terminal
    constructor(variable: Variable, symbol: Terminal) {
        super("");

        this.variable = variable;
        this.symbol = symbol;
        
        Object.setPrototypeOf(this, TasEmptyCellError.prototype);
    }

    showError() {
        return `\x1b[31mTasEmptyCellError: la variable ${this.variable} no genera al terminal "${this.symbol}"\x1b[0m`;
    }
}

export default TasEmptyCellError;