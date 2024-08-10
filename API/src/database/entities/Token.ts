import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar", length:255})
    token: string;

    @Column({ type: "varchar", length: 255 })
    blobName: string;

    @ManyToOne(() => User, user => user.tokens)
    user: User;


    constructor(id: number, token: string, blobName:string, user: User) {
        this.id = id
        this.token = token
        this.blobName = blobName
        this.user = user
    }
}