import express, { Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { PropertyReview } from '../../database/entities/PropertyReview';
import { CreatePropertyReviewValidator, ListPropertyReviewValidator, PropertyReviewIdValidation } from '../validators/PropertyReview-validator';
import { generateValidationErrorMessage } from '../validators/GenerateValidationMessage-validator';
import { PropertyReviewUseCase } from '../../domain/PropertyReview-usecase';

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

        if(validation.error){
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const listPropertyReviewRequest = validation.value;
        let limit = 20;
        if(listPropertyReviewRequest.limit){
            limit = listPropertyReviewRequest.limit;
        }
        const page = listPropertyReviewRequest.page ?? 1;

        try{
            const propertyReviewUseCase = new PropertyReviewUseCase(AppDataSource);
            const PropertyList = await propertyReviewUseCase.listPropertyReviews(listPropertyReviewRequest);
            res.status(200).send(PropertyList);
        }
        
        catch (error) {
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
        const PropertyReviewId = validation.value;

        const propertyReviewUseCase = new PropertyReviewUseCase(AppDataSource);

        const propertyReview = await propertyReviewUseCase.getPropertyReviewById(PropertyReviewId.id);

        try {
            const PropertyReview = await propertyReviewUseCase.getPropertyReviewById(PropertyReviewId.id);
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
            const propertyReviewUseCase = new PropertyReviewUseCase(AppDataSource);
            const validationResult = PropertyReviewIdValidation.validate(req.params);
            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
            const updatePropertyReview = await propertyReviewUseCase.updatePropertyReview(PropertyReviewRequest.id, req.body);

            if (updatePropertyReview == null) {
                res.status(404).send({ error: "PropertyReview not found" });
                return;
            }
            res.status(200).send(updatePropertyReview);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.delete('/property-review/:id', async (req: Request, res: Response) => {
        try {
            const validationResult = PropertyReviewIdValidation.validate(req.params);

            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
            const PropertyReviewId = validationResult.value;

            const PropertyReviewRepo = AppDataSource.getRepository(PropertyReview);

            const propertyReview = await PropertyReviewRepo.findOneBy({ id: PropertyReviewId.id });

            if (!propertyReview) {
                res.status(404).send({ error: "PropertyReview not found" });
                return;
            }

            await PropertyReviewRepo.remove(propertyReview);
            res.status(200).send({ message : "PropertyReview deleted" });
        } 
        catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

}