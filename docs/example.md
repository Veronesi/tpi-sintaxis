## 0. ejemplo de código
```js
vars test
test = 10;
```

## 1. Analizador Léxico
#### 1.1 Inicializamos el analizador pasándole como parámetro el código fuente [app.ts:35](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/app.ts#L35)
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
En esta parte el analizador se encarga de ir leyendo caracter por caracter y dependiendo del valor del mismo tomará una decisión u otra, finalizando cuando se terminen de analizar todos los caracteres.

```js
while (!lexicalAnalizer.inputString.overflow()) {
  lexicalAnalizer.parser()
}
```

#### 1.2.1 Obtiene el próximo caracter [tools/LexicalAnalyzer.ts:30](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L30)
```js
char = this.inputString.next()
```
#### 1.2.2 Verifica si se trata de un número, letra o un símbolo [tools/LexicalAnalyzer.ts:34](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L34-L38)
```js
let groups = char.match(/^(?<string>[A-z])|(?<number>\d)|(?<symbol>\D)/)?.groups
let nextChar = { type: 'NaT', lexema: 'NaL' }
for (let typeChar in groups) {
  nextChar = groups[typeChar] ? { type: typeChar, lexema: groups[typeChar] } : nextChar;
}
```
#### 1.2.3 Si es el primer elemento en la pila pasa al próximo, sino verifica si es un token o si se deberá seguir analizando [tools/LexicalAnalyzer.ts:40](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L40-L54)

```js
if (stackChar.length) {
// Verificamos si es valido:
  if (this.checkTypeValidate(stackChar[0], nextChar, stackChar[stackChar.length - 1], stackChar.length)) {
    stackChar.push(nextChar)
  } else {
    complete = true
    // Creamos un nuevo lexema
     this.inputString.back()
      this.setLexical(stackChar)
    }
  } else {
    stackChar.push(nextChar)
}
```

En el caso de que el próximo caracter no sea válido, se vuelve el puntero un paso atrás y la pila de caracteres se convierte en un componente léxico y se vacía la misma.

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
#### 1.2.4 Una vez que sabemos que la pila es un componente léxico, transformamos la pila en un componente. para esto se verifica si es un String, Number, además de analizar previamente si es una palabra reservada. [tools/LexicalAnalyzer.ts:67](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L67-L124)
```js
LexicalAnalyzer.setLexical(stackChar: Array<StackChar>)
```
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
#### 2.1 Inicializacion del analizador pasandole como parametro los componentes léxicos obtenidos en el anterior paso [app.ts:45](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/app.ts#L45)
```js
const syntacticAnalyzer = new SyntacticAnalyzer(lexicalAnalizer.lexicals);
```
#### 2.1.1 Cargar la TAS [tools/SyntacticAnalyzer.ts:26](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L26-L27)
```js
this.TAS = new TAS()
this.TAS.load(table)
 ```
#### 2.1.2 Agregar en la pila el símbolo final `$` [tools/SyntacticAnalyzer.ts:32](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L32-L36)
```js
this.stack.push({
  symbol: SymbolGramatical.peso,
  pointer: Math.random(),
  lexema: '$'
})
```
#### 2.1.3 Agregar la variable inicial `<Programa>` [tools/SyntacticAnalyzer.ts:39](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L39-L44)
```js
let newItemSack: Stack = {
  symbol: SymbolGramatical.Programa,
  pointer: Math.random(),
  lexema: ''
}
this.stack.push(newItemSack)
```
#### 2.1.4 Inicializamos el árbol de derivación [tools/SyntacticAnalyzer.ts:47](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L47-L52)
```js
this.derivationTree = new Tree({
  symbolGramatical: SymbolGramatical.Programa,
  lexema: '',
  childs: [],
  pointer: newItemSack.pointer
})
```
#### 2.2 Analizar los token para generar el árbol de derivación
#### 2.2.1 Obtenemos el ultimo elemento de la pila y el el proximo token [tools/SyntacticAnalyzer.ts:59](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L59-L60)
```js
let top = this.stack.pop()
let symbol = this.inputString[this.pointer];
```
#### 2.2.2 Analizamos si es una variable o un terminal
#### 2.2.2-A si es una variable: obtenemos los elementos de la TAS generados por el token obtenido y el último elemento de la pila (variable), agregando estos nuevos elementos a la pila y al árbol [tools/SyntacticAnalyzer.ts:93](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L93-L115)
```js
let cell: SymbolGramatical[] = this.TAS.getElements(top.symbol.toVariable(), symbol.symbol.toTerminal())
```


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

#### 2.2.2-B si es un terminal: verificamos que el último elemento de la pila y el token a analizar sean los mismos, caso contrario generará un error. [tools/SyntacticAnalyzer.ts:82](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L82-L87)
```js
this.derivationTree.setTerminal({
  symbol: top.symbol,
  pointer: top.pointer,
  lexema: symbol.lexema
})
this.pointer++;
```


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
#### 2.3 Completar el árbol: para esto verificamos si el único símbolo en la pila es el símbolo `$`, y si el árbol está completo (si todas las variables generan terminales), en caso contrario tratamos de completarlo, ya que puede ser que haya más variables pero estos generen `epsilon`.

#### 2.3.1 Verificamos si la próxima variable 'vacía' genera a epsilon [tools/SyntacticAnalyzer.ts:135](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SyntacticAnalyzer.ts#L135)
```js
this.TAS.getElements(nextEmptyVariable.symbol, Terminal.epsilon)
```

En el ejemplo, al terminar de analizar queda `<CuerpoFin>` sin generar nada, en este caso `<CuerpoFin>` genera a `epsilon`, por lo que el árbol quedará completo
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
#### 3.1 Inicializamos el analizador pasándole como parámetro árbol de derivación y dando como resultado la tabla de variables  [tools/SemanticAnalyzer.ts:26](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SemanticAnalyzer.ts#L26)
```js
this.derivationTree = derivationTree;
```
#### 3.2.1 Obtenemos las variables declaradas y verificamos que solo estén declaradas una única vez cada una [tools/SemanticAnalyzer.ts:34](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SemanticAnalyzer.ts#L34-L36)
```js
let treeVars = this.derivationTree.getNodeByName(Variable.ListaVariables);
if (treeVars.pointer > -1)
  this.setVars(treeVars)
```

#### 3.2.2 Verificamos si todas las variables que se utilizaran en el programa están declaradas [tools/SemanticAnalyzer.ts:80](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/SemanticAnalyzer.ts#L69-L80)
```js
checkVariablesIsDeclared(tree = this.derivationTree) {
  if (tree.symbol.typeof() == Terminal.toString() && tree.symbol.toTerminal() == Terminal.id) {
    if (!this.vars.find(e => e.name == tree.lexema)) {
      Warn.criticalError(`ReferenceError: '${tree.lexema}' is not defined.`)
      process.exit()
    }
  }
  for (let child of tree.childs) {
    this.checkVariablesIsDeclared(child)
  }
}
```
#### 3.3 Resultado del analizador
```js
[ { name: 'test', type: 3, value: 0 } ]
```

### 4 Interprete

#### 4.1 Inicializamos el intérprete pasandole el árbol de derivación y la lista de variables [tools/Interpreter.ts:38](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L38-L41)
```ts
constructor(derivationTree: Tree, vars: Var[] = []) {
  this.derivationTree = derivationTree;
  this.vars = vars
}
```

#### 4.2 Ejecución del intérprete, éste analizará bloques de código de tipo `<Sentencia>` (y `<CuerpoFin>` que contienen sentencias)
#### 4.2.1 Verificamos si el primer nodo del árbol se encuentra vacío, en dicho caso finaliza el intérprete. [tools/Interpreter.ts:52](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L52-L53)
```js
if (firstChild.symbol.typeof() != Varaible.toString())
  return resolve(tree.deleteChild());
```

#### 4.2.2 Si el próximo nodo a analizar en una `<Sentencia>`, la ejecutamos y borramos este nodo para seguir interpretando el árbol, si es un `<CuerpoFin>` ejecutamos el primer hijo que es una `<Sentencia>` y pasamos a analizar el 3er hijo, (para los dos casos ejecutamos la `<Sentencia>`) [tools/Interpreter.ts:55](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L55-L76)
```ts
switch (firstChild.symbol.toVariable()) {
    case Varaible.Sentencia:
        // Se trata de una sentencia
        this.handleSentencia(firstChild)
            .then(() => resolve(tree.deleteChild()))
            .catch(err => console.log("error1", err))
        break;
    case Varaible.CuerpoFin:
        // Verificamos si es una e-produccion;
        if (firstChild.childs[0].symbol == Terminal.epsilon)
            return reject();

        this.handleSentencia(firstChild.childs[0]).then(() => {
            this.start(firstChild.childs[2]).then(() => {
                resolve(tree.deleteChild())
            }).catch(err => console.log("error2", err))
        }).catch(() => emptyTree);
        break;
    default:
        console.log("ups:", firstChild.symbol.toVariable())
        break;
}
```

#### 4.2.3 Al analizar una sentencia y verificamos si el primer nodo hijo es una `<Asignacion>`, `<Lectura>`, `<Escritura>`, etc. [tools/Interpreter.ts:89](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L89-L111)
```ts
switch (sentencia.symbol.toVariable()) {
    case Varaible.Asignacion:
        this.handleAsignacion(sentencia)
        resolve(emptyTree);
        break;
    case Varaible.Lectura:
        this.handleLectura(sentencia).then(() => resolve(emptyTree));
        break;
    case Varaible.Escritura:
        this.handleEscritura(sentencia);
        resolve(emptyTree);
        break;
    case Varaible.Condicional:
        this.handleCondicional(sentencia).then(() => resolve(emptyTree)).catch(() => resolve(emptyTree));
        break;
    case Varaible.Ciclo:
        this.handleCiclo(sentencia).then(() => resolve(emptyTree)).catch(() => resolve(emptyTree));
        break;
    default:
        console.log("Error capo ", sentencia.symbol.toVariable())
        reject(tree)
        process.exit()
}
```

#### 4.2.3.1 Asignación: buscamos la variable, ejecutamos la expresión y le asignamos su nuevo valor [tools/Interpreter.ts:117](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L117-L121)
```ts
handleAsignacion(tree: Tree): Tree {
  const variable = this.nameToVariable(tree.childs[0].lexema);
  variable.value = this.expresion(tree.childs[2]);
  return emptyTree;
}
```

#### 4.2.3.2 Lectura: muestra un mensaje en consola y luego busca la variable en el árbol y asigna su nuevo valor [tools/Interpreter.ts:131](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L131-L135)

```ts
const childNode = tree.getChildByName(Terminal.cadena);
const message: string = childNode.lexema;
rl.question(message, (answer: string) => {
  const childNodeVariable = tree.getChildByName(Terminal.id);
  const nameVariable = childNodeVariable.lexema;
  this.nameToVariable(nameVariable).value = Number(answer);
  rl.close();
  resolve(emptyTree);
})
```
#### 4.2.3.3 Escritura: muestra un mensaje en consola. [tools/Interpreter.ts:142](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L142)
```ts
const message: string = tree.getChildByName(Terminal.cadena).lexema;
const expresion = tree.getChildByName(Varaible.Expresion);
const value = this.expresion(expresion);
console.log(`${message}${value}`);
```

#### 4.2.3.4 Condicional: obtenemos del árbol el nodo condición (y ejecutamos para obtener su valor) y el bloque a ejecutar, en el caso de que no cumpla con la misma, se analiza si en el bloque de `<CierreCondicion>` su nodo hijo es distinto que `Epsilon`. ejecutamos el bloque `ELSE` [tools/Interpreter.ts:166](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L166-L177)
```ts
handleCondicional(tree: Tree): Promise<Tree> {
  const condicion = this.condicion(tree.getChildByName(Varaible.Condicion));
  const bloque = tree.getChildByName(Varaible.Bloque);

  // si cumple el IF
  if (condicion) return this.start(bloque.childs[1]);

  const cierreCondicion = tree.getChildByName(Varaible.CierreCondicion);
  
  if (cierreCondicion.childs[0].symbol == Terminal.epsilon) return emptyPromise;

  // si existe el ELSE y no cumplio el IF, ejecutamos el ELSE
  return this.start(cierreCondicion.getChildByName(Varaible.Bloque).childs[1]);
}
```

#### 4.2.3.5 Ciclo: similar a la condición, sólo que hacemos una copia del objeto `<Bloque>`, ya que este se deberá repetir hasta que cumpla con la condición [tools/Interpreter.ts:146](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/Interpreter.ts#L146-L164)
```ts
handleCiclo(tree: Tree): Promise<Tree> {
  const condicion = this.condicion(tree.getChildByName(Varaible.Condicion));
  const bloque = tree.getChildByName(Varaible.Bloque);

  if (!condicion) return emptyPromise;

  const promise: Promise<Tree> = new Promise((resolve, reject) => {

      // Creamos una copia del bloque
      const copyBloque: Tree = Tree.deepCopy(bloque.childs[1]);
      this.start(copyBloque).then(() => {
          this.handleCiclo(tree).then(() => {
              resolve(emptyTree)
          })
      }).catch(() => { console.log("ERR_HANDLE_CICLE"); resolve(emptyTree) })
  });

  return promise;
}
```

#### 4.3 El intérprete finaliza una vez que termina de ejecutar todo el árbol, ya que Interpreter.start() es una función recursiva.
