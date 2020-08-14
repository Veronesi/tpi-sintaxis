class InputString {
    input: Array<String>
    constructor(str: String) {
        // Transformamos en un array de caracteres para facilitar su manejo
        this.input = str.split('')
    }
    /**
     * @description calcula el proximo elemento y lo elimina de la cadena de entrada
     * @returns devuelve el proximo elemento de la cadena de entrada
     */
    next(): String {
        let charset: String = "";

        this.input.length
            ? (
                charset = this.input[0],
                this.input = this.input.slice(1)
            )
            : null;
        return charset;
    }
}

export default InputString