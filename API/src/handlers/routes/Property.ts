import express, { Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Property } from '../../database/entities/Property';
import { CreatePropertyValidator, ListPropertyValidator, PropertyIdValidation } from '../validators/Property-validator';
import { generateValidationErrorMessage } from '../validators/GenerateValidationMessage-validator';


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

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyRequest = validation.value;

        const PropertyRepo = AppDataSource.getRepository(Property);

        try {
            const PropertyList = await PropertyRepo.findOneBy(PropertyRequest);
            res.status(200).send(PropertyList);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/property/:id', async ( req: Request, res: Response) => {
        const validation = PropertyIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyRequest = validation.value;

        const PropertyRepo = AppDataSource.getRepository(Property);

        try {
            const Property = await PropertyRepo.findOne(PropertyRequest);
            if (!Property) {
                res.status(404).send({ error: "Property not found" });
                return;
            }
            res.status(200).send(Property);
        } catch (error) {
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
            const Property = await PropertyRepo.findOne(PropertyRequest);
            if (!Property) {
                res.status(404).send({ error: "Property not found" });
                return;
            }
            const updatedProperty = await PropertyRepo.save({ ...Property, ...req.body });
            res.status(200).send(updatedProperty);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.delete('/property/:id', async (req: Request, res: Response) => {
        const validation = PropertyIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const PropertyRequest = validation.value;

        const PropertyRepo = AppDataSource.getRepository(Property);

        try {
            const Property = await PropertyRepo.findOne(PropertyRequest);
            if (!Property) {
                res.status(404).send({ error: "Property not found" });
                return;
            }
            await PropertyRepo.remove(Property);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    }); 
}