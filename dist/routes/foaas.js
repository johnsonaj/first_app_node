"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
class FOAASMessage {
}
class FOAAS {
    constructor(url) {
        this.url = url;
    }
    asshole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = new FOAASMessage();
            let options = {
                headers: {
                    'Accept': 'application/json'
                },
                url: `${this.url}/asshole/${name}`,
                method: 'GET'
            };
            try {
                response = JSON.parse(yield request(options));
            }
            catch (e) {
                console.error(e);
            }
            return response;
        });
    }
    backOff(name, from) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = new FOAASMessage();
            let options = {
                headers: {
                    'Accept': 'application/json'
                },
                url: `${this.url}/back/${name}/${from}`,
                method: 'GET'
            };
            try {
                response = JSON.parse(yield request(options));
            }
            catch (e) {
                console.error(e);
            }
            return response;
        });
    }
    routes(app) {
        app.route('/asshole/:name')
            .get((req, resp) => __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            let response = yield this.asshole(name);
            resp.status(200).send(response);
        }));
        app.route('/backoff/:name/:from')
            .get((req, resp) => __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            let from = req.params.from;
            let response = yield this.backOff(name, from);
            resp.status(200).send(response);
        }));
    }
}
exports.FOAAS = FOAAS;
