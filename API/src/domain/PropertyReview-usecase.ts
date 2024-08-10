import { DataSource } from "typeorm";
import { PropertyReview } from "../database/entities/PropertyReview";
import { CreatePropertyReviewRequest, ListPropertyReviewRequest } from "../handlers/validators/PropertyReview-validator";

export interface UpdatePropertyReviewParams {
    rating: number;
    review: string;
    PropertyId: number;
}

export class PropertyReviewUseCase {
    constructor(private dataSource: DataSource) {}

    async createPropertyReview(params: CreatePropertyReviewRequest): Promise<PropertyReview> {
        const repo = this.dataSource.getRepository(PropertyReview);
        const newReview = repo.create(params);
        const savedReview = await repo.save(newReview);
        return savedReview;
    }

    async updatePropertyReview(id: number, params: UpdatePropertyReviewParams): Promise<PropertyReview> {
        const repo = this.dataSource.getRepository(PropertyReview);
        const review = await repo.findOneBy({ id });
        if (!review) {
            throw new Error("PropertyReview not found");
        }

        review.rating = params.rating;
        review.review = params.review;
        review.PropertyId = params.PropertyId;

        const updatedReview = await repo.save(review);
        return updatedReview;
    }

    async deletePropertyReview(id: number): Promise<void> {
        const repo = this.dataSource.getRepository(PropertyReview);
        const review = await repo.findOneBy({ id });
        if (!review) {
            throw new Error("PropertyReview not found");
        }

        await repo.remove(review);
    }

    async listPropertyReviews(params: ListPropertyReviewRequest): Promise<PropertyReview[]> {
        const repo = this.dataSource.getRepository(PropertyReview);
        const queryBuilder = repo.createQueryBuilder("propertyReview");

        if (params.rating) {
            queryBuilder.andWhere("propertyReview.rating = :rating", { rating: params.rating });
        }
        if (params.review) {
            queryBuilder.andWhere("propertyReview.review LIKE :review", { review: `%${params.review}%` });
        }
        if (params.PropertyId) {
            queryBuilder.andWhere("propertyReview.PropertyId = :PropertyId", { PropertyId: params.PropertyId });
        }

        if (params.page && params.limit) {
            queryBuilder.skip((params.page - 1) * params.limit).take(params.limit);
        }

        const reviews = await queryBuilder.getMany();
        return reviews;
    }

    async getPropertyReviewById(id: number): Promise<PropertyReview | null> {
        const repo = this.dataSource.getRepository(PropertyReview);
        const review = await repo.findOneBy({ id });
        return review || null;
    }
}
