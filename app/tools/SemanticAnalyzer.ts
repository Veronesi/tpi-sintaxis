import Terminal from "../class/Terminal";
import { Tree } from "../class/Tree"
import Variable from '../class/Variable'
import Warn from './Warn'

enum DataType {
    String = 0,
    Number = 1,
    Array = 2,
    Null = 3
}

interface Var {
    name: string
    type: DataType
}

/**
 * @description encargada de analizar la semantica del codigo
 */
class SemanticAnalyzer {
    derivationTree: Tree
    vars: Var[]
    constructor(derivationTree: Tree){
        this.derivationTree = derivationTree;
        this.vars = []
    }

    /**
     * @description ejecuta todas los analisis necesarios
     */
    _analizer(){
        let treeVars = this.derivationTree.getNodeByName(Variable.ListaVariables);
        if(treeVars.pointer > -1)
            this.setVars(treeVars)
        
        this.checkVariablesIsDeclared()
        return true
    }

    /**
     * @description obtiene las variables declaradas del codigo
     * @param tree arbol a analizar
     */
    setVars(tree: Tree){
        if(tree.symbol.typeof() == Terminal.toString() && tree.symbol.toTerminal() == Terminal.id){
            if(this.vars.find(e => e.name == tree.lexema)){
                Warn.criticalError(`SyntaxError: Identifier '${tree.lexema}' has already been declared.`)
                process.exit()
            }

            this.vars.push({
                name: tree.lexema,
                type: DataType.Null
            })
        }

        for(let child of tree.childs){
            this.setVars(child)
        }
    }

    /**
     * @description verifica que todas las variables utilizadas estes declaradas previamente
     * @param tree arbol a analizar
     */
    checkVariablesIsDeclared(tree = this.derivationTree){
        if(tree.symbol.typeof() == Terminal.toString() && tree.symbol.toTerminal() == Terminal.id){
            if(!this.vars.find(e => e.name == tree.lexema)){
                Warn.criticalError(`ReferenceError: '${tree.lexema}' is not defined.`)
                process.exit()
            }
        }

        for(let child of tree.childs){
            this.checkVariablesIsDeclared(child)
        }
    }
}

export default SemanticAnalyzer;