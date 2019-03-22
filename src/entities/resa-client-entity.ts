/**
 * @name ResaClientEntity Entité ORM pour la table physique 'resa_client'
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /entities
 * @version 1.0.0
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resa_client')
export class ResaClientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'client_id'
    })
    clientId: number;

    @Column({
        type: 'int',
        nullable: false,
        name: 'reservation_id'
    })
    reservationId: number;

    @Column({
        type: 'smallint',
        nullable: false,
        default: 1
    })
    places: number;

    @Column({
        type: 'smallint',
        name: 'payment_status',
        nullable: false,
        default: 0
    })
    paymentStatus: number;
}