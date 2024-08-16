import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Token } from './Token';

export enum UserRole {
    Invité = "Invité",
    Membre = "Membre",
    Administrateur = "Administrateur",
    Owner = "Owner"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({
        type: "enum",
        enum: UserRole,
    })
    role: string;

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];

    constructor(id: number, name: string, firstname: string, email: string, password: string, role: string, tokens: Token[]) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.tokens = tokens;        
    }
}