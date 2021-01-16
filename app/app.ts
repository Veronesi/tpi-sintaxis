import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"
import SemanticAnalyzer from './tools/SemanticAnalyzer'
import Interpreter from './tools/Interpreter'

let lexicalAnalizer = new LexicalAnalizer(
  `vars edad, faltaEdad
  read("cual es tu edad: ", edad);
  if(edad > 17){
    write("eres mayor de edad ya que tienes ", edad);
  }else{
    write("eres menor de edad =D, tienes ", edad);
    faltaEdad = 18 - edad;
    write("solo te faltan ", faltaEdad);
    read("acepto", edad);
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