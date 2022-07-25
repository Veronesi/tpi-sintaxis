## 0. ejemplo de código
```js
vars test
test = 10;
```

## 1. Analizador Léxico
#### 1.1 Inicializacion del analizador pasandole como parametro el código fuente [app.ts:35](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/app.ts#L35)
```js
let lexicalAnalizer = new LexicalAnalizer(data)
```
Su primera tarea es transformar el string de entrada en un arreglo de caracteres [tools/LexicalAnalyzer.ts:17](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L17)
```js
this.inputString = new InputString(inputString)
```
```js
InputString {
  input: ['v', 'a', 'r', 's', ' ','t', 'e', 's', 't', ' ','t', 'e', 's', 't', ' ','=', ' ', '1', ';'],
  pointer: 0
}
```
#### 1.2 Generación de tokens [app.ts:38](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/app.ts#L37-L39)
En esta parte el analizador se encarga de ir leyendo caracter por caracter y dependiendo del valor del mismo tomara una decision u otra, finalizando cuando se terminen de analizar todos los caracteres.

#### 1.2.1 obtiene el proximo caracter [tools/LexicalAnalyzer.ts:30](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L30)
#### 1.2.2 verifica si se trata de un número, letra o un simbolo [tools/LexicalAnalyzer.ts:34](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L34-L38)
#### 1.2.3 Si es el primer elemento en la pila pasa al proximo, sino verifica si es un token o si se deberá seguir analizando [tools/LexicalAnalyzer.ts:40](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L40-L54)

en el caso de que el proximo caracter no sea valido, se vuelve el puntero un paso atras y la pila de caracteres se convierte en un componente lexico y se vacia la misma.

```js
// por ejemplo. si ya se analizó la "V" y ahora se analizará la "A":
// 1.2.1: "a"
// 1.2.2: Es un string
// 1.2.3 

LexicalAnalyzer.checkTypeValidate({ type: 'string', lexema: 'v' } { type: 'string', lexema: 'a' } { type: 'string', lexema: 'v' } 1)
// Primer elemento en la pila de caracteres "V"
// Caracter a analizar "A"
// Ultimo elemento en la pila "V"
// elementos en la pila: 1

// como el primer elemento y el proximo a analizar es un String, se seguira analizando ya que es un caracter valido
// posiblemente una palabra reservada o una variable
```
#### 1.2.4 una vez que sabemos que la pila es un componente lexico, transformamos la pila en un componente. para esto se verifica si es un String, Number, ademas de analizar previamente si es una palabra reservada. [tools/LexicalAnalyzer.ts:67](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L67-L124)

#### 1.2.5 Una vez que se terminaron de analizar todos los caracteres y se insertaron los tokens en `LexicalAnalyzer.lexicals`, se pasa al siguiente paso.
```js
lexicalAnalizer.lexicals = [
  { symbol: 'vars', lexema: 'vars' },
  { symbol: 'id', lexema: 'test' },
  { symbol: 'id', lexema: 'test' },
  { symbol: '=', lexema: '=' },
  { symbol: 'numero', lexema: '1' },
  { symbol: ';', lexema: ';' }
]
```
## 2. Analizador Sintactico
#### 2.1 Inicializacion del analizador pasandole como parametro los componentes lexicos obtenidos en el anterior paso [app.ts:45](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/app.ts#L45)
#### 2.1.1 Cargar la TAS [tools/SyntacticAnalyzer.ts:26](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L26-L27)

#### 2.1.2 Agregar en la pila el simbolo final `$` [tools/SyntacticAnalyzer.ts:32](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L32-L36)

#### 2.1.3 Agregar la variable iniciarl `<Programa>` [tools/SyntacticAnalyzer.ts:39](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L39-L44)

#### 2.1.4 Inicializamos el arbol de derivación [tools/SyntacticAnalyzer.ts:47](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L47-L52)

#### 2.2 Analizar los token para generar el arbol de derivacion
#### 2.2.1 Obtenemos el ultimo elemento de la pila y el el proximo token [tools/SyntacticAnalyzer.ts:59](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L59-L60)
#### 2.2.2 Analizamos si es una variable o un terminal
#### 2.2.2-A si es una variable: obtenemos los elementos de la TAS generados por el token obtenido y el ultimo elemento de la pila (variable), agregando estos nuevos elementos a la pila y al arbol [tools/SyntacticAnalyzer.ts:93](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L93-L115)
```js
// ejemplo: analizando el primer token
// Ultimo elemento en la pila: <Programa>
// Token a analizar "vars" (palabra reservada)
// como <Programa> es una variable:

// Arbol inicial
// └><Programa>

// Pila inicial
stack = [
  { symbol: '$', lexema: '$' },
  { symbol: '<Programa>' }
]

TAS.getElements(Variable.PROGRAMA, Terminal.VARS)

cell = ["<DeclaracionVariables>", "<Cuerpo>"]
// lo insertamos en el arbol:

// └><Programa>
//    ├><DeclaracionVariables>
//    └><Cuerpo>

// Pila resultante
stack = [
  { symbol: '$', lexema: '$' },
  { symbol: '<Cuerpo>' },
  { symbol: '<DeclaracionVariables>' }
]

```

#### 2.2.2-B si es un terminal: verificamos que el ultimo elemento de la pila y el token a analizar sean los mimsmos, caso contrario generara un error. [tools/SyntacticAnalyzer.ts:82](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L82-L87)
```js
// ejemplo: analizando el primer token
// Ultimo elemento en la pila: "vars"
// Token a analizar "vars" (palabra reservada)
// como "vars" es un terminal:

// Arbol inicial

// └><Programa>
//    ├><DeclaracionVariables>
//      ├>vars [vars]
//      └><ListaVariables>
//    └><Cuerpo>

// Pila inicial
stack = [
  { symbol: '$', lexema: '$' },
  { symbol: '<Cuerpo>' },
  { symbol: '<ListaVariables>' },
  { symbol: 'vars', lexema: 'vars' }
]

// como el ultimo elemento en la pila y el token a analizar es el terminal "Token", lo eliminamos de la pila y lo insertamos en el arbol,
// ahora el puntero apunta al token { symbol: 'id', lexema: 'test' }

// └><Programa>
//    ├><DeclaracionVariables>
//      ├>vars [vars]
//      └><ListaVariables>
//    └><Cuerpo>

// Pila inicial
stack = [
  { symbol: '$', lexema: '$' },
  { symbol: '<Cuerpo>' },
  { symbol: '<ListaVariables>' },
]


```
#### 2.3 Completar el arbol: para esto verificamos si el unico simbolo en la pila es el simoblo `$`, y si el arbol esta completo (si todas las variables generan terminales), en caso contrario tratamos de completarlo, ya que puede ser que haya mas variables pero estos generen `epsilon`.

#### 2.3.1 verificamos si la proxima variable 'vacia' genera a epsilon [tools/SyntacticAnalyzer.ts:135](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L135)

En el ejemplo, al terminar de analizar queda `<CuerpoFin>` sin generar nada, en este caso `<CuerpoFin>` genera a `epsilon`, por lo que el arbol quedara completo
```diff

└><Programa>
   ├><DeclaracionVariables>
      ├>vars [vars]
      └><ListaVariables>
         ├>id [test]
         └><FinListaVariables>
            └>ε [ε]
   └><Cuerpo>
      ├><Sentencia>
         └><Asignacion>
            ├>id [test]
            ├>= [=]
            └><Expresion>
               ├><SiguienteSR>
                  ├><SiguienteMD>
                     ├><SiguientePR>
                        └>numero [1]
                     └><Operador3>
                        └>ε [ε]
                  └><Operador2>
                     └>ε [ε]
               └><Operador1>
                  └>ε [ε]
      ├>; [;]
-      └><CuerpoFin>

{
  variable: Variable.CuerpoFin,
  terminal: Terminal.epsilon,
+  elements: [ Terminal.epsilon ]
}
```
### 3 Analizador semantico 
#### 3.1 inicializamos el analizador pasandole como parametro arbol de derivacion y dando como resultado la tabla de variables [tools/SemanticAnalyzer.ts:26](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SemanticAnalyzer.ts#L26)
#### 3.2.1 Obtenemos las variables declaradas y verificamos que solo esten declaradas una unica vez cada una [tools/SemanticAnalyzer.ts:34](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SemanticAnalyzer.ts#L34-L36)

#### 3.2.2 Verificamos si todas las variables que se utilizaran en el programa estan declaradas [tools//SemanticAnalyzer.ts:80](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SemanticAnalyzer.ts#L69-L80)

#### 3.3 Resultado del analizador
```js
[ { name: 'test', type: 3, value: 0 } ]
```

### 4 Interprete
