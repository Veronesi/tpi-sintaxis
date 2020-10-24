
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
    numero = 'numero',
    epsilon = 'ε',
    DEFAULT = 'DEFAULT'
}

Terminal.toString = function(){
    return 'terminal'
}

export default Terminal