import SymbolGramatical from "../class/SymbolGramatical"
import TAS from './tas'
import table from '../configs/table'
import Stack from "../class/Stack"
import Tree from "../class/Tree"
import LexicalItem from "../class/LexicalItem"
import Terminal from "../class/Terminal"
import SyntacticAnalizerDontEqualTerminalError from '../class/errors/SyntacticAnalizerDontEqualTerminalError'
import SyntacticAnalizerUnexpectedTerminalError from "../class/errors/SyntacticAnalizerUnexpectedTerminalError"
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

        // Cargamos el simbolo inicial de la gramatica e inicializamos el Arbol
        let newItemSack: Stack = {
            symbol: SymbolGramatical.Programa,
            pointer: Math.random(),
            lexema: ''
        }
        this.stack.push(newItemSack)

        this.derivationTree = new Tree({
            symbolGramatical: SymbolGramatical.Programa,
            lexema: '',
            childs: [],
            pointer: newItemSack.pointer
        })
    }

    start() {
        /*
        console.log('---'+this.pointer+'---')
        console.log(this.stack)
        console.log(JSON.stringify(this.derivationTree))
        */
        let top = { ...this.stack[this.stack.length - 1] }
        // Verificamos si ya terminamos de analizar
        if (this.pointer == this.inputString.length) {
            if (top.symbol == SymbolGramatical.peso) {
                /*
                                console.log(this.stack)
                console.log(JSON.stringify(this.derivationTree))
                */
            } else {
                try {
                    // Terminamos de analizar la cadena de entrada, ahora tratamos de "vaciar" la pila
                    if (this.stack[this.stack.length - 1].symbol.typeof() == 'terminal')
                        throw new SyntacticAnalizerUnexpectedTerminalError(this.stack[this.stack.length - 1].symbol, this.inputString[this.pointer - 1].symbol)
                    let epsilonProduction: Array<SymbolGramatical> = this.TAS.getElements(this.stack[this.stack.length - 1].symbol.toVariable(), Terminal.peso)

                    this.derivationTree.setChilds(top.pointer, [new Tree({
                        symbolGramatical: SymbolGramatical.epsilon,
                        lexema: SymbolGramatical.epsilon,
                        childs: [],
                        pointer: Math.random()
                    })])

                    this.stack = this.stack.slice(0, -1)
                    this.start()
                } catch (err) {
                    if (err instanceof SyntacticAnalizerUnexpectedTerminalError)
                        console.log(err.showError())
                    else
                        console.log(err);

                    process.exit()
                }
            }
        } else {
            top = { ...top, lexema: this.inputString[this.pointer].lexema }
            if (top.symbol !== SymbolGramatical.peso) {
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
                this.start()
            } else {
                console.log('listo!')
            }

        }

    }
}

export default SyntacticAnalizer