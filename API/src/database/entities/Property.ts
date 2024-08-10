import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;


    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    OwnerId: number;

    constructor(id: number, name: string, address: string, city: string, state: string, price: number, description: string, image: string, OwnerId: number) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.price = price;
        this.description = description;
        this.image = image;
        this.OwnerId = OwnerId;
    }


}