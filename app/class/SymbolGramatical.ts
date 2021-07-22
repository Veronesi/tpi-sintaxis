import Terminal from './Terminal'
import Variable from './Variable'

declare global {
  interface String {
    typeof(): string;
    toVariable(): Variable;
    toTerminal(): Terminal;
    toSymbolGramatical(): SymbolGramatical;
  }
}

String.prototype.typeof = function () {
  return /^<\D+(?:\d+)?>$/.test(String(this)) ? 'variable' : 'terminal';
};

String.prototype.toSymbolGramatical = function (): SymbolGramatical {
  return this.typeof() == 'variable' ? this.toVariable() : this.toTerminal()
}

String.prototype.toVariable = function (): Variable {
  switch (this) {
    case '<Programa>': return Variable.Programa;
    case '<ListaVariables>': return Variable.ListaVariables;
    case '<DeclaracionVariables>': return Variable.DeclaracionVariables
    case '<FinListaVariables>': return Variable.FinListaVariables;
    case '<Cuerpo>': return Variable.Cuerpo;
    case '<CuerpoFin>': return Variable.CuerpoFin;
    case '<Sentencia>': return Variable.Sentencia;
    case '<Asignacion>': return Variable.Asignacion;
    case '<Bloque>': return Variable.Bloque;
    case '<Expresion>': return Variable.Expresion;
    case '<Operador1>': return Variable.Operador1;
    case '<SiguienteSR>': return Variable.SiguienteSR;
    case '<Operador2>': return Variable.Operador2;
    case '<SiguienteMD>': return Variable.SiguienteMD;
    case '<Operador3>': return Variable.Operador3;
    case '<SiguientePR>': return Variable.SiguientePR;
    case '<Condicional>': return Variable.Condicional;
    case '<CierreCondicion>': return Variable.CierreCondicion;
    case '<Ciclo>': return Variable.Ciclo;
    case '<Condicion>': return Variable.Condicion;
    case '<OpAndOr>': return Variable.OpAndOr;
    case '<SigCondicion>': return Variable.SigCondicion;
    case '<CierreExpresion>': return Variable.CierreExpresion;
    case '<Lectura>': return Variable.Lectura;
    case '<Escritura>': return Variable.Escritura;
    default:
      console.log("SYMBOL_GRAMATICAL_TOVARIABLE_ERROR", this)
      process.exit()
  }
};

String.prototype.toTerminal = function (): Terminal {
  switch (this) {
    case 'vars': return Terminal.vars;
    case 'id': return Terminal.id;
    case ',': return Terminal.coma;
    case ';': return Terminal.puntoYComa;
    case '=': return Terminal.igual;
    case '+': return Terminal.mas;
    case '-': return Terminal.menos;
    case '*': return Terminal.por;
    case '/': return Terminal.dividido;
    case '**': return Terminal.potencia;
    case '/*': return Terminal.raiz;
    case '(': return Terminal.parentesisOpen;
    case ')': return Terminal.parentesisClose;
    case 'if': return Terminal.if;
    case 'else': return Terminal.else;
    case 'while': return Terminal.while;
    case 'or': return Terminal.or;
    case 'and': return Terminal.and;
    case 'not': return Terminal.not;
    case '[': return Terminal.corcheteOpen;
    case ']': return Terminal.corcheteClose;
    case 'signo': return Terminal.signo;
    case 'read': return Terminal.read;
    case 'write': return Terminal.write;
    case '$': return Terminal.peso;
    case '{': return Terminal.llaveOpen;
    case '}': return Terminal.llaveClose;
    case '>': return Terminal.mayor;
    case '<': return Terminal.menor;
    case 'numero': return Terminal.numero;
    case 'comilla': return Terminal.comilla;
    case '"': return Terminal.comilla;
    case 'cadena': return Terminal.cadena;
    case 'ε': return Terminal.epsilon;
    default: return Terminal.DEFAULT
  }
};


const SymbolGramatical = {
  ...Terminal,
  ...Variable
}

type SymbolGramatical = Terminal | Variable

export default SymbolGramatical