"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Save = {
    SCREENSHOT: './cache/screenshot/',
    CACHE: './cache/auth/',
    screenShot: function (_a) {
        var text = _a.text, view = _a.view;
        fs_1.default.writeFileSync("" + Save.SCREENSHOT + view + ".html", text);
    },
    auth: function (_a) {
        var session = _a.session;
        var text = {
            email: session.email,
            password: session.password,
            accounts: session.accounts,
            request: session.request
        };
        var _ = session.email.match(/^(.*)@/);
        var name = _ ? _[1].replace(/\./g, "") : 'session';
        fs_1.default.writeFileSync("" + Save.CACHE + name + ".json", JSON.stringify(text));
    }
};
exports.default = Save;
