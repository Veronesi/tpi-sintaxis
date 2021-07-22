import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"
import LexicalAnalizer from "./tools/LexicalAnalyzer"
import SemanticAnalyzer from './tools/SemanticAnalyzer'
import Interpreter from './tools/Interpreter'
const fs = require('fs');
const commands = [
  {
    name: "fibonacci",
    description: "Calcula el n-esimo numero de la secuencia",
    command: "npm run interpeter fibonacci"
  },
  {
    name: "pascal",
    description: "Ejecuta el codigo dado como ejemplo en el tpi",
    command: "npm run interpeter pascal"
  },
  {
    name: "edad",
    description: "Verifica si sos mayor de edad",
    command: "npm run interpeter edad"
  }]
if (process.argv.length < 3) {
  console.log("Error: no se especifico el nombre de archivo\n Ej: npm run interpeter <filename>");
  process.exit();
}

if (!(fs.existsSync(`./examples/${process.argv[2]}.js`))) {
  console.log(`no se encontro ningun archivo "${process.argv[2]}".js`);
  console.table(commands)
  process.exit();
}

const data = fs.readFileSync(`./examples/${process.argv[2]}.js`, { encoding: 'utf8', flag: 'r' }).replace(/\r/gm, " ");

let lexicalAnalizer = new LexicalAnalizer(data)

while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}

const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);
syntacticAnalyzer._analizer().then(tree => {
  if (process.argv[3] == "tree")
    tree.fshow()

  const semanticAnalyzer = new SemanticAnalyzer(tree)

  const vars = semanticAnalyzer._analizer()

  const interpreter = new Interpreter(tree, vars)
  //interpreter._run()
  interpreter.start().then(() => {
    if (process.argv[3] == "vars")
      console.table(interpreter.vars)
  })
})