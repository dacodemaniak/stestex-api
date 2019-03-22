/**
 * @name ReservationRepository Dépôt des données de l'entité "reservation"
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /repository
 * @version 1.0.0
 */
import { ReservationEntity } from '../entities/reservation-entity';
import { getManager } from 'typeorm';

export class ReservationRepo {
    public save(reservation: ReservationEntity) {
        return getManager().getRepository(ReservationEntity).save(reservation);
    }
}