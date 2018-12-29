"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class healthObject {
}
class Health {
    constructor(ver) {
        this.health = new healthObject();
        this.health.status = 'ok';
        this.health.version = ver;
    }
    routes(app) {
        app.route('/health')
            .get((req, resp) => {
            resp.status(200).send(this.health);
        });
    }
}
exports.Health = Health;
