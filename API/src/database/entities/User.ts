import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Token } from './Token';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];

    constructor(id: number, username: string, email: string, password: string, role: string, tokens: Token[]) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.tokens = tokens;        
    }
}