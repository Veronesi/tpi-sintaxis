import SymbolGramatical from './class/SymbolGramatical';
import TAS from './tools/tas'
import table from './configs/table'
import SyntacticAnalyzer from "./tools/SyntacticAnalyzer"

const syntacticAnalyzer = new SyntacticAnalyzer();

syntacticAnalyzer.start()

/*
const tas = new TAS();
tas.load(table);

let elem: Array<SymbolGramatical>
elem = tas.getElements(SymbolGramatical.Programa, SymbolGramatical.vars)
let elem2 = tas.getElements(SymbolGramatical.DeclaracionVariables, SymbolGramatical.vars)
console.log(elem2)
*/
