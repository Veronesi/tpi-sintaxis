"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SymbolGramatical_1 = __importDefault(require("../class/SymbolGramatical"));
const tas_1 = __importDefault(require("./tas"));
const table_1 = __importDefault(require("../configs/table"));
const Tree_1 = __importDefault(require("../class/Tree"));
class SyntacticAnalizer {
    constructor() {
        this.inputString = ""; // change for input string
        this.TAS = new tas_1.default();
        this.TAS.load(table_1.default);
        this.stack = [];
        this.stack.push({
            symbol: SymbolGramatical_1.default.peso,
            tree: new Tree_1.default({
                symbolGramatical: SymbolGramatical_1.default.peso,
                lexema: '$',
                childs: []
            })
        });
    }
}
exports.default = SyntacticAnalizer;
