"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SymbolGramatical_1 = __importDefault(require("./class/SymbolGramatical"));
const tas_1 = __importDefault(require("./tools/tas"));
const table_1 = __importDefault(require("./configs/table"));
//let response = TAS(SymbolGramatical.Programa, SymbolGramatical.id)
const tas = new tas_1.default();
tas.load(table_1.default);
let elem = tas.getElements(SymbolGramatical_1.default.Programa, SymbolGramatical_1.default.or);
console.log(elem);
