
import {Request, Response} from 'express';

class healthObject {
    version: string
    status: string
}

export class Health { 
    health: healthObject = new healthObject();

    constructor(ver: string) {
        this.health.status = 'ok';
        this.health.version = ver;
    }

    public routes(app: any): void {
        app.route('/health')
        .get((req: Request, resp: Response) => {            
            resp.status(200).send(this.health);
        });               
    }
}