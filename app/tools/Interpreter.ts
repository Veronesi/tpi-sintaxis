import { isThisTypeNode } from 'typescript';
import Terminal from '../class/Terminal';
import { Tree } from '../class/Tree'
import Varaible from '../class/Variable';

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
    _run(tree: Tree = this.derivationTree.childs[1]) {
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

                        this.switchSentencia(child.childs[0])
                        this._run(child.childs[2])
                        break;
                    default:
                        console.log('error')
                        break;
                }
        }
    }

    switchSentencia(tree: Tree) {
        const sentencia = tree.childs[0];
        switch (sentencia.symbol.toVariable()) {
            case Varaible.Asignacion:
                this.asignacion(sentencia)
                break;

            default:
                console.log(tree)
                process.exit()
                break;
        }
    }

    asignacion(tree: Tree) {
        const variable = this.nameToVariable(tree.childs[0].lexema);
        console.log(tree.fshow())
        let expresion = this.expresion(tree.childs[2])

        console.log(expresion)

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