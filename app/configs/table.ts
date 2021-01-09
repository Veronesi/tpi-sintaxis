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
        varaible: Variable.Programa,
        terminal: Terminal.vars,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        varaible: Variable.Programa,
        terminal: Terminal.id,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        varaible: Variable.Programa,
        terminal: Terminal.if,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        varaible: Variable.Programa,
        terminal: Terminal.while,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        varaible: Variable.Programa,
        terminal: Terminal.read,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        varaible: Variable.Programa,
        terminal: Terminal.write,
        elements: [
            Variable.DeclaracionVariables,
            Variable.Cuerpo
        ]
    }, {
        varaible: Variable.Programa,
        terminal: Terminal.peso,
        elements: [
            Terminal.peso
        ]
    },
    /* DeclaracionVariables */

    {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.vars,
        elements: [
            Terminal.vars,
            Variable.ListaVariables
        ]
    }, {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.id,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.if,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.while,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.read,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.write,
        elements: [
            Terminal.epsilon,
        ]
    },
    {
        varaible: Variable.DeclaracionVariables,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* ListaVariables */
    {
        varaible: Variable.ListaVariables,
        terminal: Terminal.id,
        elements: [
            Terminal.id,
            Variable.FinListaVariables
        ]
    },
    /* FinListaVariables */
    {
        varaible: Variable.FinListaVariables,
        terminal: Terminal.coma,
        elements: [
            Terminal.coma,
            Terminal.id,
            Variable.FinListaVariables
        ]
    },
    {
        varaible: Variable.FinListaVariables,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* Cuerpo */
    {
        varaible: Variable.Cuerpo,
        terminal: Terminal.id,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.Cuerpo,
        terminal: Terminal.if,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.Cuerpo,
        terminal: Terminal.while,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.Cuerpo,
        terminal: Terminal.read,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.Cuerpo,
        terminal: Terminal.write,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    },
    /* CuerpoFin */
    {
        varaible: Variable.CuerpoFin,
        terminal: Terminal.id,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.CuerpoFin,
        terminal: Terminal.if,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.CuerpoFin,
        terminal: Terminal.while,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.Cuerpo,
        terminal: Terminal.read,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    }, {
        varaible: Variable.CuerpoFin,
        terminal: Terminal.write,
        elements: [
            Variable.Sentencia,
            Terminal.puntoYComa,
            Variable.CuerpoFin
        ]
    },
    {
        varaible: Variable.CuerpoFin,
        terminal: Terminal.peso,
        elements: [
            Terminal.peso
        ]
    },
    {
        varaible: Variable.CuerpoFin,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* Sentencia */
    {
        varaible: Variable.Sentencia,
        terminal: Terminal.id,
        elements: [
            Variable.Asignacion
        ]
    }, {
        varaible: Variable.Sentencia,
        terminal: Terminal.if,
        elements: [
            Variable.Condicional
        ]
    }, {
        varaible: Variable.Sentencia,
        terminal: Terminal.while,
        elements: [
            Variable.Ciclo
        ]
    }, {
        varaible: Variable.Sentencia,
        terminal: Terminal.read,
        elements: [
            Variable.Lectura
        ]
    }, {
        varaible: Variable.Sentencia,
        terminal: Terminal.write,
        elements: [
            Variable.Escritura
        ]
    },
    /* Asignacion */
    {
        varaible: Variable.Asignacion,
        terminal: Terminal.id,
        elements: [
            Terminal.id,
            Terminal.igual,
            Variable.Expresion
        ]
    },
    /* Bloque */
    {
        varaible: Variable.Bloque,
        terminal: Terminal.llaveOpen,
        elements: [
            Terminal.llaveOpen,
            Variable.Cuerpo,
            Terminal.llaveClose
        ]
    },
    /* Expresion */
    {
        varaible: Variable.Expresion,
        terminal: Terminal.id,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        varaible: Variable.Expresion,
        terminal: Terminal.menos,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        varaible: Variable.Expresion,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        varaible: Variable.Expresion,
        terminal: Terminal.numero,
        elements: [
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    },
    /* Operador1 */
    {
        varaible: Variable.Operador1,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador1,
        terminal: Terminal.mas,
        elements: [
            Terminal.mas,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        varaible: Variable.Operador1,
        terminal: Terminal.menos,
        elements: [
            Terminal.menos,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    }, {
        varaible: Variable.Operador1,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador1,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon
        ]
    },{
        varaible: Variable.Operador1,
        terminal: Terminal.mayor,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.Operador1,
        terminal: Terminal.menor,
        elements: [
            Terminal.epsilon,
        ]
    },
    {
        varaible: Variable.Operador1,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* SiguienteSR */
    {
        varaible: Variable.SiguienteSR,
        terminal: Terminal.id,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        varaible: Variable.SiguienteSR,
        terminal: Terminal.menos,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        varaible: Variable.SiguienteSR,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        varaible: Variable.SiguienteSR,
        terminal: Terminal.numero,
        elements: [
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    },
    /* Operador2 */
    {
        varaible: Variable.Operador2,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.mas,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.menos,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.por,
        elements: [
            Terminal.por,
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.dividido,
        elements: [
            Terminal.dividido,
            Variable.SiguienteMD,
            Variable.Operador2
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.or,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.and,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.mayor,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.Operador2,
        terminal: Terminal.menor,
        elements: [
            Terminal.epsilon,
        ]
    },
    {
        varaible: Variable.Operador2,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* -- FALTAN MAYORIGUAL MENORIGUAL -- */
    /* SiguienteMD */
    {
        varaible: Variable.SiguienteMD,
        terminal: Terminal.id,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        varaible: Variable.SiguienteMD,
        terminal: Terminal.menos,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        varaible: Variable.SiguienteMD,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        varaible: Variable.SiguienteMD,
        terminal: Terminal.numero,
        elements: [
            Variable.SiguientePR,
            Variable.Operador3
        ]
    },
    /* Operador3 */
    {
        varaible: Variable.Operador3,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.mas,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.menos,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.por,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.dividido,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.potencia,
        elements: [
            Terminal.potencia,
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.raiz,
        elements: [
            Terminal.raiz,
            Variable.SiguientePR,
            Variable.Operador3
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.or,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.and,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.mayor,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.Operador3,
        terminal: Terminal.menos,
        elements: [
            Terminal.epsilon
        ]
    },
    {
        varaible: Variable.Operador3,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* -- FALTAN MAYORIGUAL MENORIGUAL -- */
    /* SiguientePR */
    {
        varaible: Variable.SiguientePR,
        terminal: Terminal.id,
        elements: [
            Terminal.id
        ]
    }, {
        varaible: Variable.SiguientePR,
        terminal: Terminal.menos,
        elements: [
            Terminal.menos,
            Variable.SiguientePR
        ]
    }, {
        varaible: Variable.SiguientePR,
        terminal: Terminal.parentesisOpen,
        elements: [
            Terminal.parentesisOpen,
            Variable.Expresion,
            Terminal.parentesisClose
        ]
    }, {
        varaible: Variable.SiguientePR,
        terminal: Terminal.numero,
        elements: [
            Terminal.numero
        ]
    },
    /* Condicional */
    {
        varaible: Variable.Condicional,
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
        varaible: Variable.CierreCondicion,
        terminal: Terminal.puntoYComa,
        elements: [
            Terminal.epsilon,
        ]
    }, {
        varaible: Variable.CierreCondicion,
        terminal: Terminal.else,
        elements: [
            Terminal.else,
            Variable.Bloque,
        ]
    },
    {
        varaible: Variable.CierreCondicion,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* Ciclo */
    {
        varaible: Variable.Ciclo,
        terminal: Terminal.write,
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
        varaible: Variable.Condicion,
        terminal: Terminal.id,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        varaible: Variable.Condicion,
        terminal: Terminal.menos,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        varaible: Variable.Condicion,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        varaible: Variable.Condicion,
        terminal: Terminal.numero,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        varaible: Variable.Condicion,
        terminal: Terminal.not,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        varaible: Variable.Condicion,
        terminal: Terminal.corcheteOpen,
        elements: [
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    },
    /* OpAndOr */
    {
        varaible: Variable.OpAndOr,
        terminal: Terminal.parentesisClose,
        elements: [
            Terminal.epsilon
        ]
    }, {
        varaible: Variable.OpAndOr,
        terminal: Terminal.or,
        elements: [
            Terminal.or,
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        varaible: Variable.OpAndOr,
        terminal: Terminal.and,
        elements: [
            Terminal.and,
            Variable.SigCondicion,
            Variable.OpAndOr
        ]
    }, {
        varaible: Variable.OpAndOr,
        terminal: Terminal.corcheteClose,
        elements: [
            Terminal.epsilon
        ]
    },
    {
        varaible: Variable.OpAndOr,
        terminal: Terminal.epsilon,
        elements: [
            Terminal.epsilon
        ]
    },
    /* SigCondicion */
    {
        varaible: Variable.SigCondicion,
        terminal: Terminal.id,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    } ,{
        varaible: Variable.SigCondicion,
        terminal: Terminal.menos,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    } ,{
        varaible: Variable.SigCondicion,
        terminal: Terminal.parentesisOpen,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    } ,{
        varaible: Variable.SigCondicion,
        terminal: Terminal.numero,
        elements: [
            Variable.Expresion,
            Variable.CierreExpresion
        ]
    } ,{
        varaible: Variable.SigCondicion,
        terminal: Terminal.not,
        elements: [
            Variable.SigCondicion,
        ]
    } ,{
        varaible: Variable.SigCondicion,
        terminal: Terminal.corcheteOpen,
        elements: [
            Terminal.corcheteOpen,
            Variable.Condicion,
            Terminal.corcheteClose
        ]
    } ,
    /* CierreExpresion */
    {
        varaible: Variable.CierreExpresion,
        terminal: Terminal.mayor,
        elements: [
            Terminal.mayor,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    } ,    {
        varaible: Variable.CierreExpresion,
        terminal: Terminal.menor,
        elements: [
            Terminal.menor,
            Variable.SiguienteSR,
            Variable.Operador1
        ]
    } ,
    /* -- FALTAN MAYORIGUAL MENORIGUAL -- */
    /* Lectura */
    {
        varaible: Variable.Lectura,
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
        varaible: Variable.Escritura,
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