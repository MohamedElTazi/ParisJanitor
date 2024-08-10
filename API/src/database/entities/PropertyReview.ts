import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Property } from './Property';

@Entity()
export class PropertyReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    review: string;

    @Column()
    PropertyId: number;

    constructor(id: number, rating: number, review: string, PropertyId: number) {
        this.id = id;
        this.rating = rating;
        this.review = review;
        this.PropertyId = PropertyId;
    }
}