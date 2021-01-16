import { isThisTypeNode } from 'typescript';
import Terminal from '../class/Terminal';
import { Tree } from '../class/Tree'
import Varaible from '../class/Variable';

const readline = require('readline');

enum DataType {
    String = 0,
    Number = 1,
    Array = 2,
    Null = 3,
    Operator = 4
}

interface Temp {
    hash: number,
    operator: TypeOperator,
    value: number,
    future: number
}

enum TypeOperator {
    MAS = 0,
    MENOS = 1,
    POR = 2
}

interface Var {
    name: string
    type: DataType
    value: number | string
}

interface Expresion {
    value: number | boolean | string
    type: DataType
}

interface Number extends Expresion {
    value: number
}

interface String extends Expresion {
    value: string
}

interface Boolean extends Expresion {
    value: number
}

interface Operator extends Expresion {
    value: TypeOperator
}

class Interpreter {
    derivationTree: Tree
    vars: Var[]
    stackExpresion: Expresion[]
    temp: number

    constructor(derivationTree: Tree, vars: Var[] = []) {
        this.derivationTree = derivationTree;
        this.vars = vars
        this.stackExpresion = []
        this.temp = 0
    }

    /**
     * @description encargado de ejecutar Cuerpos
     * @param tree 
     */
    _run(tree: Tree = this.derivationTree.childs[1], success: Function = () => { }) {
        const child = tree.childs[0]
        if (!child){
            return
        }
            

        if (child.symbol.typeof() == Varaible.toString())
            switch (child.symbol.toVariable()) {
                case Varaible.Sentencia:
                    this.switchSentencia(child, () => {
                        this._run(tree.deleteChild())
                    })
                    break;
                case Varaible.CuerpoFin:
                    // Verificamos si es una e-producion    
                    if (child.childs[0].symbol == Terminal.epsilon)
                        return

                    this.switchSentencia(child.childs[0], () => {
                        this._run(child.childs[2], () => {
                            this._run(tree.deleteChild())
                        })
                    })

                    break;
                default:
                    console.log('error')
                    break;
            } else {
            this._run(tree.deleteChild())
        }

        success()
        
        /*
        for (const child of tree.childs) {
            if (child.symbol.typeof() == Varaible.toString())
                switch (child.symbol.toVariable()) {
                    case Varaible.Sentencia:
                        this.switchSentencia(child)
                        break;
                    case Varaible.CuerpoFin:
                        // Verificamos si es una e-producion    
                        if (child.childs[0].symbol == Terminal.epsilon)
                            return
                        
                        this.switchSentencia(child.childs[0], () => {
                             this._run(child.childs[2])
                        })
                        
                        break;
                    default:
                        console.log('error')
                        break;
                }
        }
        */
    }

    excecuteSentence() {

    }

    switchSentencia(tree: Tree, success: Function = () => { }) {
        const sentencia = tree.childs[0];
        switch (sentencia.symbol.toVariable()) {
            case Varaible.Asignacion:
                this.asignacion(sentencia, success)
                break;
            case Varaible.Condicional:
                this.condicional(sentencia, success)
                break;
            case Varaible.Escritura:
                this.escritura(sentencia, success);
                break;
            case Varaible.Lectura:
                this.lectura(sentencia, success);
                break;
            default:
                console.log(tree)
                process.exit()
                break;
        }
    }

    asignacion(tree: Tree,success: Function = () => {}) {
        const variable = this.nameToVariable(tree.childs[0].lexema);
        variable.value = this.expresion(tree.childs[2])
        success()
    }

    expresion(tree: Tree): number {
        if (tree.childs[0].symbol.typeof() == Terminal.toString()) {
            // caso especial de <SiguientePR>
            switch (tree.childs[0].symbol.toTerminal()) {
                case Terminal.parentesisOpen:
                    return this.expresion(tree.childs[1])

                case Terminal.id:
                    return Number(this.nameToVariable(tree.childs[0].lexema).value)

                case Terminal.numero:
                    return Number(tree.childs[0].lexema)
            }
            return 0;
        }

        if (tree.childs[1].childs[0].symbol.toTerminal() == Terminal.epsilon)
            return this.expresion(tree.childs[0])

        // si operador no es una e-producion
        switch (tree.childs[1].childs[0].symbol.toTerminal()) {
            case Terminal.mas: return this.expresion(tree.childs[0]) + this.expresion(tree.childs[1].deleteChild())
            case Terminal.menos: return this.expresion(tree.childs[0]) - this.expresion(tree.childs[1].deleteChild())
            case Terminal.por: return this.expresion(tree.childs[0]) * this.expresion(tree.childs[1].deleteChild())
            case Terminal.dividido: return this.expresion(tree.childs[0]) / this.expresion(tree.childs[1].deleteChild())
            case Terminal.potencia: return Math.pow(this.expresion(tree.childs[0]), this.expresion(tree.childs[1].deleteChild()))
            case Terminal.raiz: return Math.pow(this.expresion(tree.childs[0]), 1 / this.expresion(tree.childs[1].deleteChild()))
        }

        return 0
    }

    condicional(tree: Tree,success: Function = () => {}) {
        //console.log(tree)
        const condicion = this.condicion(tree.getChildByName(Varaible.Condicion))
        const bloque = tree.getChildByName(Varaible.Bloque)
        if (condicion) {
            this._run(bloque.childs[1])
        } else {
            const cierreCondicion = tree.getChildByName(Varaible.CierreCondicion)
            if (cierreCondicion.childs[0].symbol != Terminal.epsilon) {
                this._run(cierreCondicion.getChildByName(Varaible.Bloque).childs[1])
            }
        }
        success()
    }

    condicion(tree: Tree): boolean {
        let condicion = true;
        const sigCondicion = tree.getChildByName(Varaible.SigCondicion)
        switch (sigCondicion.childs[0].symbol) {
            case Varaible.Expresion:
                let expresion = this.expresion(sigCondicion.childs[0])
                const signo = sigCondicion.childs[1].childs[0].symbol
                let expresion2 = this.expresion(sigCondicion.childs[1].deleteChild())
                switch (signo) {
                    case Terminal.mayor:
                        condicion = Number(expresion) > Number(expresion2)
                        break;
                    case Terminal.menor:
                        condicion = Number(expresion) < Number(expresion2)
                        break;
                }
                break;
            case Terminal.not:
                condicion = !this.condicion(this.sigCondicionToCondicion(sigCondicion.childs[1]))
                break;
            case Terminal.corcheteOpen:
                condicion = this.condicion(sigCondicion.childs[1])
                break;
        }

        const opAndOr = tree.getChildByName(Varaible.OpAndOr)

        switch (opAndOr.childs[0].symbol) {
            case Terminal.or:
                return condicion || this.condicion(this.sigCondicionToCondicion(opAndOr.childs[1]))

            case Terminal.and:
                return condicion && this.condicion(this.sigCondicionToCondicion(opAndOr.childs[1]))

            default:
                return condicion
        }

    }

    sigCondicionToCondicion(sigCondicion: Tree): Tree {
        const opAndOr = new Tree({
            symbolGramatical: Varaible.OpAndOr,
            lexema: '',
            childs: [new Tree({
                symbolGramatical: Terminal.epsilon,
                lexema: Terminal.epsilon,
                childs: [],
                pointer: Math.random()
            })],
            pointer: Math.random()
        });

        return new Tree({
            symbolGramatical: Varaible.Condicion,
            lexema: '',
            childs: [sigCondicion, opAndOr],
            pointer: Math.random()
        })
    }

    escritura(tree: Tree, success: Function = () => { }) {
        console.log(`${tree.getChildByName(Terminal.cadena).lexema}${this.expresion(tree.getChildByName(Varaible.Expresion))}`)
        success()
    }

    lectura(tree: Tree, success: Function = () => { }) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(tree.getChildByName(Terminal.cadena).lexema, (answer: string) => {
            this.nameToVariable(tree.getChildByName(Terminal.id).lexema).value = Number(answer)
            rl.close();
            success()
        });
    }

    /**
     * @description busca por nombre una variable
     * @param name nombre de la variable
     */
    nameToVariable(name: string): Var {
        let varaible = this.vars.find(variable => variable.name === name);
        if (varaible)
            return varaible
        return { name: 'ID', type: DataType.Null, value: 0 }
    }
}

export default Interpreter