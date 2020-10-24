import Variable from '../Variable'
import Terminal from '../Terminal'
class SyntacticAnalizerDontEqualTerminalError extends Error {
    terminal: string
    top: string
    constructor(terminal: string, top: string) {
        super("");

        this.terminal = terminal;
        this.top = top;
        
        
        Object.setPrototypeOf(this, SyntacticAnalizerDontEqualTerminalError.prototype);
    }

    showError() {
        return `SyntacticAnalizerDontEqualTerminalError: se esperaba un "${this.top}" y no "${this.terminal}"`;
    }
}

export default SyntacticAnalizerDontEqualTerminalError;