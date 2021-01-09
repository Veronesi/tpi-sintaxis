import SymbolGramatical from "../class/SymbolGramatical"
import TAS from './tas'
import table from '../configs/table'
import Stack from "../class/Stack"
import { Tree, EmptyTerminal } from "../class/Tree"
import LexicalItem from "../class/LexicalItem"
import Terminal from "../class/Terminal"
import SyntacticAnalizerDontEqualTerminalError from '../class/errors/SyntacticAnalizerDontEqualTerminalError'
import SyntacticAnalizerUnexpectedTerminalError from "../class/errors/SyntacticAnalizerUnexpectedTerminalError"
import Warn from './Warn'
import { json } from "express"
import Varaible from "../class/Variable"

/**
 * @description Analizador Sintáctico Descendente Predictivo No Recursivo
 * @property TAS: la tabla Variable/Terminal
 * @property stack: pila de elementos 
 * @property inputString: Cadena de entrada
 */
class SyntacticAnalizer {
    TAS: TAS
    stack: Array<Stack>
    inputString: Array<LexicalItem>
    pointer: number
    derivationTree: Tree

    constructor(inputString: Array<LexicalItem>) {
        this.inputString = inputString
        this.TAS = new TAS()
        this.TAS.load(table)
        this.stack = []
        this.pointer = 0

        // Cargamos el simbolo $
        this.stack.push({
            symbol: SymbolGramatical.peso,
            pointer: Math.random(),
            lexema: '$'
        })

        // cargamos la variable inicial (Programa)
        let newItemSack: Stack = {
            symbol: SymbolGramatical.Programa,
            pointer: Math.random(),
            lexema: ''
        }
        this.stack.push(newItemSack)

        // Inicializamos el arbol
        this.derivationTree = new Tree({
            symbolGramatical: SymbolGramatical.Programa,
            lexema: '',
            childs: [],
            pointer: newItemSack.pointer
        })
    }

    async _analizer(): Promise<Tree> {
        let top = this.stack.pop()
        let symbol = this.inputString[this.pointer];
        if (!top)
            return this.derivationTree;

        if (!symbol) {
            return this.completeTree()
        }

        // Verificamos si es un Terminal o Variable
        if (top.symbol.typeof() == Terminal.toString()) {
            if (top.symbol != Terminal.epsilon) {
                if (top.symbol != symbol.symbol) {
                    Warn.criticalError(`SyntaxError: Unexpected token '${symbol.lexema}' an '${top.symbol}' was expected in some line.`)
                    return new Tree({
                        symbolGramatical: Terminal.DEFAULT,
                        lexema: '',
                        childs: [],
                        pointer: -1
                    });
                    
                }
                this.derivationTree.setTerminal({
                    symbol: top.symbol,
                    pointer: top.pointer,
                    lexema: symbol.lexema
                })
                this.pointer++;
            }
        } else {

            this.derivationTree.show()
            // Obtenemos TAS[X, a]
            let cell: SymbolGramatical[] = this.TAS.getElements(top.symbol.toVariable(), symbol.symbol.toTerminal())
            const newItemsStack = cell.map((element, index) => {
                return {
                    symbol: element.toSymbolGramatical(),
                    pointer: Math.random(),
                    lexema: (index == 0 && element.typeof() == Terminal.toString()) ? (Terminal.epsilon == element ? Terminal.epsilon : symbol.lexema) : ''
                }
            }).reverse();

            // Actualizamos la pila
            this.stack = [...this.stack, ...newItemsStack]

            // Agregamos los nuevos hijos al arbol
            let _ = await newItemsStack.reverse().map(element => {
                return new Tree({
                    symbolGramatical: element.symbol,
                    lexema: element.lexema,
                    childs: [],
                    pointer: element.pointer
                })
            })
            this.derivationTree.setChilds(top.pointer, _)
        }

        return this._analizer()
    }

    completeTree(): Tree {
        let top = this.stack[this.stack.length - 1]

        let isCompleted = this.derivationTree.isCompleted()
        if(isCompleted)
            return this.derivationTree;

        if (top.symbol == Terminal.peso) {
            let nextEmptyVariable = this.derivationTree.getNextEmptyVariable()
            
            let cell = this.TAS.getElements(nextEmptyVariable.symbol, Terminal.epsilon)

            let _ = [new Tree({
                symbolGramatical: Terminal.epsilon,
                lexema: Terminal.epsilon,
                childs: [],
                pointer: Math.random()
            })]
            this.derivationTree.setChilds(nextEmptyVariable.pointer, _)
        } else {
            Warn.criticalError(`SyntaxError: '${top.symbol}' was expected after '${this.inputString[this.inputString.length-1].lexema}' in some line.`)
            process.exit()
        }

        return this.completeTree()
    }
}

export default SyntacticAnalizer