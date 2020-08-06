"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Terminal_1 = __importDefault(require("./Terminal"));
const Variable_1 = __importDefault(require("./Variable"));
const SymbolGramatical = {
    ...Terminal_1.default,
    ...Variable_1.default,
};
exports.default = SymbolGramatical;
