import express, { Request, Response } from "express";
import { AppDataSource } from "../../../database/database";
import { User } from "../../../database/entities/User";
import { CreateUserValidator, ListUserValidator, UpdateUserValidator, userIdValidation } from "../../validators/User-validator";
import { generateValidationErrorMessage } from "../../validators/GenerateValidationMessage-validator";
import { UserUseCase } from "../../../domain/User-usecase";

export const UserHandler = (app: express.Express) => {
    app.post('/users', async (req: Request, res: Response) => {
        const validation = CreateUserValidator.validate(req.body);

        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const userRequest = validation.value;

        const userRepo = AppDataSource.getRepository(User);

        try {
            const userCreated = await userRepo.save(userRequest);
            res.status(201).send(userCreated);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get('/users', async (req: Request, res: Response) => {
        const validation = ListUserValidator.validate(req.query);

        if(validation.error){
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }
        const listUserRequest = validation.value;
        let limit = 20;
        if(listUserRequest.limit){
            limit = listUserRequest.limit;
        }
        const page = listUserRequest.page ?? 1;

        try{
            const userUseCase = new UserUseCase(AppDataSource);
            const userList = await userUseCase.listUsers(listUserRequest);
            res.status(200).send(userList);
        }
        catch(error){
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.delete("/users/:id", async (req: Request, res: Response) => {
        try {
            const validationResult = userIdValidation.validate({ ...req.params, ...req.body });


            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }

            const userUsecase = new UserUseCase(AppDataSource);
            
            if(await userUsecase.verifUser(+req.params.id, req.body.token) === false){
                res.status(400).send({ "error": `Bad user` });
                return;
            } 
            const userId = validationResult.value;

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: userId.id });
            if (user === null) {
                res.status(404).send({ "error": `User ${userId.id} not found` });
                return;
            }

            await userRepository.remove(user);
            res.status(200).send("User supprimé avec succès");
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.get("/users/:id", async (req: Request, res: Response) => {
        try {
            const validationResult = userIdValidation.validate({ ...req.params, ...req.body });


            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }

            const userUsecase = new UserUseCase(AppDataSource);
            
            if(await userUsecase.verifUser(+req.params.id, req.body.token) === false){
                res.status(400).send({ "error": `Bad user` });
                return;
            } 
            const userId = validationResult.value;

            const user = await userUsecase.getOneUser(userId.id);
            if (user === null) {
                res.status(404).send({ "error": `User ${userId.id} not found` });
                return;
            }
            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });

    app.patch("/users/:id", async (req: Request, res: Response) => {
        try {
            const validationResult = UpdateUserValidator.validate({ ...req.params, ...req.body });

            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
    
            const userUsecase = new UserUseCase(AppDataSource);

            if(await userUsecase.verifUser(+req.params.id, req.body.token) === false){
                res.status(400).send({ "error": `Bad user` });
                return;
            } 
            const updateUserRequest = validationResult.value;

            const updatedUser = await userUsecase.updateUser(
                updateUserRequest.id,
                { ...updateUserRequest }
            );


            if (updatedUser === null) {
                res.status(404).send({ "error": `User ${updateUserRequest.id} not found` });
                return;
            }

            if (typeof updatedUser === "string" && updatedUser === "No update provided") {
                res.status(400).send({ "error": `No update provided` });
                return;
            }

            res.status(200).send(updatedUser);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal error" });
        }
    });
}