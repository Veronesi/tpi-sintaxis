import SymbolGramatical from './class/SymbolGramatical';
import TAS from './tools/tas'
import table from './configs/table'
import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"

/*

*/

let lexicalAnalizer = new LexicalAnalizer('hola = 4; chau = 5;')


while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}
const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);

console.log('\n\n\n----\n\n\n')

console.log(lexicalAnalizer.lexicals)
syntacticAnalyzer._analizer()
//console.log(JSON.stringify(syntacticAnalyzer.derivationTree))