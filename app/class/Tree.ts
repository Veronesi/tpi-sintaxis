import Stack from './Stack'
import SymbolGramatical from './SymbolGramatical'
import Terminal from './Terminal'
import Variable from './Variable'
import Warn from '../tools/Warn'
interface EmptyTerminal {
    symbol: Terminal,
    pointer: number
}

interface EmptyVariable {
    symbol: Variable,
    pointer: number
}

class Tree {
    symbol: SymbolGramatical
    lexema: string
    childs: Array<Tree>
    pointer: number
    constructor({ symbolGramatical, lexema = "", childs = [], pointer = Math.random() }: { symbolGramatical: SymbolGramatical, lexema: string, childs: Array<Tree>, pointer: number }) {
        this.symbol = symbolGramatical
        this.lexema = lexema
        this.childs = childs
        this.pointer = pointer
    }
    setChilds(pointer: number, childs: Array<Tree>): boolean {
        if (this.pointer == pointer) {
            this.childs = childs
            return true
        } else {
            for (let child in this.childs) {
                if (this.childs[child].hasChild(pointer)) {
                    return this.childs[child].setChilds(pointer, childs)
                }
            }
            return false
        }
    }

    getNextEmptyTerminal(strict = true): EmptyTerminal {
        if (this.symbol.typeof() == 'terminal' && this.lexema == '')
            return { symbol: this.symbol.toTerminal(), pointer: this.pointer }
        for (let i in this.childs) {
            let child = this.childs[i].getNextEmptyTerminal(strict)
            if (child.pointer > -1)
                return child
        }
        if (strict) {
            console.log('error: getNextEmptyTerminal')
            process.exit()
        }
        return { symbol: Terminal.DEFAULT, pointer: -1 }
    }

    getNextEmptyVariable(strict = false): EmptyVariable {
        if (this.childs.length == 0 && this.symbol.typeof() == Variable.toString()) {
            return { pointer: this.pointer, symbol: this.symbol.toVariable() }
        }

        for (let child of this.childs) {

            let _ = child.getNextEmptyVariable(strict);
            if (_.pointer > -1) {
                return { pointer: _.pointer, symbol: _.symbol.toVariable() }
            }

        }
        /*
        if (strict) {
            console.log('error: getNextEmptyVariable')
            process.exit()
        }
        */
        return { pointer: -1, symbol: Variable.DEFAULT }
    }

    hasChild(pointer: number): boolean {
        return this.pointer == pointer ? true : (this.childs.length ? Boolean(this.childs.find(child => child.hasChild(pointer))) : false)
    }
    setTerminal(stack: Stack): boolean {
        if (this.pointer == stack.pointer) {
            this.lexema = stack.lexema
            return true
        } else {
            for (let child in this.childs) {
                if (this.childs[child].hasChild(stack.pointer)) {
                    return this.childs[child].setTerminal(stack)
                }
            }
            return false
        }
    }

    isCompleted(): boolean {
        if (this.childs.length == 0 && this.symbol.typeof() == Variable.toString()) {
            return false
        }

        for (let child of this.childs) {
            let _ = child.getNextEmptyVariable(false);
            if (_.pointer > -1) {
                return false
            }

        }
        return true
    }

    show(e = 0, last = true, symbol = '') {
        if (this.symbol.typeof() == Terminal.toString())
            Warn.nodesT(`${"".padStart(e * 3, " ")}${last ? '└>' : '├>'}`, `${this.symbol} [${symbol}]`);
        else
            Warn.nodesV(`${"".padStart(e * 3, " ")}${last ? '└>' : '├>'}`, this.symbol);
        for (let [index, child] of this.childs.entries()) {
            child.show(e + 1, index == this.childs.length - 1, child.lexema)
        }
    }
}

export { Tree, EmptyTerminal }