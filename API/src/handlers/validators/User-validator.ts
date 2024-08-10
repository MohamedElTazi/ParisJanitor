import Joi from 'joi';

export const CreateUserValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
});

export interface CreateUserRequest {
    username: string;
    password: string;
    email: string;
    role: string;
}

export const UserIdValidation = Joi.object({
    id: Joi.number().required(),
});

export interface UserIdRequest {
    id: number;
}

export const UpdateUserValidator = Joi.object({
    username: Joi.string().optional(),
    password: Joi.string().min(8).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().optional(),
});

export interface UpdateUserRequest {
    username?: string;
    password?: string;
    email?: string;
    role?: string;
}

export const DeleteUserValidator = Joi.object({
    id: Joi.number().required(),
});

export interface DeleteUserRequest {
    id: number;
}

export const ListUserValidator = Joi.object<ListUserRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    username: Joi.string().optional(),
    email: Joi.string().optional(),
    role: Joi.string().optional(),
});

export interface ListUserRequest {
    page?: number;
    limit?: number;
    username?: string;
    email?: string;
    role?: string;
}
