class InputString {
    input: Array<string>
    pointer: number
    constructor(str: string) {
        // Transformamos en un array de caracteres para facilitar su manejo
        this.input = str.replace(/\n/g, '').split('')
        this.pointer = 0
    }
    /**
     * @description calcula el proximo elemento y lo elimina de la cadena de entrada
     * @returns devuelve el proximo elemento de la cadena de entrada
     */
    next(): string {
        let charset: string = "";

        this.pointer < this.input.length
            ? (
                charset = this.input[this.pointer],
                this.pointer++
            )
            : null;
        return charset;
    }
    back() {
        this.pointer--
    }
    overflow(): boolean {
        return this.pointer == this.input.length
    }
    clearSpace() {
        while (this.input[this.pointer] == " ") {
            this.pointer++
        }
    }
}

export default InputString