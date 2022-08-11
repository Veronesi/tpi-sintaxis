# tpi-sintaxis

## Tabla de contenido

- [Instalacion](#instalacion)
- [guia de uso](#guia-de-uso)
- [Analizador lexico](#analisis-lexico)
- [Analizador sintactico](#analisis-sintactico)
- [Evaluador](#evaluador)
- [Terminales](https://github.com/Veronesi/tpi-sintaxis/blob/master/app/class/Terminal.ts)
- [Variables](https://github.com/Veronesi/tpi-sintaxis/blob/master/app/class/Variable.ts)
- [TAS](https://github.com/Veronesi/tpi-sintaxis/blob/master/app/configs/table.ts)
- [Manejo de errores](#manejo-de-errores)
- [Ejemplo de compilacion](#ejemplo-de-compilacion)

## Instalacion

1. Instalar [Node.js](https://nodejs.org/es/)
2. Clonar el repo `git clone https://github.com/Veronesi/tpi-sintaxis.git`
3. Descargar dependencias 
```bash
cd tpi-sintaxis
npm i 
npm install -g typescript
npm run tsc
```

## Guia de uso
Los programas a ejecutar se encuentran en la carpeta /examples/\[filename].js
```bash
npm run interpeter <filename>
```
### Sintaxis del lenguaje:
asignacion y declaracion de varialbes:
```js
vars x, y
x = 4;
y = x+1;
```

ciclo: `while(<condicion>){<cuerpo>};`
```js
vars i
i = 0;
while(i < 10){
  i = i+1;
};
```

condicional: `if(<condicion>){<cuerpo>};` o `if(<condicion>){<cuerpo1>}else{<cuerpo2>};`
```js
vars variable1
variable1 = 3;
if(variable1 > 4){
  vaiable1 = 5;
}else{
vaiable1 = 8;
};
```

lectura: `read("<cadena de texto>", x);`
```js
vars rd
read("inserte un numero", rd);
```

escritura: `write("<cadena de texto>", x);`
```js
var wr
wr = 65;
write("la variable wr vale: ", wr);
```
```
output: la variable wr vale 65
```

`npm run interpeter fibonacci lexicals`
```
┌─────────┬──────────┬─────────────────────────────────┐
│ (index) │  symbol  │             lexema              │
├─────────┼──────────┼─────────────────────────────────┤
│    0    │  'vars'  │             'vars'              │
│    1    │   'id'   │               'n'               │
│    2    │   ','    │               ','               │
│    3    │   'id'   │              'n1'               │
│    4    │   ','    │               ','               │
│    5    │   'id'   │              'n2'               │
│    6    │   ','    │               ','               │
│ ....... │ ........ │ ............................... │
│   66    │   '='    │               '='               │
│   67    │   'id'   │           'nextTerm'            │
│   68    │   ';'    │               ';'               │
│   69    │   'id'   │               'i'               │
│   70    │   '='    │               '='               │
│   71    │   'id'   │               'i'               │
│   72    │   '+'    │               '+'               │
│   73    │ 'numero' │               '1'               │
│   74    │   ';'    │               ';'               │
│   75    │   '}'    │               '}'               │
│   76    │   ';'    │               ';'               │
└─────────┴──────────┴─────────────────────────────────┘
```

`npm run interpeter fibonacci vars`
```
Serie Fibonacci, valor de n: 7
┌─────────┬────────────┬──────┬───────┐
│ (index) │    name    │ type │ value │
├─────────┼────────────┼──────┼───────┤
│    0    │    'n'     │  3   │   7   │
│    1    │    'n1'    │  3   │  13   │
│    2    │    'n2'    │  3   │  21   │
│    3    │ 'nextTerm' │  3   │  21   │
│    4    │    'i'     │  3   │   9   │
└─────────┴────────────┴──────┴───────┘
```

`npm run interpeter edad tree`
```
└><Programa>
   ├><DeclaracionVariables>
      ├> vars  
      └><ListaVariables>
         ├> id [edad] 
         └><FinListaVariables>
            └> ε  
   └><Cuerpo>
      ├><Sentencia>
         └><Lectura>
            ├> read  
            ├> (  
            ├> "  
            ├> cadena [cual es tu edad?: ] 
            ├> "  
            ├> ,  
            ├> id [edad] 
            └> )  
      ├> ;  
      └><CuerpoFin>
         ├><Sentencia>

    ........................................

                              ├> "  
                              ├> cadena [usted es menor de edad, ya que tiene ] 
                              ├> "  
                              ├> ,  
                              ├><Expresion>
                                 ├><SiguienteSR>
                                    ├><SiguienteMD>
                                       ├><SiguientePR>
                                          └> id [edad] 
                                       └><Operador3>
                                          └> ε  
                                    └><Operador2>
                                       └> ε  
                                 └><Operador1>
                                    └> ε  
                              └> )  
                        ├> ;  
                        └><CuerpoFin>
                           └> ε  
                     └> }  
         ├> ;  
         └><CuerpoFin
```

## Manejo de errores

### erores de TAS
```diff
- 1 = 2;                    ERROR_TAS:  TasEmptyCellError: la variable <Programa> no genera al terminal "numero"
```

### errores de semantica
```diff
  vars var1
- va1 = var2;               ReferenceError: 'va1' is not defined.
```

### errores lexicos
```diff
  vars var1
- var1:= 4;                  LexicalError: ':' is not defined.
```

### errores sintacticos
```diff
-  vars var1, var2, var1     SyntaxError: Identifier 'var1' has already been declared.
   var1 = var2 * 3;
```




```diff
  vars hola1, hola2

  hola1 = hola2 * 3;

  if(hola > 3){
-   hola2 = 3                 SyntaxError: Unexpected token '}' an ';' was expected in some line.
  };
```



```diff
  vars hola1, hola2

  hola1 = hola2 * 3;

  if(hola > 3){
    hola2 = 3;
- }                           SyntaxError: ';' was expected after '}' in some line.
```

## Ejemplo de compilacion

### fibonacci
calcula el n-ésimo número de la sucesión de Fibonacci.
```bash
npm run interpeter fibonacci
```

### mcm
calcula el mínimo común múltiplo entre dos números ingresados por pantalla.
```bash
npm run interpeter mcm
```

### example
busqueda del tesoro, se debe ingresar un numero del 1 al 9 y encontrar la casilla donde se encuentra el premio.
```bash
npm run interpeter example
```
