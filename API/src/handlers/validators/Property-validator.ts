import Joi from 'joi';

export const CreatePropertyValidator = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    OwnerId: Joi.number().required(),
});

export interface CreatePropertyRequest {
    name: string;
    address: string;
    city: string;
    state: string;
    price: number;
    description: string;
    image: string;
    OwnerId: number;
}

export const PropertyIdValidation = Joi.object({
    id: Joi.number().required(),
});

export interface PropertyIdRequest {
    id: number;
}

export const UpdatePropertyValidator = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    OwnerId: Joi.number().required(),
});

export interface UpdatePropertyRequest {
    name: string;
    address: string;
    city: string;
    state: string;
    price: number;
    description: string;
    image: string;
    OwnerId: number;
}

export const DeletePropertyValidator = Joi.object({
    id: Joi.number().required(),
});

export interface DeletePropertyRequest {
    id: number;
}

export const ListPropertyValidator = Joi.object<ListPropertyRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    price: Joi.number().optional(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    OwnerId: Joi.number().optional(),
});

export interface ListPropertyRequest {
    page?: number;
    limit?: number;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    price?: number;
    description?: string;
    image?: string;
    OwnerId?: number;
}
