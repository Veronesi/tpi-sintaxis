class InputString {
    input: Array<String>
    constructor(str: String){
        // Transform str in Array of string (chars)
        this.input = str.split('')
    }
    /**
     * @description get the next charset
     */
    next(): String{
        let charset:String = "";
        
        this.input.length ? (
            charset = this.input[0],
            this.input = this.input.slice(1)
        ) : null;
        return charset;
    }
}

export default InputString