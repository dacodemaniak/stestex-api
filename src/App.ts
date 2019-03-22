import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';

import { createConnection } from 'typeorm';

import TourRouter from './routes/TourRouter';
import * as appConfig from './shared/app-config';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this._middleware();
        this._createConnection();
        this._routes();
    }

    private _middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private _routes(): void {
        let router = express.Router();

        router.get('/', (request, response, next) => {
            response.json({
                message: 'Hello World'
            });
        });

        this.express.use('/', router);
        this.express.use('/api/v1/tours', TourRouter);
    }

    private _createConnection(): void {
        createConnection(appConfig.dbOptions).then(async connection => {
            console.log('Connexion base de données okay');
        }).catch((error) => {
            console.log('Erreur TypeORM : ', error);
        })
    }
}

export default new App().express;