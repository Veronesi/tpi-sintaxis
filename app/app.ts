import SymbolGramatical from './class/SymbolGramatical';
import TAS from './tools/tas'
import table from './configs/table'
import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"
import SemanticAnalyzer from './tools/SemanticAnalyzer'
import Interpreter from './tools/Interpreter'
/*

*/

let lexicalAnalizer = new LexicalAnalizer('vars hola, chau hola = 1 + 2 * 3 ** (4 + 4);')


while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}
const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);
syntacticAnalyzer._analizer().then( tree => {
  tree.show()
  const semanticAnalyzer = new SemanticAnalyzer(tree)
  const vars = semanticAnalyzer._analizer()
  const interpreter = new Interpreter(tree, vars) 
  interpreter._run()
  console.log('listo')
})