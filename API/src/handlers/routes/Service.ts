import express, { Request, Response} from 'express';
import { AppDataSource } from '../../database/database';
import { ServiceUseCase } from '../../domain/Service-usecase';
import { CreateServiceValidator, ListServiceValidator, ServiceIdValidation } from '../validators/Service-validator';
import { generateValidationErrorMessage } from '../validators/GenerateValidationMessage-validator';
import { Service } from '../../database/entities/Service';

export const ServiceHandler = (app: express.Express) => {
    

    app.get('/services', async (req: Request, res: Response) => {
        const validation = ListServiceValidator.validate(req.query);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const listServiceRequest = validation.value;
        let limit = 20;
        if (listServiceRequest.limit) {
            limit = listServiceRequest.limit;
        }
        const page = listServiceRequest.page ?? 1;

        try{
            const serviceUseCase = new ServiceUseCase(AppDataSource);
            const ServiceList = await serviceUseCase.listService(listServiceRequest);
            res.status(200).send(ServiceList);
        }
        catch(error){
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });


    app.post('/services', async (req: Request, res: Response) => {
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

    app.get('/services/:id', async (req: Request, res: Response) => {
       try{
            const validation = ServiceIdValidation.validate(req.params);
            if (validation.error) {
                res.status(400).send(generateValidationErrorMessage(validation.error.details));
                return;
            }

            const ServiceId = validation.value;

            const serviceUseCase = new ServiceUseCase(AppDataSource);

            const service = await serviceUseCase.getServiceById(ServiceId.id);
            if (!service) {
                res.status(404).send({ error: "Service not found" });
                return;
            }
            res.status(200).send(service);
       }catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.patch('/services/:id', async (req: Request, res: Response) => {
        const validation = ServiceIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const ServiceRequest = validation.value;

        const ServiceRepo = AppDataSource.getRepository(Service);

        try {

            const serviceUseCase = new ServiceUseCase(AppDataSource);
            const validationResult = ServiceIdValidation.validate(req.params);
            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
            
            const ServiceUpdated = await serviceUseCase.updateService(ServiceRequest.id, req.body);
            
            if(ServiceUpdated == null){
                res.status(404).send({ error: "Service not found" });
                return;
            }
            res.status(200).send(ServiceUpdated);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.delete('/services/:id', async (req: Request, res: Response) => {
        const validation = ServiceIdValidation.validate(req.params);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const ServiceRequest = validation.value;

        const ServiceRepo = AppDataSource.getRepository(Service);

        try {
            const service = await ServiceRepo.findOneBy({ id: ServiceRequest.id });
            if (!service) {
                res.status(404).send({ error: "Service not found" });
                return;
            }

            await ServiceRepo.remove(service);
            res.status(204).send({ message: "Service deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

}