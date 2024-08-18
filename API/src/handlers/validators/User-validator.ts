import Joi from 'joi';
import { User, UserRole } from '../../database/entities/User';

export const CreateUserValidator = Joi.object({
    name: Joi.string().required(),
    firstname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.values(UserRole)).required(),
});

export interface CreateUserRequest {
    name: string;
    firstname: string;
    email: string;
    password: string;
    role: UserRole;
}

export const userIdValidation = Joi.object<UserIdRequest>({
    id: Joi.number().required(),
});

export interface UserIdRequest {
    id: number;
}

export const UpdateUserValidator = Joi.object({
    name: Joi.string().optional(),
    firstname: Joi.string().optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid(...Object.values(UserRole)).optional(),
    password: Joi.string().optional(),
});

export interface UpdateUserRequest {
    name?: string;
    firstname?: string;
    email?: string;
    role?: UserRole;
    password?: string;
}

export const ListUserValidator = Joi.object({
    name: Joi.string().optional(),
    firstname: Joi.string().optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid(...Object.values(UserRole)).optional(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
});

export interface ListUserRequest {
    name?: string;
    firstname?: string;
    email?: string;
    role?: UserRole;
    page?: number;
    limit?: number;
}

export const LoginUserValidation = Joi.object<LoginUserValidationRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).options({ abortEarly: false });

export interface LoginUserValidationRequest {
    email: string
    password: string
}