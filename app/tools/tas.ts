import Variable from '../class/Variable'
import Terminal from '../class/Terminal'
import SymbolGramatical from '../class/SymbolGramatical'

const _TAS:any = {};

_TAS[Variable.Programa] = {};
_TAS[Variable.Programa][Terminal.vars] = [Variable.DeclaracionVariables]

const TAS = (x:Variable ,symbol:Terminal):Array<SymbolGramatical> => {
    return _TAS[x][symbol];
}

export default TAS;
