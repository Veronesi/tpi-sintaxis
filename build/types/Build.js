"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Build = /** @class */ (function () {
    function Build(_a) {
        var name = _a.name, level = _a.level;
        this.name = name;
        this.level = level;
    }
    Build.prototype.upload = function () {
        this.level++;
        console.log('upload build..');
    };
    return Build;
}());
exports.default = Build;
