"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Variable_1 = __importDefault(require("../class/Variable"));
const Terminal_1 = __importDefault(require("../class/Terminal"));
const table = [
    // Programa
    { varaible: Variable_1.default.Programa, terminal: Terminal_1.default.id, elements: [Variable_1.default.DeclaracionVariables] }
];
exports.default = table;
