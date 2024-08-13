import express, { Response } from "express";
import { PropertyHandler } from "./Property";
import { ServiceHandler } from "./Service";
import { PropertyReviewHandler } from "./PropertyReview";


export const initRoutes = (app: express.Express) => {


    app.get("/health", (res: Response) => {
        res.send({ "message": "OP LE S" })
    })

    PropertyHandler(app)
    ServiceHandler(app)
    PropertyReviewHandler(app)
}