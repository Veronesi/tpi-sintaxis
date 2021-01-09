import SymbolGramatical from './class/SymbolGramatical';
import TAS from './tools/tas'
import table from './configs/table'
import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"

/*

*/

let lexicalAnalizer = new LexicalAnalizer('vars hola, chau lee = 5; nee')


while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}
const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);
syntacticAnalyzer._analizer().then( tree => {
  tree.show()
})