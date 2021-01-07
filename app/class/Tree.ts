import Stack from './Stack'
import SymbolGramatical from './SymbolGramatical'
import Terminal from './Terminal'
import Warn from '../tools/Warn'
interface EmptyTerminal {
    symbol: Terminal,
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

    getNextEmptyTerminal(): EmptyTerminal {
        if (this.symbol.typeof() == 'terminal' && this.lexema == '')
            return { symbol: this.symbol.toTerminal(), pointer: this.pointer }
        for (let i in this.childs) {
            let child = this.childs[i].getNextEmptyTerminal()
            if (child.pointer > -1)
                return child

        }

        return { symbol: Terminal.DEFAULT, pointer: -1 }
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

    show(e = 0, last = true, symbol = '') {
        if (this.symbol.typeof() == Terminal.toString())
            Warn.nodesT(`${"".padStart(e * 3, " ")}${last ? '└>' : '├>'}`,`${this.symbol} [${symbol}]`);
        else
            Warn.nodesV(`${"".padStart(e * 3, " ")}${last ? '└>' : '├>'}`, this.symbol);
        for (let [index, child] of this.childs.entries()) {
            child.show(e + 1, index == this.childs.length - 1, child.lexema)
        }
    }

}

export { Tree, EmptyTerminal }