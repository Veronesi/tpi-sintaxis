import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"
import SemanticAnalyzer from './tools/SemanticAnalyzer'
import Interpreter from './tools/Interpreter'

let lexicalAnalizer = new LexicalAnalizer(
  `vars edad
  read("cual es tu edad: ", edad);
  while(edad < 18){
    write("debes ser mayor de 18, tu edad es: ", edad);
    read("ingrese otra vez su edad: ", edad);
  };`)


while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}

const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);
syntacticAnalyzer._analizer().then(tree => {
  const semanticAnalyzer = new SemanticAnalyzer(tree)
  const vars = semanticAnalyzer._analizer()
  const interpreter = new Interpreter(tree, vars)
  interpreter._run()
})