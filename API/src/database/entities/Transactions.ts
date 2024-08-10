import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @Column()
    PropertyId: number;

    @Column()
    ServiceId: number;

    constructor(id: number, date: Date, amount: number, PropertyId: number, ServiceId: number) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.PropertyId = PropertyId;
        this.ServiceId = ServiceId;
    }
}