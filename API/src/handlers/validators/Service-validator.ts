import Joi from 'joi';

export const CreateServiceValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    PropertyId: Joi.number().required(),
});

export interface CreateServiceRequest {
    name: string;
    description: string;
    price: number;
    PropertyId: number;
}

export const ServiceIdValidation = Joi.object({
    id: Joi.number().required(),
});

export interface ServiceIdRequest {
    id: number;
}

export const UpdateServiceValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    PropertyId: Joi.number().required(),
});

export interface UpdateServiceRequest {
    name: string;
    description: string;
    price: number;
    PropertyId: number;
}

export const DeleteServiceValidator = Joi.object({
    id: Joi.number().required(),
});

export interface DeleteServiceRequest {
    id: number;
}

export const ListServiceValidator = Joi.object<ListServiceRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    PropertyId: Joi.number().required(),
});

export interface ListServiceRequest {
    page: number;
    limit: number;
    name: string;
    description: string;
    price: number;
    PropertyId: number;
}

