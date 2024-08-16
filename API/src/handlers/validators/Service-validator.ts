import Joi from 'joi';

export const CreateServiceValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
});

export interface CreateServiceRequest {
    name: string;
    description: string;
    price: number;
}

export const ServiceIdValidation = Joi.object({
    id: Joi.number().required(),
});

export interface ServiceIdRequest {
    id: number;
}

export const ListServiceValidator = Joi.object<ListServiceRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(10).optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
});

export interface ListServiceRequest {
    page: number;
    limit: number;
    name: string;
    description: string;
    price: number;
}

