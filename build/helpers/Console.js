"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Console = {
    read: function (success) {
        rl.question('', function (text) {
            success(text);
        });
    },
    quest: function () {
    },
    write: function () {
    },
    render: {}
};
exports.default = Console;
