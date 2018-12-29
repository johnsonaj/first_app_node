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
const axios_1 = require("axios");
class Game {
}
exports.Game = Game;
class IGDBGame {
    constructor(url, userKey) {
        this.url = `${url}/games`;
        this.userKey = userKey;
    }
    getGame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let game = new Game();
            let options = {
                url: this.url,
                headers: {
                    'Accept': 'application/json',
                    'user-key': this.userKey
                },
                method: 'POST',
                data: `fields *; where id = ${id};`
            };
            try {
                let r = yield axios_1.default(options);
                game = this.parseGame(r.data);
            }
            catch (e) {
                console.error(e);
            }
            return game;
        });
    }
    parseGame(game) {
        let g = new Game();
        game = JSON.parse(JSON.stringify(game));
        g.name = game[0].name;
        g.slug = game[0].slug;
        g.storyline = game[0].storyline;
        return g;
    }
}
exports.IGDBGame = IGDBGame;
