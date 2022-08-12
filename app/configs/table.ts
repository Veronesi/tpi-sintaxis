import Cell from '../class/Cell'
import Variable from '../class/Variable'
import Terminal from '../class/Terminal'


/**
 * @description variable = "Fila A en el excel, Columna X-esima"
 *              terminal = "Primera columna del excel, Fila Y-esima"
 *              elements = "la celda [X;Y]"
 */
const table: Array<Cell> = [
    /* Programa */
    {
        variable: Variable.Programa,
        terminal: Terminal.vars,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        variable: Variable.Programa,
        terminal: Terminal.id,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        variable: Variable.Programa,
        terminal: Terminal.if,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        variable: Variable.Programa,
        terminal: Terminal.while,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        variable: Variable.Programa,
        terminal: Terminal.read,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        variable: Variable.Programa,
        terminal: Terminal.write,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        variable: Variable.Programa,
        terminal: Terminal.peso,
        elements: [
            Terminal.peso
        ]
    },
    /* DeclaracionVariables */

    {
        variable: Variable.DeclaracionVariables,
        terminal: Terminal.vars,
        elements: [
            Terminal.vars,
            Variable.ListaVariables
        ]
    }, {
        variable: Variable.DeclaracionVariables,
        terminal: Terminal.id,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.DeclaracionVariables,
        terminal: Terminal.if,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.DeclaracionVariables,
        terminal: Terminal.while,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.DeclaracionVariables,
        terminal: Terminal.read,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.DeclaracionVariables,
        terminal: Terminal.write,
        elements: [
            Terminal.epsilon,
        ]
    },
    {
        variable: Variable.DeclaracionVariables,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* ListaVariables */
    {
        variable: Variable.ListaVariables,
        terminal: Terminal.id,
        elements: [
            Terminal.id,
            Variable.FinListaVariables
        ]
    },
    /* FinListaVariables */
    {
        variable: Variable.FinListaVariables,
        terminal: Terminal.coma,
        elements: [
            Terminal.coma,
            Terminal.id,
            Variable.FinListaVariables
        ]
    },
    {
        variable: Variable.FinListaVariables,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* Cuerpo */
    {
        variable: Variable.Cuerpo,
        terminal: Terminal.id,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.Cuerpo,
        terminal: Terminal.if,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.Cuerpo,
        terminal: Terminal.while,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.Cuerpo,
        terminal: Terminal.read,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.Cuerpo,
        terminal: Terminal.write,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    },
    /* CuerpoFin */
    {
        variable: Variable.CuerpoFin,
        terminal: Terminal.id,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.CuerpoFin,
        terminal: Terminal.if,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.CuerpoFin,
        terminal: Terminal.while,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.CuerpoFin,
        terminal: Terminal.read,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        variable: Variable.CuerpoFin,
        terminal: Terminal.write,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    },
    {
        variable: Variable.CuerpoFin,
        terminal: Terminal.peso,
        elements: [
            Terminal.peso
        ]
    },
    {
        variable: Variable.CuerpoFin,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* Sentencia */
    {
        variable: Variable.Sentencia,
        terminal: Terminal.id,
        elements: [
            Variable.Asignacion
        ]
    }, {
        variable: Variable.Sentencia,
        terminal: Terminal.if,
        elements: [
            Variable.Condicional
        ]
    }, {
        variable: Variable.Sentencia,
        terminal: Terminal.while,
        elements: [
            Variable.Ciclo
        ]
    }, {
        variable: Variable.Sentencia,
        terminal: Terminal.read,
        elements: [
            Variable.Lectura
        ]
    }, {
        variable: Variable.Sentencia,
        terminal: Terminal.write,
        elements: [
            Variable.Escritura
        ]
    },
    /* Asignacion */
    {
        variable: Variable.Asignacion,
        terminal: Terminal.id,
        elements: [
            Terminal.id,
            Terminal.igual,
            Variable.Expresion
        ]
    },
    /* Bloque */
    {
        variable: Variable.Bloque,
        terminal: Terminal.llaveOpen,
        elements: [
            Terminal.llaveOpen,
            Variable.Cuerpo,
            Terminal.llaveClose
        ]
    },
    /* Expresion */
    {
        variable: Variable.Expresion,
        terminal: Terminal.id,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        variable: Variable.Expresion,
        terminal: Terminal.menos,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        variable: Variable.Expresion,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        variable: Variable.Expresion,
        terminal: Terminal.numero,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    },
    /* Operador1 */
    {
        variable: Variable.Operador1,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.mas,
        elements: [
            Terminal.mas,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.menos,
        elements: [
            Terminal.menos,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.mayor,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.mayorIgual,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.menorIgual,
        elements: [
            Terminal.epsilon,
        ]
    },{
        variable: Variable.Operador1,
        terminal: Terminal.igual,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador1,
        terminal: Terminal.menor,
        elements: [
            Terminal.epsilon,
        ]
    },
    {
        variable: Variable.Operador1,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* SiguienteSR */
    {
        variable: Variable.SiguienteSR,
        terminal: Terminal.id,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        variable: Variable.SiguienteSR,
        terminal: Terminal.menos,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        variable: Variable.SiguienteSR,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        variable: Variable.SiguienteSR,
        terminal: Terminal.numero,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    },
    /* Operador2 */
    {
        variable: Variable.Operador2,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.mas,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.menos,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.por,
        elements: [
            Terminal.por,
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.dividido,
        elements: [
            Terminal.dividido,
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.resto,
        elements: [
            Terminal.resto,
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.or,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.and,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.mayor,
        elements: [
            Terminal.epsilon,
        ]
    },{
        variable: Variable.Operador2,
        terminal: Terminal.mayorIgual,
        elements: [
            Terminal.epsilon,
        ]
    },{
        variable: Variable.Operador2,
        terminal: Terminal.menorIgual,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.igual,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.Operador2,
        terminal: Terminal.menor,
        elements: [
            Terminal.epsilon,
        ]
    },
    {
        variable: Variable.Operador2,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* SiguienteMD */
    {
        variable: Variable.SiguienteMD,
        terminal: Terminal.id,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        variable: Variable.SiguienteMD,
        terminal: Terminal.menos,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        variable: Variable.SiguienteMD,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        variable: Variable.SiguienteMD,
        terminal: Terminal.numero,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    },
    /* Operador3 */
    {
        variable: Variable.Operador3,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.mas,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.menos,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.por,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.dividido,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.resto,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.potencia,
        elements: [
            Terminal.potencia,
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.raiz,
        elements: [
            Terminal.raiz,
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.or,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.and,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.mayor,
        elements: [
            Terminal.epsilon
        ]
    },{
        variable: Variable.Operador3,
        terminal: Terminal.mayorIgual,
        elements: [
            Terminal.epsilon
        ]
    },{
        variable: Variable.Operador3,
        terminal: Terminal.menorIgual,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.igual,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.Operador3,
        terminal: Terminal.menos,
        elements: [
            Terminal.epsilon
        ]
    },
    {
        variable: Variable.Operador3,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* SiguientePR */
    {
        variable: Variable.SiguientePR,
        terminal: Terminal.id,
        elements: [
            Terminal.id
        ]
    }, {
        variable: Variable.SiguientePR,
        terminal: Terminal.menos,
        elements: [
            Terminal.menos,
            Variable.SiguientePR
        ]
    }, {
        variable: Variable.SiguientePR,
        terminal: Terminal.parentesisOpen,
        elements: [
            Terminal.parentesisOpen,
            Variable.Expresion,
            Terminal.parentesisClose
        ]
    }, {
        variable: Variable.SiguientePR,
        terminal: Terminal.numero,
        elements: [
            Terminal.numero
        ]
    },
    /* Condicional */
    {
        variable: Variable.Condicional,
        terminal: Terminal.if,
        elements: [
            Terminal.if,
            Terminal.parentesisOpen,
            Variable.Condicion,
            Terminal.parentesisClose,
            Variable.Bloque,
            Variable.CierreCondicion
        ]
    },
    /* CierreCondicion */
    {
        variable: Variable.CierreCondicion,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        variable: Variable.CierreCondicion,
        terminal: Terminal.else,
        elements: [
            Terminal.else,
            Variable.Bloque,
        ]
    },
    {
        variable: Variable.CierreCondicion,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* Ciclo */
    {
        variable: Variable.Ciclo,
        terminal: Terminal.while,
        elements: [
            Terminal.while,
            Terminal.parentesisOpen,
            Variable.Condicion,
            Terminal.parentesisClose,
            Variable.Bloque
        ]
    },
    /* Condicion */
    {
        variable: Variable.Condicion,
        terminal: Terminal.id,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        variable: Variable.Condicion,
        terminal: Terminal.menos,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        variable: Variable.Condicion,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        variable: Variable.Condicion,
        terminal: Terminal.numero,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        variable: Variable.Condicion,
        terminal: Terminal.not,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        variable: Variable.Condicion,
        terminal: Terminal.corcheteOpen,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    },
    /* OpAndOr */
    {
        variable: Variable.OpAndOr,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        variable: Variable.OpAndOr,
        terminal: Terminal.or,
        elements: [
            Terminal.or,
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        variable: Variable.OpAndOr,
        terminal: Terminal.and,
        elements: [
            Terminal.and,
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        variable: Variable.OpAndOr,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon
        ]
    },
    {
        variable: Variable.OpAndOr,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* SigCondicion */
    {
        variable: Variable.SigCondicion,
        terminal: Terminal.id,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    }, {
        variable: Variable.SigCondicion,
        terminal: Terminal.menos,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    }, {
        variable: Variable.SigCondicion,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    }, {
        variable: Variable.SigCondicion,
        terminal: Terminal.numero,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    }, {
        variable: Variable.SigCondicion,
        terminal: Terminal.not,
        elements: [
            Terminal.not,
            Variable.SigCondicion,
        ]
    }, {
        variable: Variable.SigCondicion,
        terminal: Terminal.corcheteOpen,
        elements: [
            Terminal.corcheteOpen,
            Variable.Condicion,
            Terminal.corcheteClose
        ]
    },
    /* CierreExpresion */
    {
        variable: Variable.CierreExpresion,
        terminal: Terminal.mayor,
        elements: [
            Terminal.mayor,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    },{
        variable: Variable.CierreExpresion,
        terminal: Terminal.mayorIgual,
        elements: [
            Terminal.mayorIgual,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    },{
        variable: Variable.CierreExpresion,
        terminal: Terminal.menorIgual,
        elements: [
            Terminal.menorIgual,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        variable: Variable.CierreExpresion,
        terminal: Terminal.menor,
        elements: [
            Terminal.menor,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    },{
        variable: Variable.CierreExpresion,
        terminal: Terminal.igual,
        elements: [
            Terminal.igual,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    },
    /* Lectura */
    {
        variable: Variable.Lectura,
        terminal: Terminal.read,
        elements: [
            Terminal.read,
            Terminal.parentesisOpen,
            Terminal.comilla,
            Terminal.cadena,
            Terminal.comilla,
            Terminal.coma,
            Terminal.id,
            Terminal.parentesisClose
        ]
    },
    /* Escritura */
    {
        variable: Variable.Escritura,
        terminal: Terminal.write,
        elements: [
            Terminal.write,
            Terminal.parentesisOpen,
            Terminal.comilla,
            Terminal.cadena,
            Terminal.comilla,
            Terminal.coma,
            Variable.Expresion,
            Terminal.parentesisClose
        ]
    }

]

export default table