/**
 * Définition des options de configuration de l'application
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @version 1.0.0
 */
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: '127.0.0.1',
    port: 3306,
    username: 'lowcost_dba',
    password: '!Ste!Stex#',
    database: 'lowcost_repo',
    entities: [
        './entities/*.js'
    ],
    synchronize: true
}