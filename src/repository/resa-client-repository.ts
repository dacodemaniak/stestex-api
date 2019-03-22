/**
 * @name ResaClientRepository Dépôt des données de l'entité "resa_client"
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /repository
 * @version 1.0.0
 */
import { ResaClientEntity } from '../entities/resa-client-entity';
import { getManager } from 'typeorm';

export class ResaClientRepo {
    public save(resaClient: ResaClientEntity) {
        return getManager().getRepository(ResaClientEntity).save(resaClient);
    }
}