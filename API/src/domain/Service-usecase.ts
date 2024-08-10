import { DataSource } from "typeorm";
import { Service } from "../database/entities/Service";

export interface UpdateServiceParams {
    name: string;
    description: string;
    price: number;
}

export class ServiceUseCase {
    constructor(private dataSource: DataSource) {}

    async updateService(id: number, params: UpdateServiceParams): Promise<Service> {
        const repo = this.dataSource.getRepository(Service);
        const service = await repo.findOneBy({ id });
        if (!service) {
            throw new Error("Service not found");
        }

        service.name = params.name;
        service.description = params.description;
        service.price = params.price;

        const updatedService = await repo.save(service);
        return updatedService;
    }
}