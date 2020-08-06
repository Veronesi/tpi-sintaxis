"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = __importDefault(require("./Request"));
var Save_1 = __importDefault(require("../helpers/Save"));
var Account = /** @class */ (function () {
    function Account(_a) {
        var _this = this;
        var server = _a.server, world = _a.world, id = _a.id, name = _a.name;
        this.screenShoot = {
            city: function (_a) {
                var _b = _a.save, save = _b === void 0 ? false : _b;
                _this.request.get({ url: _this.urlBase + "view=city" }, function (request, body) {
                    save ? Save_1.default.screenShot({ text: body, view: 'viewCity' }) : false;
                    return body;
                });
            },
            highScore: function (offset, _a) {
                var _b = _a.save, save = _b === void 0 ? false : _b;
                _this.request.post({ url: "" + _this.urlBase, form: { 'view': 'highscore', 'highscoreType': 'score', 'offset': offset, 'backgroundView': 'city', 'templateView': 'highscore', 'smb': 'Enviar', 'searchUser': '', 'ajax': '1' } }, function (request, body) {
                    save ? Save_1.default.screenShot({ text: body[1][1][1], view: 'highScore' }) : false;
                    _this.request.actionRequest = body[0][1].actionRequest;
                    return body;
                });
            }
        };
        this.server = server;
        this.world = world;
        this.id = id;
        this.name = name;
        this.request = new Request_1.default();
        this.urlBase = "https://s" + this.server.number + "-" + this.server.language + ".ikariam.gameforge.com/?";
    }
    Account.prototype.initCredentials = function (cookies, headers) {
        this.request.cookies = cookies;
        this.request.headers = headers;
    };
    return Account;
}());
exports.default = Account;
