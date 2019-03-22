/**
 * @name ReservationEntity Entité ORM sur la table physique "reservation"
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /entities
 * @version 1.0.0
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation')
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
        nullable: false
    })
    date: Date;

    @Column({
        type: 'time',
        nullable: false
    })
    time: Date
}