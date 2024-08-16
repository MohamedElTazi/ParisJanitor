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

    async listPropertyReviews(params: ListPropertyReviewRequest): Promise<PropertyReview[]> {
        const query = this.dataSource.createQueryBuilder(PropertyReview, "propertyReview");

        if (params.rating) {
            query.andWhere("propertyReview.rating = :rating", { rating: params.rating });
        }
        if (params.review) {
            query.andWhere("propertyReview.review LIKE :review", { review: `%${params.review}%` });
        }
        if (params.PropertyId) {
            query.andWhere("propertyReview.PropertyId = :PropertyId", { PropertyId: params.PropertyId });
        }

        const [reviews] = await query.getManyAndCount();
        return reviews;
    }

    async getPropertyReviewById(id: number): Promise<PropertyReview | null> {
        const query = this.dataSource.createQueryBuilder(PropertyReview, "propertyReview");
        query.where("propertyReview.id = :id", { id });
        const review = await query.getOne();

        if (!review) {
            throw new Error("Property-review not found");
        }
        return review;
    }
}
