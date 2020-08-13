import Cell from '../class/Cell'
import Variable from '../class/Variable'
import Terminal from '../class/Terminal'


/**
 * @description variable = "Fila A en el excel, Columna X-esima"
 *              terminal = "Primera columna del excel, Fila Y-esima"
 *              elements = "la celda [X;Y]"
 */
const table: Array<Cell> = [
    { 
        varaible: Variable.Programa,
        terminal: Terminal.vars, 
        elements: [
            Variable.DeclaracionVariables
        ] },
    {
        varaible: Variable.DeclaracionVariables,    // <DeclaracionVariables> [A;3]
        terminal: Terminal.vars,                    // "vars" [C;1]
        elements: [                                  // “vars” <ListaVariables> [C;3]
            Terminal.vars, 
            Variable.ListaVariables
        ] },
    {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.id,
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.if, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.while, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.read, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.write, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.ListaVariables,
        terminal: Terminal.id, 
        elements: [
            Terminal.id,
            Variable.FinListaVariables
        ] },
    { 
        varaible: Variable.FinListaVariables,
        terminal: Terminal.id, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.FinListaVariables,
        terminal: Terminal.coma, 
        elements: [
            Terminal.coma,
            Terminal.id,
            Variable.FinListaVariables
        ] },
    { 
        varaible: Variable.FinListaVariables,
        terminal: Terminal.if, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.FinListaVariables,
        terminal: Terminal.while, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.FinListaVariables,
        terminal: Terminal.read, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.FinListaVariables,
        terminal: Terminal.write, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.Cuerpo,
        terminal: Terminal.id, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.Cuerpo,
        terminal: Terminal.if, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.Cuerpo,
        terminal: Terminal.while, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.Cuerpo,
        terminal: Terminal.read, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.Cuerpo,
        terminal: Terminal.write, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.CuerpoFin,
        terminal: Terminal.id, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.CuerpoFin,
        terminal: Terminal.if, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.CuerpoFin,
        terminal: Terminal.while, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.CuerpoFin,
        terminal: Terminal.read, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.CuerpoFin,
        terminal: Terminal.write, 
        elements: [
            Variable.Sentencia,
            Variable.CuerpoFin,
            Terminal.puntoYComa
        ] },
    { 
        varaible: Variable.CuerpoFin,
        terminal: Terminal.peso, 
        elements: [
            Terminal.peso
        ] },
    { 
        varaible: Variable.Sentencia,
        terminal: Terminal.id, 
        elements: [
            Variable.Asignacion
        ] },
    { 
        varaible: Variable.Sentencia,
        terminal: Terminal.if, 
        elements: [
            Variable.Condicional
        ] },
    { 
        varaible: Variable.Sentencia,
        terminal: Terminal.while, 
        elements: [
            Variable.Ciclo
        ] },
    { 
        varaible: Variable.Sentencia,
        terminal: Terminal.read, 
        elements: [
            Variable.Lectura
        ] },
    { 
        varaible: Variable.Sentencia,
        terminal: Terminal.write, 
        elements: [
            Variable.Escritura
        ] },
    { 
        varaible: Variable.Asignacion,
        terminal: Terminal.id, 
        elements: [
            Terminal.id,
            Terminal.igual,
            Variable.Expresion
        ] },
    { 
        varaible: Variable.Bloque,
        terminal: Terminal.llaveOpen, 
        elements: [
            Terminal.llaveOpen,
            Variable.Cuerpo,
            Terminal.llaveClose,
            Variable.Cuerpo,
            Terminal.llaveClose
        ] },
    { 
        varaible: Variable.Expresion,
        terminal: Terminal.numero, 
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ] }, 
    { 
        varaible: Variable.Expresion,
        terminal: Terminal.id, 
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ] }, 
    { 
        varaible: Variable.Expresion,
        terminal: Terminal.parentesisOpen, 
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ] }, 
    { 
        varaible: Variable.Operador1,
        terminal: Terminal.puntoYComa, 
        elements: [
            Terminal.epsilon
        ] }, 
    { 
        varaible: Variable.Operador1,
        terminal: Terminal.mas, 
        elements: [
            Terminal.mas,
            Variable.SiguienteSR,
            Variable.Operador1
        ] }, 
    { 
        varaible: Variable.Operador1,
        terminal: Terminal.menos, 
        elements: [
            Terminal.menos,
            Variable.SiguienteSR,
            Variable.Operador1
        ] }, 
    { 
        varaible: Variable.Operador1,
        terminal: Terminal.menos, 
        elements: [
            Terminal.menos,
            Variable.SiguienteSR,
            Variable.Operador1
        ] }, 
    { 
        varaible: Variable.SiguienteSR,
        terminal: Terminal.numero, 
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ] }, 
    { 
        varaible: Variable.SiguienteSR,
        terminal: Terminal.id, 
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ] }, 
    { 
        varaible: Variable.SiguienteSR,
        terminal: Terminal.menos, 
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ] }, 
    { 
        varaible: Variable.SiguienteSR,
        terminal: Terminal.parentesisOpen, 
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ] }, 
    { 
        varaible: Variable.Operador2,
        terminal: Terminal.puntoYComa, 
        elements: [
            Terminal.epsilon
        ] },
    { 
        varaible: Variable.Operador2,
        terminal: Terminal.por, 
        elements: [
            Terminal.por,
            Variable.SiguienteMD,
            Variable.Operador2
        ] },  
    { 
        varaible: Variable.Operador2,
        terminal: Terminal.dividido, 
        elements: [
            Terminal.dividido,
            Variable.SiguienteMD,
            Variable.Operador2
        ] },  
    { 
        varaible: Variable.SiguienteMD,
        terminal: Terminal.numero, 
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ] },  
    { 
        varaible: Variable.SiguienteMD,
        terminal: Terminal.id, 
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ] },  
    { 
        varaible: Variable.SiguienteMD,
        terminal: Terminal.menos, 
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ] },  
    { 
        varaible: Variable.SiguienteMD,
        terminal: Terminal.parentesisOpen, 
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ] },  
    { 
        varaible: Variable.Operador3,
        terminal: Terminal.puntoYComa, 
        elements: [
            Terminal.epsilon
        ] },  
    { 
        varaible: Variable.Operador3,
        terminal: Terminal.potencia, 
        elements: [
            Terminal.potencia,
            Variable.SiguientePR,
            Variable.Operador3
        ] },  
    { 
        varaible: Variable.Operador3,
        terminal: Terminal.raiz, 
        elements: [
            Terminal.raiz,
            Variable.SiguientePR,
            Variable.Operador3
        ] },  
    { 
        varaible: Variable.SiguientePR,
        terminal: Terminal.numero, 
        elements: [
            Terminal.numero
        ] }, 
    { 
        varaible: Variable.SiguientePR,
        terminal: Terminal.id, 
        elements: [
            Terminal.id
        ] }, 
    { 
        varaible: Variable.SiguientePR,
        terminal: Terminal.menos, 
        elements: [
            Terminal.menos,
            Variable.SiguientePR
        ] }, 
    { 
        varaible: Variable.SiguientePR,
        terminal: Terminal.parentesisOpen, 
        elements: [
            Terminal.parentesisOpen,
            Variable.Expresion,
            Terminal.parentesisClose
        ] }, 
]

export default table