/**
 * @name ClientRepository Dépôt des données de l'entité "client"
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /repository
 * @version 1.0.0
 */
import { ClientEntity } from '../entities/client-entity';
import { getManager } from 'typeorm';

export class ClientRepo {
    public save(client: ClientEntity) {
        return getManager().getRepository(ClientEntity).save(client);
    }
}