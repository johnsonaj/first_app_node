"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser"); //used to parse the form data that you pass in the request
const health_1 = require("./routes/health");
const foaas_1 = require("./routes/foaas");
const igdb_1 = require("./routes/igdb");
const dotenv = require("dotenv");
class App {
    constructor() {
        this.health = new health_1.Health('0.1.2');
        this.app = express();
        this.setup();
        this.config();
        this.health.routes(this.app);
        this.foaas.routes(this.app);
        this.igdb.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }
    setup() {
        if (process.env.NODE_ENV !== 'production') {
            dotenv.load();
        }
        this.foaas = new foaas_1.FOAAS('https://foaas.com');
        console.log(process.env.FOAAS_URL);
        this.igdb = new igdb_1.IGDBHandler('https://api-v3.igdb.com', '304b138892ee5cb7518a192d00270660');
    }
}
exports.default = new App().app;
