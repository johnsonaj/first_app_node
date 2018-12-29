import Axios from 'axios';
import { igdbGame } from './interfaces';

export class Game {
    name: string
    slug: string
    storyline: string
}

export class IGDBGame implements igdbGame {
    readonly url: string;
    readonly userKey: string;

    constructor(url: string, userKey: string) {
        this.url = `${url}/games`;
        this.userKey = userKey;
    }

    async getGame(id: number): Promise<Game> {
        let game: Game = new Game();
        let options: any = {
            url: this.url,
            headers: {
                'Accept': 'application/json',
                'user-key': this.userKey
            },
            method: 'POST',
            data: `fields *; where id = ${id};`
        }

        try {
            let r = await Axios(options);
            game = this.parseGame(r.data);
        } catch(e) {
            console.error(e);
        }
            
        return game
    }

    private parseGame(game: any): Game {
        let g: Game = new Game();
        game = JSON.parse(JSON.stringify(game))

        g.name = game[0].name;
        g.slug = game[0].slug;
        g.storyline = game[0].storyline;

        return g;
    }
}