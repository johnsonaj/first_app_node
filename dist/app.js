"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser"); //used to parse the form data that you pass in the request
const health_1 = require("./routes/health");
const foaas_1 = require("./routes/foaas");
class App {
    constructor() {
        this.health = new health_1.Health('0.1.2');
        this.foaas = new foaas_1.FOAAS('https://foaas.com');
        this.app = express();
        this.config();
        this.health.routes(this.app);
        this.foaas.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }
}
exports.default = new App().app;
