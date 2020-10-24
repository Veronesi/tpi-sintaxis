import Variable from '../Variable'
import Terminal from '../Terminal'
class SyntacticAnalizerUnexpectedTerminalError extends Error {
    terminal: string
    top: string
    constructor(terminal: string, top: string) {
        super("");

        this.terminal = terminal;
        this.top = top;
        
        Object.setPrototypeOf(this, SyntacticAnalizerUnexpectedTerminalError.prototype);
    }

    showError() {
        return `SyntacticAnalizerUnexpectedTerminalError: se esperaba un "${this.terminal}" luego de "${this.top}"`;
    }
}

export default SyntacticAnalizerUnexpectedTerminalError;