import express, { Response } from "express";
import { PropertyHandler } from "./Property";
import { ServiceHandler } from "./Service";
import { PropertyReviewHandler } from "./PropertyReview";
import { UserHandler } from "./User/User";
import { UserHandlerAuthentication } from "./User/User-Authentification";


export const initRoutes = (app: express.Express) => {


    app.get("/health", (res: Response) => {
        res.send({ "message": "OP LE S" })
    })

    PropertyHandler(app)
    ServiceHandler(app)
    PropertyReviewHandler(app)
    UserHandler(app)
    UserHandlerAuthentication(app)
}