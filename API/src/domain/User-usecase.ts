import { DataSource } from "typeorm";
import { User } from "../database/entities/User";
import { CreateUserRequest, ListUserRequest } from "../handlers/validators/User-validator";

export interface UpdateUserParams {
    username?: string;
    password?: string;
    email?: string;
    role?: string;
}

export class UserUseCase {
    constructor(private dataSource: DataSource) {}

    async createUser(params: CreateUserRequest): Promise<User> {
        const repo = this.dataSource.getRepository(User);
        const newUser = repo.create(params);
        const savedUser = await repo.save(newUser);
        return savedUser;
    }

    async updateUser(id: number, params: UpdateUserParams): Promise<User> {
        const repo = this.dataSource.getRepository(User);
        const user = await repo.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }

        if (params.username) user.username = params.username;
        if (params.password) user.password = params.password;
        if (params.email) user.email = params.email;
        if (params.role) user.role = params.role;

        const updatedUser = await repo.save(user);
        return updatedUser;
    }

    async deleteUser(id: number): Promise<void> {
        const repo = this.dataSource.getRepository(User);
        const user = await repo.findOneBy({ id });
        if (!user) {
            throw new Error("User not found");
        }

        await repo.remove(user);
    }

    async listUsers(params: ListUserRequest): Promise<User[]> {
        const repo = this.dataSource.getRepository(User);
        const queryBuilder = repo.createQueryBuilder("user");

        if (params.username) {
            queryBuilder.andWhere("user.username LIKE :username", { username: `%${params.username}%` });
        }
        if (params.email) {
            queryBuilder.andWhere("user.email LIKE :email", { email: `%${params.email}%` });
        }
        if (params.role) {
            queryBuilder.andWhere("user.role = :role", { role: params.role });
        }

        if (params.page && params.limit) {
            queryBuilder.skip((params.page - 1) * params.limit).take(params.limit);
        }

        const users = await queryBuilder.getMany();
        return users;
    }

    async getUserById(id: number): Promise<User | null> {
        const repo = this.dataSource.getRepository(User);
        const user = await repo.findOneBy({ id });
        return user || null;
    }
}
