import { DataSource, DeleteResult} from "typeorm";
import { User } from "../database/entities/User";
import { Token } from "../database/entities/Token";

export interface ListUserRequest {
    name?: string;
    firstname?: string;
    email?: string;
    role?: string;
    page?: number;
    limit?: number;
}

export interface UpdateUserParams {
    name?: string;
    firstname?: string;
    password?: string;
    email?: string;
    role?: string;
}

export class UserUseCase {
    constructor(private dataSource: DataSource) {}


    async updateUser(id: number, params: UpdateUserParams): Promise<User> {
        const repo = this.dataSource.getRepository(User);
        const user = await repo.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }

        if (params.name) {
            user.name = params.name;
        }
        if (params.firstname) {
            user.firstname = params.firstname;
        }
        if (params.password) {
            user.password = params.password;
        }
        if (params.email) {
            user.email = params.email;
        }
        if (params.role) {
            user.role = params.role;
        }

        const updatedUser = await repo.save(user);
        return updatedUser;
    }

    async listUsers(params: ListUserRequest): Promise<User[]> {
        const query = this.dataSource.createQueryBuilder(User, "user");

        if (params.name) {
            query.andWhere("user.username LIKE :username", { username: `%${params.name}%` });
        }
        if (params.firstname) {
            query.andWhere("user.firstname LIKE :firstname", { firstname: `%${params.firstname}%` });
        }
        if (params.email) {
            query.andWhere("user.email LIKE :email", { email: `%${params.email}%` });
        }
        if (params.role) {
            query.andWhere("user.role = :role", { role: params.role });
        }

        const [users] = await query.getManyAndCount();
        return users;
    }

    async verifUser(id: number, token: string): Promise<boolean> { 
        const user = await this.getOneUser(id);
        if (!user) {
            return false;
        }
    
        for (const element of user.tokens) {
            if (element.token === token) {
                return true;
            }
        }
        return false;
    }

    async deleteToken(id: number): Promise<DeleteResult> {
        const TokenDelete = await this.dataSource.createQueryBuilder().delete().from(Token).where("userId = :id", { id: id }).execute();
        return TokenDelete;
    }
    
    async getOneUser(id: number): Promise<User | null> {
        const query = this.dataSource.createQueryBuilder(User, 'user')
            .where("user.id = :id", { id: id });
        const user = await query.getOne();

        if (!user) {
            console.log({ error: `User ${id} not found` });
            return null;
        }
        return user;
    }
    
}
