import Stack from './Stack'
import SymbolGramatical from './SymbolGramatical'

class Tree {
    symbol: SymbolGramatical
    lexema: String
    childs: Array<Tree>
    pointer: number
    constructor({ symbolGramatical, lexema = "", childs = [], pointer = Math.random() }: { symbolGramatical: SymbolGramatical, lexema: String, childs: Array<Tree>, pointer: number }) {
        this.symbol = symbolGramatical
        this.lexema = lexema
        this.childs = childs
        this.pointer = pointer
    }
    setChilds(pointer:number, childs: Array<Tree>): boolean{
        if (this.pointer == pointer) {
            this.childs = childs
            return true
        } else {
            for(let child in this.childs){
                if(this.childs[child].hasChild(pointer)){
                    return this.childs[child].setChilds(pointer, childs)  
                }
            }
            return false
        }
    }
    hasChild(pointer: number): boolean {
        return this.pointer == pointer ? true : (this.childs.length ? Boolean(this.childs.find(child => child.hasChild(pointer))) : false)
    }
    setTerminal(stack: Stack): boolean {
        if (this.pointer == stack.pointer) {
            this.lexema = stack.lexema
            return true
        } else {
            for(let child in this.childs){
                if(this.childs[child].hasChild(stack.pointer)){
                    return this.childs[child].setTerminal(stack)  
                }
            }
            return false
        }
    }

}

export default Tree