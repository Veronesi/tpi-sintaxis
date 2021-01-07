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

    async _analizer() {
        let top = this.stack.pop()
        let symbol = this.inputString[this.pointer];

        if (!top)
            return true;

        if (!symbol) {
            return this.completeTree()
        }

        /*
            Falta Exito y completar el arbol
        */

        // Verificamos si es un Terminal o Variable
        if (top.symbol.typeof() == Terminal.toString()) {
            if (top.symbol != Terminal.epsilon) {
                if (top.symbol != symbol.symbol) {
                    console.log('error')
                    return false;
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

        this._analizer()
    }

    completeTree() {
        console.log('completando arbol con e-producciones...')

    }

    /*


    start() {

            top = top.symbol.typeof() == 'terminal' ? { ...top, lexema: this.inputString[this.pointer].lexema } : top

            if (top.symbol !== SymbolGramatical.peso) {
                let nextEmptyTerminal: EmptyTerminal = this.derivationTree.getNextEmptyTerminal()

                // Verificamos si el proximo terminal a analizar ya esta en el arbol pero sin "vincular"
                if (nextEmptyTerminal.pointer != -1 && top.symbol == nextEmptyTerminal.symbol) {
                    this.derivationTree.setTerminal({
                        symbol: nextEmptyTerminal.symbol,
                        pointer: nextEmptyTerminal.pointer,
                        lexema: top.lexema
                    })
                    this.stack = this.stack.slice(0, -1)
                    this.pointer++
                } else {
                    if (top.symbol.typeof() == Terminal.toString()) {
                        try {
                            if (top.symbol == Terminal.epsilon) {
                                this.stack = this.stack.slice(0, -1)
                            } else {
                                // El proximo elemento en la pila es un Terminal
                                if (top.symbol != this.inputString[this.pointer].symbol) {

                                    throw new SyntacticAnalizerDontEqualTerminalError(this.inputString[this.pointer].symbol, top.symbol)
                                }
                                this.stack = this.stack.slice(0, -1)
                                this.pointer++
                            }

                        } catch (err) {
                            console.log(err.showError())
                            process.exit()
                        }

                    } else {
                        // El proximo elemento en la pila es una Variable
                        let elements: Array<SymbolGramatical> = this.TAS.getElements(top.symbol.toVariable(), this.inputString[this.pointer].symbol.toTerminal())
                        let _lexema = (elements.length == 1 && elements[0] == Terminal.epsilon) ? Terminal.epsilon : ''
                        let newTopStack = elements.reverse().map(stack => {
                            return {
                                symbol: stack.toSymbolGramatical(),
                                pointer: Math.random(),
                                lexema: _lexema
                            }
                        })
                        this.stack = this.stack.slice(0, -1)
                        this.stack = [...this.stack, ...newTopStack]

                        if (newTopStack[newTopStack.length - 1].symbol != Terminal.epsilon && newTopStack[newTopStack.length - 1].symbol.typeof() == 'terminal') {
                            newTopStack[newTopStack.length - 1].lexema = this.inputString[this.pointer].lexema
                        }

                        this.derivationTree.setChilds(top.pointer, newTopStack.reverse().map(stack => {
                            return new Tree({
                                symbolGramatical: stack.symbol,
                                lexema: stack.lexema,
                                childs: [],
                                pointer: stack.pointer
                            })
                        }))
                    }
                }
                this.start()
            } else {
                console.log('listo!')
            }

    */
}

export default SyntacticAnalizer