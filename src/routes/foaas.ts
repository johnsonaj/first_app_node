import {Request, Response} from 'express';
import * as request from 'request-promise-native' 

class FOAASMessage {
    message: string
    subtitle: string
}

export class FOAAS {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async asshole(name: string): Promise<FOAASMessage> {
        let response = new FOAASMessage()
        let options: any = {
            headers: {
                'Accept': 'application/json'
            },
            url: `${this.url}/asshole/${name}`,
            method: 'GET'
        }

        try {
            response = JSON.parse(await request(options))
        } catch(e) {
            console.error(e)
        }
        
        return response
    }

    async backOff(name: string, from: string): Promise<FOAASMessage> {
        let response = new FOAASMessage()
        let options: any = {
            headers: {
                'Accept': 'application/json'
            },
            url: `${this.url}/back/${name}/${from}`,
            method: 'GET'
        }

        try {
            response = JSON.parse(await request(options))
        } catch(e) {
            console.error(e)
        }

        return response
    }

    public routes(app: any) {
        app.route('/asshole/:name')
        .get(async (req: Request, resp: Response) => {
            let name = req.params.name
            let response = await this.asshole(name)
            resp.status(200).send(response)
        });

        app.route('/backoff/:name/:from')
        .get(async (req: Request, resp: Response) => {
            let name = req.params.name;
            let from = req.params.from;
            let response = await this.backOff(name, from)
            resp.status(200).send(response)
        })
    }
}