import express, { Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Property } from '../../database/entities/Property';
import { CreatePropertyValidator, ListPropertyValidator, PropertyIdValidation } from '../validators/Property-validator';
import { generateValidationErrorMessage } from '../validators/GenerateValidationMessage-validator';
import { PropertyUseCase } from '../../domain/Property-usecase';


export const PropertyHandler = (app: express.Express) => {

    app.post('/property', async (req: Request, res: Response) => {
        const validation = CreatePropertyValidator.validate(req.body);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyRequest = validation.value;

        const PropertyRepo = AppDataSource.getRepository(Property);

        try {
            const PropertyCreated = await PropertyRepo.save(PropertyRequest);
            res.status(201).send(PropertyCreated);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/property', async (req: Request, res: Response) => {
        const validation = ListPropertyValidator.validate(req.query);

        if(validation.error){
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const listPropertyRequest = validation.value;
        let limit = 20;
        if(listPropertyRequest.limit){
            limit = listPropertyRequest.limit;
        }
        const page = listPropertyRequest.page ?? 1;

        try{
            const propertyUseCase = new PropertyUseCase(AppDataSource);
            const PropertyList = await propertyUseCase.listProperty(listPropertyRequest);
            res.status(200).send(PropertyList);
        }
        catch(error){
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/property/:id', async ( req: Request, res: Response) => {
        try {
            const validation = PropertyIdValidation.validate(req.params);

            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }
            const PropertyId = validation.value;

            const propertyUseCase = new PropertyUseCase(AppDataSource);

            const property = await propertyUseCase.getPropertyById(PropertyId.id);
            if (!property) {
                res.status(404).send({ error: "Property not found" });
                return;
            }
            res.status(200).send(property);
        }        
        catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.patch('/property/:id', async (req: Request, res: Response) => {
        const validation = PropertyIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyRequest = validation.value;

        const PropertyRepo = AppDataSource.getRepository(Property);

        try {

            const propertyUseCase = new PropertyUseCase(AppDataSource);
            const validationResult = PropertyIdValidation.validate(req.params);
            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
            const UpdateProperty = await propertyUseCase.updateProperty(PropertyRequest.id, req.body);

            if(UpdateProperty == null){
                res.status(404).send({ error: "Property not found" });
                return;
            }
            res.status(200).send(UpdateProperty);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.delete('/property/:id', async (req: Request, res: Response) => {
        try{
            const validationResult = PropertyIdValidation.validate(req.params);

            if(validationResult.error){
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }

            const PropertyId = validationResult.value;

            const PropertyRepo = AppDataSource.getRepository(Property);

            const property = await PropertyRepo.findOneBy({ id: PropertyId.id });

            if(!property){
                res.status(404).send({ error: "Property not found" });
                return;
            }

            await PropertyRepo.remove(property);
            res.status(200).send({ message: "Property deleted" });
        }
        catch(error){
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    }); 
}