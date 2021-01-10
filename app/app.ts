import SymbolGramatical from './class/SymbolGramatical';
import TAS from './tools/tas'
import table from './configs/table'
import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"
import SemanticAnalyzer from './tools/SemanticAnalyzer'
/*

*/

let lexicalAnalizer = new LexicalAnalizer('vars hola, chau hola = 4;')


while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}
const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);
syntacticAnalyzer._analizer().then( tree => {
  tree.show()
  let semanticAnalyzer = new SemanticAnalyzer(tree)
  semanticAnalyzer._analizer()
  console.log('listo')
})