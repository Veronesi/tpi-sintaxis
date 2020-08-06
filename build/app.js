"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SymbolGramatical_1 = __importDefault(require("./class/SymbolGramatical"));
const tas_1 = __importDefault(require("./tools/tas"));
let response = tas_1.default(SymbolGramatical_1.default.Programa, SymbolGramatical_1.default.id);
console.log(response);
