import {Request, Response} from 'express'
import {IGDBGame} from '../igdb/games'
import { IGDBPlatform } from '../igdb/platform';

export class IGDBHandler {
    igdbgame: IGDBGame;
    igdbplatform: IGDBPlatform;

    constructor(url: string, userKey: string) {
        this.igdbgame = new IGDBGame(url, userKey);
    }

    public routes(app: any) {
        app.route('/igdb/game/:id')
        .get(async (req: Request, resp: Response) => {
            let id = req.params.id;
            let response = await this.igdbgame.getGame(id);
            resp.status(200).send(response);
        });
    }
}