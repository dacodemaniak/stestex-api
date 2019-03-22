/**
 * @name ClientEntity Entité sur la table physique MySQL : client
 * @author IDea Factory (dev-team@ideafactory.fr) - Sept. 2018
 * @package /entities
 * @version 1.0.0
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 75,
        nullable: false
    })
    name: string;

    @Column({
        length: 75,
        nullable: true
    })
    firstname: string;

    @Column({
        length: 5
    })
    zipcode: string;

    @Column({
        length: 150
    })
    address: string;

    @Column({
        length: 75
    })
    city: string;

    @Column({
        length: 20
    })
    phone: string;

    @Column({
        length: 150,
        unique: true,
        nullable: false
    })
    email: string;


}