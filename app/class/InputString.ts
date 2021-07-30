class InputString {
    /**
     * @property [input] 
     * @property [pointer] posicion del puntero para el codigo fuente de entrada
     */
    input: Array<string>
    pointer: number

    /**
     * @description
     * @param str codigo fuente del programa
     */
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

    /**
     * @description vuelve el puntero a una posicion anterior
     */
    back(): void {
        this.pointer--
    }

    /** 
     * @description verifica si ya se recorrieron todos los elementos
     */
    overflow(): boolean {
        return this.pointer >= this.input.length
    }

    /**
     * @description elimina todos los espacios en blanco proximos
     */
    clearSpace(): void {
        while (this.input[this.pointer] == " ") {
            this.pointer++
        }
    }
}

export default InputString