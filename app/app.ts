import SymbolGramatical from './class/SymbolGramatical';
import TAS from './tools/tas'
import table from './configs/table'

const tas = new TAS();
tas.load(table);

let elem = tas.getElements(SymbolGramatical.Programa, SymbolGramatical.id)