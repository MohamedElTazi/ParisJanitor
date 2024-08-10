import express, { Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { PropertyReview } from '../../database/entities/PropertyReview';
import { CreatePropertyReviewValidator, ListPropertyReviewValidator, PropertyReviewIdValidation } from '../validators/PropertyReview-validator';
import { generateValidationErrorMessage } from '../validators/GenerateValidationMessage-validator';

export const PropertyReviewHandler = (app: express.Express) => {

    app.post('/property-review', async (req: Request, res: Response) => {
        const validation = CreatePropertyReviewValidator.validate(req.body);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyReviewRequest = validation.value;

        const PropertyReviewRepo = AppDataSource.getRepository(PropertyReview);

        try {
            const PropertyReviewCreated = await PropertyReviewRepo.save(PropertyReviewRequest);
            res.status(201).send(PropertyReviewCreated);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/property-review', async (req: Request, res: Response) => {
        const validation = ListPropertyReviewValidator.validate(req.query);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyReviewRequest = validation.value;

        const PropertyReviewRepo = AppDataSource.getRepository(PropertyReview);

        try {
            const PropertyReviewList = await PropertyReviewRepo.findOneBy(PropertyReviewRequest);
            res.status(200).send(PropertyReviewList);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/property-review/:id', async (req: Request, res: Response) => {
        const validation = PropertyReviewIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyReviewRequest = validation.value;

        const PropertyReviewRepo = AppDataSource.getRepository(PropertyReview);

        try {
            const PropertyReview = await PropertyReviewRepo.findOne(PropertyReviewRequest);
            if (!PropertyReview) {
                res.status(404).send({ error: "PropertyReview not found" });
                return;
            }
            res.status(200).send(PropertyReview);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.patch('/property-review/:id', async (req: Request, res: Response) => {
        const validation = PropertyReviewIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyReviewRequest = validation.value;

        const PropertyReviewRepo = AppDataSource.getRepository(PropertyReview);

        try {
            const PropertyReview = await PropertyReviewRepo.findOne(PropertyReviewRequest);
            if (!PropertyReview) {
                res.status(404).send({ error: "PropertyReview not found" });
                return;
            }

            const updateValidation = CreatePropertyReviewValidator.validate(req.body);

            if (updateValidation.error) {
                res.status(400).send(generateValidationErrorMessage(updateValidation.error.details));
                return;
            }

            const updateRequest = updateValidation.value;

            PropertyReview.rating = updateRequest.rating;
            PropertyReview.review = updateRequest.review;
            PropertyReview.PropertyId = updateRequest.PropertyId;

            const updatedPropertyReview = await PropertyReviewRepo.save(PropertyReview);
            res.status(200).send(updatedPropertyReview);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.delete('/property-review/:id', async (req: Request, res: Response) => {
        const validation = PropertyReviewIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyReviewRequest = validation.value;

        const PropertyReviewRepo = AppDataSource.getRepository(PropertyReview);

        try {
            const PropertyReview = await PropertyReviewRepo.findOne(PropertyReviewRequest);
            if (!PropertyReview) {
                res.status(404).send({ error: "PropertyReview not found" });
                return;
            }

            await PropertyReviewRepo.remove(PropertyReview);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

}