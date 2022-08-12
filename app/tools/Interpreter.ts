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

const emptyTree: Tree = new Tree({ symbolGramatical: Varaible.Cuerpo, lexema: "<Cuerpo>", childs: [], pointer: 0 })
const emptyPromise: Promise<Tree> = new Promise((resolve, reject) => resolve(emptyTree))
class Interpreter {
    derivationTree: Tree
    vars: Var[]

    constructor(derivationTree: Tree, vars: Var[] = []) {
        this.derivationTree = derivationTree;
        this.vars = vars
    }

    start(tree: Tree = this.derivationTree.childs[1]): Promise<Tree> {
        const firstChild = tree.childs[0];
        // Verificamos si esta vacio
        if (!firstChild)
            return emptyPromise;

        const promise: Promise<Tree> = new Promise((resolve, reject) => {

            // Verificamos que sea una terminal
            if (firstChild.symbol.typeof() != Varaible.toString())
                return resolve(tree.deleteChild());

            switch (firstChild.symbol.toVariable()) {
                case Varaible.Sentencia:
                    // Se trata de una sentencia
                    this.handleSentencia(firstChild)
                        .then(() => resolve(tree.deleteChild()))
                        .catch(err => console.log("error1", err))
                    break;
                case Varaible.CuerpoFin:
                    // Verificamos si es una e-produccion;
                    if (firstChild.childs[0].symbol == Terminal.epsilon)
                        return reject();

                    this.handleSentencia(firstChild.childs[0]).then(() => {
                        this.start(firstChild.childs[2]).then(() => {
                            resolve(tree.deleteChild())
                        }).catch(err => console.log("error2", err))
                    }).catch(() => emptyTree);
                    break;
                default:
                    console.log("ups:", firstChild.symbol.toVariable())
                    break;
            }
        })

        return promise
            .then((newTree: Tree = emptyTree) => this.start(newTree))
            .catch(() => emptyTree);
    }

    // Verifica que tipo de sentencia se trata
    handleSentencia(tree: Tree): Promise<Tree> {
        const sentencia = tree.childs[0];
        const promise: Promise<Tree> = new Promise((resolve, reject) => {
            // Verificamos de que tipo de sentencia se trata
            switch (sentencia.symbol.toVariable()) {
                case Varaible.Asignacion:
                    this.handleAsignacion(sentencia)
                    resolve(emptyTree);
                    break;
                case Varaible.Lectura:
                    this.handleLectura(sentencia).then(() => resolve(emptyTree));
                    break;
                case Varaible.Escritura:
                    this.handleEscritura(sentencia);
                    resolve(emptyTree);
                    break;
                case Varaible.Condicional:
                    this.handleCondicional(sentencia).then(() => resolve(emptyTree)).catch(() => resolve(emptyTree));
                    break;
                case Varaible.Ciclo:
                    this.handleCiclo(sentencia).then(() => resolve(emptyTree)).catch(() => resolve(emptyTree));
                    break;
                default:
                    console.log("Error capo ", sentencia.symbol.toVariable())
                    reject(tree)
                    process.exit()
            }
        })

        return promise;
    }

    handleAsignacion(tree: Tree): Tree {
        const variable = this.nameToVariable(tree.childs[0].lexema);
        variable.value = this.expresion(tree.childs[2]);
        return emptyTree;
    }

    handleLectura(tree: Tree): Promise<Tree> {

        const promise: Promise<Tree> = new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(tree.getChildByName(Terminal.cadena).lexema, (answer: string) => {
                this.nameToVariable(tree.getChildByName(Terminal.id).lexema).value = Number(answer)
                rl.close()
                resolve(emptyTree)
            })
        })

        return promise;
    }

    handleEscritura(tree: Tree): Promise<Tree> {
        console.log(`${tree.getChildByName(Terminal.cadena).lexema}${this.expresion(tree.getChildByName(Varaible.Expresion))}`);
        return emptyPromise;
    }

    handleCiclo(tree: Tree): Promise<Tree> {
        const condicion = this.condicion(tree.getChildByName(Varaible.Condicion));
        const bloque = tree.getChildByName(Varaible.Bloque);

        if (!condicion) return emptyPromise;

        const promise: Promise<Tree> = new Promise((resolve, reject) => {

            // Creamos una copia del bloque
            const copyBloque: Tree = Tree.deepCopy(bloque.childs[1]);
            this.start(copyBloque).then(() => {
                this.handleCiclo(tree).then(() => {
                    resolve(emptyTree)
                })
            }).catch(() => { console.log("ERR_HANDLE_CICLE"); resolve(emptyTree) })
        });

        return promise;
    }

    handleCondicional(tree: Tree): Promise<Tree> {
        const condicion = this.condicion(tree.getChildByName(Varaible.Condicion))
        const bloque = tree.getChildByName(Varaible.Bloque)

        if (condicion)
            return this.start(bloque.childs[1]);

        const cierreCondicion = tree.getChildByName(Varaible.CierreCondicion)
        if (cierreCondicion.childs[0].symbol == Terminal.epsilon) return emptyPromise;

        return this.start(cierreCondicion.getChildByName(Varaible.Bloque).childs[1])
    }

    condicion(tree: Tree): boolean {
        let condicion = true;
        const sigCondicion = tree.getChildByName(Varaible.SigCondicion)
        switch (sigCondicion.childs[0].symbol) {
            case Varaible.Expresion:
                let expresion = this.expresion(sigCondicion.childs[0])
                const signo = sigCondicion.childs[1].childs[0].symbol

                const TreeExpresion2 = new Tree({
                    symbolGramatical: Varaible.Expresion,
                    pointer: Math.random(),
                    lexema: '',
                    childs: [sigCondicion.childs[1].childs[1], sigCondicion.childs[1].childs[2]]
                })

                let expresion2 = this.expresion(TreeExpresion2)

                switch (signo) {
                    case Terminal.mayor:
                        condicion = Number(expresion) > Number(expresion2)
                        break;
                    case Terminal.menor:
                        condicion = Number(expresion) < Number(expresion2)
                        break;
                        case Terminal.mayorIgual:
                            condicion = Number(expresion) >= Number(expresion2)
                            break;
                        case Terminal.menorIgual:
                            condicion = Number(expresion) <= Number(expresion2)
                            break;
                    case Terminal.igual:
                        condicion = Number(expresion) == Number(expresion2)
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
            case Terminal.mas: return this.expresion(tree.childs[0]) + this.expresion(Tree.deepCopy(tree.childs[1]).deleteChild())
            case Terminal.menos: return this.expresion(tree.childs[0]) - this.expresion(Tree.deepCopy(tree.childs[1]).deleteChild())
            case Terminal.por: return this.expresion(tree.childs[0]) * this.expresion(Tree.deepCopy(tree.childs[1]).deleteChild())
            case Terminal.dividido: return this.expresion(tree.childs[0]) / this.expresion(Tree.deepCopy(tree.childs[1]).deleteChild())
            case Terminal.potencia: return Math.pow(this.expresion(tree.childs[0]), this.expresion(Tree.deepCopy(tree.childs[1]).deleteChild()))
            case Terminal.raiz: return Math.pow(this.expresion(tree.childs[0]), 1 / this.expresion(Tree.deepCopy(tree.childs[1]).deleteChild()))
            case Terminal.resto: return this.expresion(tree.childs[0]) % this.expresion(Tree.deepCopy(tree.childs[1]).deleteChild())
        }

        return 0
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

    /**
     * @description busca por nombre una variable
     * @param name nombre de la variable
     */
    nameToVariable(name: string): Var {
        let variable = this.vars.find(variable => variable.name === name);
        if (variable)
            return variable
        return { name: 'ID', type: DataType.Null, value: 0 }
    }
}

export default Interpreter