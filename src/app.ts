import * as express from 'express';
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import {Health} from './routes/health'
import {FOAAS} from './routes/foaas'

class App {

    public app: express.Application;
    public health: Health = new Health('0.1.2');
    public foaas: FOAAS = new FOAAS('https://foaas.com')

    constructor() {
        this.app = express();
        this.config();
        this.health.routes(this.app);
        this.foaas.routes(this.app)
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

}

export default new App().app;