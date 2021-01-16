
/**
 * @description lista de Terminales del lenguaje
 */
enum Terminal {
    vars = 'vars',
    id = 'id',
    coma = ',',
    puntoYComa = ';',
    igual = '=',
    mas = '+',
    menos = '-',
    por = '*',
    dividido = '/',
    potencia = '**',
    raiz = '/*',
    parentesisOpen = '(',
    parentesisClose = ')',
    if = 'if',
    else = 'else',
    while = 'while',
    or = 'or',
    and = 'and',
    not = 'not',
    corcheteOpen = '[',
    corcheteClose = ']',
    signo = 'signo',
    read = 'read',
    write = 'write',
    peso = '$',
    llaveOpen = '{',
    llaveClose = '}',
    mayor = '>',
    menor = '<',
    numero = 'numero',
    epsilon = 'ε',
    DEFAULT = 'DEFAULT',
    comilla = '"',
    cadena = 'cadena'
}

Terminal.toString = function () {
    return 'terminal'
}

export default Terminal