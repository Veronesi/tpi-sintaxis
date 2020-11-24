import SymbolGramatical from './class/SymbolGramatical';
import TAS from './tools/tas'
import table from './configs/table'
import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"

/*

*/

let lexicalAnalizer = new LexicalAnalizer('vars hola if(4>2){hola = 6;};')


while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}
const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);



console.log(lexicalAnalizer.lexicals)
syntacticAnalyzer.start()
console.log(JSON.stringify(syntacticAnalyzer.derivationTree))