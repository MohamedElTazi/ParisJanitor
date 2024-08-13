import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "Janitor",
    logging: true,
    synchronize: false,
    entities:[
        "src/database/entities/*.ts" , "dist/database/entities/*.js"
    ],
    migrations:[
        "src/database/migrations/*.ts" , "dist/database/migrations/*.js"
    ]
})
