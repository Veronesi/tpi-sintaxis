### 0. ejemplo de código:
```js
vars test
test = 10;
```

### 1. Analizador Léxico
#### 1.1 Inicializacion del analizador [app.ts:35](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/app.ts#L35)
```js
let lexicalAnalizer = new LexicalAnalizer(data)
```
Su primera tarea es transformar el string de entrada en un arreglo de caracteres [tools/LexicalAnalyzer.ts:17](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L17)
```js
this.inputString = new InputString(inputString)
```
```js
InputString {
  input: ['v', 'a', 'r', 's', ' ','h', 'o', 'l', 'a', ' ','h', 'o', 'l', 'a', ' ','=', ' ', '1', ';'],
  pointer: 0
}
```
#### 1.2 Generación de tokens [app.ts:38](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/app.ts#L37-L39)
En esta parte el analizador se encarga de ir leyendo caracter por caracter y dependiendo del valor del mismo tomara una decision u otra, finalizando cuando se terminen de analizar todos los caracteres.

##### 1.2.1 obtiene el proximo caracter [tools/LexicalAnalyzer.ts:30](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L30)
##### 1.2.2 verifica si se trata de un número, letra o un simbolo [tools/LexicalAnalyzer.ts:34](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L34-L38)
##### 1.2.3 si es el primer caracter pasa al proximo, sino verifica si ya se obtiene un token o se debera seguir analizando [tools/LexicalAnalyzer.ts:40](https://github.com/Veronesi/tpi-sintaxis/blob/6362e5e7cd69969dcbfa63599fd24df1f9977c6c/app/tools/LexicalAnalyzer.ts#L40-L54)
