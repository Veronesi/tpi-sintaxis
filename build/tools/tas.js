"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Variable_1 = __importDefault(require("../class/Variable"));
const Terminal_1 = __importDefault(require("../class/Terminal"));
const _TAS = {};
_TAS[Variable_1.default.Programa] = {};
_TAS[Variable_1.default.Programa][Terminal_1.default.vars] = [Variable_1.default.DeclaracionVariables];
const TAS = (x, symbol) => {
    return _TAS[x][symbol];
};
exports.default = TAS;
