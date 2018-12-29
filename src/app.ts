import * as express from 'express';
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import {Health} from './routes/health'
import {FOAAS} from './routes/foaas'
import {IGDBHandler} from './routes/igdb'
import * as dotenv from 'dotenv'

class App {

    public app: express.Application;
    public health: Health = new Health('0.1.2');
    public foaas: FOAAS;
    public igdb: IGDBHandler;

    constructor() {
        this.app = express();
        this.setup();
        this.config();
        this.health.routes(this.app);
        this.foaas.routes(this.app);
        this.igdb.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

    private setup(): void {
        if(process.env.NODE_ENV !== 'production') {
            dotenv.load()
        }
        this.foaas = new FOAAS(process.env.FOAAS_URL);
        this.igdb = new IGDBHandler(process.env.IGDB_URL, process.env.IGDB_KEY);
    }
}


export default new App().app;