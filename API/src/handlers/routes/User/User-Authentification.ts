import express, { Request, Response } from "express"
import { AppDataSource } from "../../../database/database"
import { compare, hash } from "bcrypt";
import { CreateUserValidator, LoginUserValidation, userIdValidation } from "../../validators/User-validator"
import { generateValidationErrorMessage } from "../../validators/GenerateValidationMessage-validator";
import { User } from "../../../database/entities/User";
import { sign } from "jsonwebtoken";
import { Token } from "../../../database/entities/Token";
import { UserUseCase } from "../../../domain/User-usecase";



export const UserHandlerAuthentication = (app: express.Express) => {
    app.post('/auth/signup', async (req: Request, res: Response) => {
        try {
            const validationResult = CreateUserValidator.validate(req.body);
            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
    
            const createUserRequest = validationResult.value;
            const hashedPassword = await hash(createUserRequest.password, 10);
    
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.save({
                name: createUserRequest.name,
                firstname: createUserRequest.firstname,
                email: createUserRequest.email,
                password: hashedPassword,
                role: createUserRequest.role,
            });
    
            res.status(201).send({ id: user.id, name: user.name, firstname: user.firstname, email: user.email, role: user.role });
        } catch (error) {
            console.error('Erreur interne du serveur:', error);
            res.status(500).send({ error: "Erreur interne du serveur. Réessayez plus tard." });
        }
    });
    

    app.post('/auth/login', async (req: Request, res: Response) => {
        try {
            const validationResult = LoginUserValidation.validate(req.body);
            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
            const loginUserRequest = validationResult.value;
    
            // Récupération de l'utilisateur par email
            const user = await AppDataSource.getRepository(User).findOneBy({ email: loginUserRequest.email });
            if (!user) {
                res.status(400).send({ error: "username or password not valid" });
                return;
            }
    
            // Comparaison du mot de passe avec celui dans la base de données
            const isValid = await compare(loginUserRequest.password, user.password);
            if (!isValid) {
                res.status(400).send({ error: "username or password not valid" });
                return;
            }
    
            // Gestion du token
            const token = sign({ userId: user.id, email: user.email }, "votre_secret", { expiresIn: '1d' });
            await AppDataSource.getRepository(Token).save({ token, user });
    
            res.status(200).json({ token, user });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "internal error retry later" });
        }
    });
    

    app.delete('/auth/logout/:id', async (req: Request, res: Response) => {
        try {
            // Extraire le token de l'en-tête Authorization
            const token = req.headers.authorization?.split(' ')[1];
    
            if (!token) {
                res.status(400).send({ "error": "Token is required" });
                return;
            }
    
            // Validation de l'ID de l'utilisateur
            const validationResult = userIdValidation.validate({ id: req.params.id });
            if (validationResult.error) {
                res.status(400).send(generateValidationErrorMessage(validationResult.error.details));
                return;
            }
    
            const userUsecase = new UserUseCase(AppDataSource);
    
            // Vérification de la validité de l'utilisateur et du token
            if (await userUsecase.verifUser(+req.params.id, token) === false) {
                res.status(400).send({ "error": "Bad user" });
                return;
            }
    
            // Suppression du token de la base de données
            await userUsecase.deleteToken(+req.params.id);
    
            res.status(200).send({ "message": "Logout success" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": "Internal error, retry later" });
        }
    });
    

}

