import Joi from 'joi';

export const CreatePropertyReviewValidator = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    review: Joi.string().required(),
    PropertyId: Joi.number().required(),
});

export interface CreatePropertyReviewRequest {
    rating: number;
    review: string;
    PropertyId: number;
}

export const PropertyReviewIdValidation = Joi.object({
    id: Joi.number().required(),
});

export interface PropertyReviewIdRequest {
    id: number;
}

export const UpdatePropertyReviewValidator = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    review: Joi.string().required(),
    PropertyId: Joi.number().required(),
});

export interface UpdatePropertyReviewRequest {
    rating: number;
    review: string;
    PropertyId: number;
}

export const DeletePropertyReviewValidator = Joi.object({
    id: Joi.number().required(),
});

export interface DeletePropertyReviewRequest {
    id: number;
}

export const ListPropertyReviewValidator = Joi.object<ListPropertyReviewRequest>({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    rating: Joi.number().min(1).max(5).optional(),
    review: Joi.string().optional(),
    PropertyId: Joi.number().optional(),
});

export interface ListPropertyReviewRequest {
    page?: number;
    limit?: number;
    rating?: number;
    review?: string;
    PropertyId?: number;
}
