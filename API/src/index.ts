import express from "express";
import cors from "cors";
import { initRoutes } from "./handlers/routes/routes";
import { AppDataSource } from "./database/database";
import 'dotenv/config';
import "reflect-metadata"

const main = async () => {
    const app = express()
    const port = process.env.PORT || '3000';

    try {

        await AppDataSource.initialize()
        console.error("well connected to database")
    } catch (error) {
        console.log(error)
        console.error("Cannot contact database")
        process.exit(1)
    }

    app.use(express.json())
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:5173'
    }))


    initRoutes(app)
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

main()