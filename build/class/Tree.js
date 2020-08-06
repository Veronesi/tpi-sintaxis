"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tree {
    constructor({ symbolGramatical, lexema = "", childs = [] }) {
        this.symbol = symbolGramatical;
        this.Lexema = lexema;
        this.childs = childs;
    }
}
exports.default = Tree;
