/**
 * @description lista de variables del lenguaje
 */
enum Varaible {
    Programa = '<Programa>',
    DeclaracionVariables = '<DeclaracionVariables>',
    ListaVariables = '<ListaVariables>',
    FinListaVariables = '<FinListaVariables>',
    Cuerpo = '<Cuerpo>',
    CuerpoFin = '<CuerpoFin>',
    Sentencia = '<Sentencia>',
    Asignacion = '<Asignacion>',
    Bloque = '<Bloque>',
    Expresion = '<Expresion>',
    Operador1 = '<Operador1>',
    SiguienteSR = '<SiguienteSR>',
    Operador2 = '<Operador2>',
    SiguienteMD = '<SiguienteMD>',
    Operador3 = '<Operador3>',
    SiguientePR = '<SiguientePR>',
    Condicional = '<Condicional>',
    CierreCondicion = '<CierreCondicion>',
    Ciclo = '<Ciclo>',
    Condicion = '<Condicion>',
    OpAndOr = '<OpAndOr>',
    SigCondicion = '<SigCondicion>',
    CierreExpresion = '<CierreExpresion>',
    Lectura = '<Lectura>',
    Escritura = '<Escritura>',
    DEFAULT = '<DEFAULT>'
}

Varaible.toString = function () {
    return 'variable'
}

export default Varaible