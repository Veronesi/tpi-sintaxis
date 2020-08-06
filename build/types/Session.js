"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Account_1 = __importDefault(require("./Account"));
var Request_1 = __importDefault(require("./Request"));
var random_1 = __importDefault(require("../helpers/random"));
var Save_1 = __importDefault(require("../helpers/Save"));
var Session = /** @class */ (function () {
    function Session(_a) {
        var email = _a.email, password = _a.password;
        this.email = email;
        this.password = password;
        this.accounts = [];
        this.request = new Request_1.default();
    }
    Session.prototype.addAccount = function (_a) {
        var server = _a.server, world = _a.world, id = _a.id, name = _a.name;
        var account = new Account_1.default({ server: server, world: world, id: id, name: name });
        this.accounts.push(account);
        return account;
    };
    Session.prototype.exit = function () {
        Save_1.default.auth({ session: this });
    };
    Session.prototype.login = function (success) {
        var _this = this;
        // get gameEnvironmentId and platformGameId
        this.request.setHeaders({ 'Host': 'lobby.ikariam.gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.5', 'DNT': '1', 'Connection': 'close', 'Referer': 'https://lobby.ikariam.gameforge.com/' });
        this.request.get({ url: 'https://lobby.ikariam.gameforge.com/config/configuration.js' }, function (request, body) {
            var _platformGameId = body.match(/platformGameId":"((?:\w+|\-)*)"/);
            if (_platformGameId) {
                var platformGameId_1 = _platformGameId[1];
                var _gameEnvironmentId = body.match(/gameEnvironmentId":"((?:\w+|\-)*)"/);
                if (_gameEnvironmentId) {
                    var gameEnvironmentId_1 = _gameEnvironmentId[1];
                    // get __cfduid cookie
                    _this.request.clarHeaders();
                    _this.request.setHeaders({ 'Host': 'gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.5', 'DNT': '1', 'Connection': 'close', 'Referer': 'https://lobby.ikariam.gameforge.com/' });
                    _this.request.get({ url: 'https://gameforge.com/js/connect.js' }, function (request, body) {
                        _this.request.clarHeaders();
                        _this.request.setCookies({ name: '__cfduid', value: request.headers['set-cookie'][0].match(/__cfduid=(\w+|\-|\_)*/)[0] });
                        // update __cfduid cookie
                        _this.request.setHeaders({ 'Host': 'gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.5', 'Referer': 'https://lobby.ikariam.gameforge.com/', 'Origin': 'https://lobby.ikariam.gameforge.com', 'DNT': '1', 'Connection': 'close' });
                        _this.request.get({ url: 'https://gameforge.com/config' }, function (request, body) {
                            //this.request.setCookies({ name: '__cfduid', value: request.headers['set-cookie'][0].match(/__cfduid=(\w+|\-|\_)*/)[0] })
                            var __fp_eval_id_1 = random_1.default.fp_eval_id();
                            var __fp_eval_id_2 = random_1.default.fp_eval_id();
                            // get pc_idt cookie
                            _this.request.setHeaders({ 'Host': 'pixelzirkus.gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'Accept-Language': 'en-US,en;q=0.5', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lobby.ikariam.gameforge.com', 'DNT': '1', 'Connection': 'close', 'Referer': 'https://lobby.ikariam.gameforge.com/', 'Upgrade-Insecure-Requests': '1' });
                            var form = { 'product': 'ikariam', 'server_id': '1', 'language': 'en', 'location': 'VISIT', 'replacement_kid': '', 'fp_eval_id': __fp_eval_id_1, 'page': 'https%3A%2F%2Flobby.ikariam.gameforge.com%2F', 'referrer': '', 'fingerprint': '2175408712', 'fp_exec_time': '1.00' };
                            _this.request.post({ url: 'https://pixelzirkus.gameforge.com/do/simple', form: form }, function (request, body) {
                                _this.request.setCookies({ name: 'pc_idt', value: request.headers['set-cookie'][0].match(/pc_idt=(\w+|\-|\_)*/)[0] });
                                // update pc_idt cookie
                                _this.request.setHeaders({ 'Host': 'pixelzirkus.gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8', 'Accept-Encoding': 'gzip, deflate', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lobby.ikariam.gameforge.com', 'DNT': '1', 'Connection': 'close', 'Referer': 'https://lobby.ikariam.gameforge.com/', 'Upgrade-Insecure-Requests': '1' });
                                var formupc_idt = { 'product': 'ikariam', 'server_id': '1', 'language': 'en', 'location': 'fp_eval', 'fp_eval_id': __fp_eval_id_2, 'fingerprint': '2175408712', 'fp2_config_id': '1', 'page': 'https%3A%2F%2Flobby.ikariam.gameforge.com%2F', 'referrer': '', 'fp2_value': '921af958be7cf2f76db1e448c8a5d89d', 'fp2_exec_time': '96.00' };
                                _this.request.post({ url: 'https://pixelzirkus.gameforge.com/do/simple', form: formupc_idt }, function (request, body) {
                                    _this.request.clarHeaders();
                                    _this.request.setCookies({ name: 'pc_idt', value: request.headers['set-cookie'][0].match(/pc_idt=(\w+|\-|\_)*/)[0] });
                                    // send creds
                                    _this.request.setHeaders({ 'Host': 'gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': '*/*', 'Accept-Language': 'en-US,en;q=0.5', 'Referer': 'https://lobby.ikariam.gameforge.com/es_AR/', 'TNT-Installation-Id': '', 'Content-Type': 'application/json', 'Origin': 'https://lobby.ikariam.gameforge.com', 'DNT': '1', 'Connection': 'keep-alive', 'Pragma': 'no-cache', 'Cache-Control': 'no-cache', 'TE': 'Trailers' });
                                    _this.request.post({ url: 'https://gameforge.com/api/v1/auth/thin/sessions', form: { "identity": _this.email, "password": _this.password, "locale": "es_AR", "gfLang": "ar", "platformGameId": platformGameId_1, "gameEnvironmentId": gameEnvironmentId_1, "autoGameAccountCreation": "false" } }, function (request, body) {
                                        if (request.statusCode == 403)
                                            console.log('Wrong email or password\n');
                                        var auth_token = body.token;
                                        // get accounts
                                        _this.request.setCookies({ name: 'gf-token-production', value: auth_token + "; domail= .gameforge.com" });
                                        _this.request.setHeaders({ 'Host': 'lobby.ikariam.gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': 'application/json', 'Accept-Language': 'en-US,en;q=0.5', 'Referer': 'https://lobby.ikariam.gameforge.com/es_AR/hub', 'Authorization': "Bearer " + auth_token, 'DNT': '1', 'Connection': 'close' });
                                        _this.request.get({ url: 'https://lobby.ikariam.gameforge.com/api/users/me/accounts' }, function (request, body) {
                                            var accounts = body;
                                            // get servers
                                            _this.request.setHeaders({ 'Host': 'lobby.ikariam.gameforge.com', 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': 'application/json', 'Accept-Language': 'en-US,en;q=0.5', 'Referer': 'https://lobby.ikariam.gameforge.com/es_AR/hub', 'Authorization': "Bearer " + auth_token, 'DNT': '1', 'Connection': 'close' });
                                            _this.request.get({ url: 'https://lobby.ikariam.gameforge.com/api/servers' }, function (request, body) {
                                                var _a, _b, _c;
                                                var servers = body;
                                                accounts.forEach(function (account, i) {
                                                    var nameServer = servers.find(function (server) { return (server === null || server === void 0 ? void 0 : server.language) === account.server.language && (server === null || server === void 0 ? void 0 : server.number) === account.server.number; });
                                                    accounts[i].nameServer = nameServer.name;
                                                    console.log(i + 1 + ") " + account.name + " [" + nameServer.name + "][" + nameServer.language + "] players: " + nameServer.playersOnline + "/" + nameServer.playerCount);
                                                });
                                                // ACCOUNT_DEFAULT = 0
                                                _this.accounts.push(new Account_1.default({ server: accounts[0].server, world: accounts[0].nameServer, id: accounts[0].id, name: accounts[0].name }));
                                                _this.request.get({ url: "https://lobby.ikariam.gameforge.com/api/users/me/loginLink?id=" + ((_a = _this.accounts[0]) === null || _a === void 0 ? void 0 : _a.id) + "&server[language]=" + ((_b = _this.accounts[0]) === null || _b === void 0 ? void 0 : _b.server.language) + "&server[number]=" + ((_c = _this.accounts[0]) === null || _c === void 0 ? void 0 : _c.server.number) }, function (request, body) {
                                                    var _a;
                                                    var preg = (_a = body.url) === null || _a === void 0 ? void 0 : _a.match(/https:\/\/s\d+\-\w{2}\.ikariam\.gameforge\.com\/index\.php\?/);
                                                    if (preg) {
                                                        var host = preg[0];
                                                        _this.request.clarHeaders();
                                                        _this.request.setHeaders({ 'Host': body.url.split('//')[1].split('/index')[0], 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0', 'Accept': '*/*', 'Accept-Language': 'en,de-DE;q=0.8,en-US;q=0.5,es;q=0.3', 'Referer': host, 'X-Requested-With': 'XMLHttpRequest', 'Origin': host, 'DNT': '1', 'Connection': 'keep-alive', 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' });
                                                        _this.request.post({ url: body.url }, function (request, body) {
                                                            var _a;
                                                            _this.request.setCookies({ name: 'PHPSESSID', value: request.headers['set-cookie'][0].match(/PHPSESSID=(\w+|\-|\_)*/)[0] });
                                                            _this.request.setCookies({ name: 'ikariam_loginMode', value: request.headers['set-cookie'][1].match(/ikariam_loginMode=(\w+|\-|\_)*/)[0] });
                                                            _this.request.setCookies({ name: 'ikariam', value: request.headers['set-cookie'][2].match(/ikariam=(\w+|\-|\_)*/)[0] });
                                                            (_a = _this.accounts[0]) === null || _a === void 0 ? void 0 : _a.initCredentials(_this.request.cookies, _this.request.headers);
                                                            success({ res: true, account: _this.accounts });
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            }
            else {
                console.log("BGL_CONFIG not found");
            }
        });
    };
    return Session;
}());
exports.default = Session;
