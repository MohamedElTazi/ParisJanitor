import { DataSource } from "typeorm";
import { Service } from "../database/entities/Service";

export interface UpdateServiceParams {
    name: string;
    description: string;
    price: number;
}

export interface ListServiceRequest {
    name?: string;
    description?: string;
    price?: number;
    page?: number;
    limit?: number;
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
    
    async listService(listServiceRequest: ListServiceRequest): Promise<Service[]> {
        const query = this.dataSource.createQueryBuilder(Service, "service");

        if(listServiceRequest.name){
            query.andWhere("service.name = :name", { name: listServiceRequest.name });
        }

        if(listServiceRequest.description){
            query.andWhere("service.description = :description", { description: listServiceRequest.description });
        }

        if(listServiceRequest.price){
            query.andWhere("service.price = :price", { price: listServiceRequest.price });
        }

        const [services] = await query.getManyAndCount();
        return services;
    }

    async getServiceById(id: number): Promise<Service> {
        const query = this.dataSource.createQueryBuilder(Service, "service")
            .where("service.id = :id", { id });
        const service = await query.getOne();
        
        if (!service) {
            throw new Error("Service not found");
        }
        return service;
    }
}