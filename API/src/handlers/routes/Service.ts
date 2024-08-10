import express, { Request, Response} from 'express';
import { AppDataSource } from '../../database/database';
import { ServiceUseCase } from '../../domain/Service-usecase';
import { CreateServiceValidator, UpdateServiceValidator, ListServiceValidator, ServiceIdValidation, DeleteServiceValidator } from '../validators/Service-validator';
import { generateValidationErrorMessage } from '../validators/GenerateValidationMessage-validator';
import { Service } from '../../database/entities/Service';

export const ServiceHandler = (app: express.Express) => {
    
    app.post('/service', async (req: Request, res: Response) => {
        const validation = CreateServiceValidator.validate(req.body);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const ServiceRequest = validation.value;

        const ServiceRepo = AppDataSource.getRepository(Service);

        try {
            const ServiceCreated = await ServiceRepo.save(ServiceRequest);
            res.status(201).send(ServiceCreated);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/service', async (req: Request, res: Response) => {
        const validation = ListServiceValidator.validate(req.query);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const ServiceRequest = validation.value;

        const ServiceRepo = AppDataSource.getRepository(Service);

        try {
            const ServiceList = await ServiceRepo.findOneBy(ServiceRequest);
            res.status(200).send(ServiceList);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/service/:id', async (req: Request, res: Response) => {
        const validation = ServiceIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const ServiceRequest = validation.value;

        const ServiceRepo = AppDataSource.getRepository(Service);

        try {
            const Service = await ServiceRepo.findOne(ServiceRequest);
            if (!Service) {
                res.status(404).send({ error: "Service not found" });
                return;
            }
            res.status(200).send(Service);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.patch('/service/:id', async (req: Request, res: Response) => {
        const validation = UpdateServiceValidator.validate(req.body);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const ServiceRequest = validation.value;

        const ServiceRepo = AppDataSource.getRepository(Service);

        try {
            const Service = await ServiceRepo.findOne(ServiceRequest.id);
            if (!Service) {
                res.status(404).send({ error: "Service not found" });
                return;
            }

            Service.name = ServiceRequest.name;
            Service.description = ServiceRequest.description;
            Service.price = ServiceRequest.price;

            const ServiceUpdated = await ServiceRepo.save(Service);
            res.status(200).send(ServiceUpdated);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.delete('/service/:id', async (req: Request, res: Response) => {
        const validation = DeleteServiceValidator.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const ServiceRequest = validation.value;

        const ServiceRepo = AppDataSource.getRepository(Service);

        try {
            const Service = await ServiceRepo.findOne(ServiceRequest.id);
            if (!Service) {
                res.status(404).send({ error: "Service not found" });
                return;
            }

            await ServiceRepo.remove(Service);
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

}