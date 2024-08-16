import { DataSource } from "typeorm";
import { Property } from "../database/entities/Property";

export interface UpdatePropertyParams {
    name: string;
    address: string;
    city: string;
    state: string;
    price: number;
    description: string;
    image: string;
    OwnerId: number;
}

export interface ListPropertyRequest {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    price?: number;
    description?: string;
    image?: string;
    OwnerId?: number;
    page?: number;
    limit?: number;
}

export class PropertyUseCase {
    constructor(private dataSource: DataSource) {}

    async updateProperty(id: number, params: UpdatePropertyParams): Promise<Property> {
        const repo = this.dataSource.getRepository(Property);
        const property = await repo.findOneBy({ id });
        if (!property) {
            throw new Error("Property not found");
        }

        property.name = params.name;
        property.address = params.address;
        property.city = params.city;
        property.state = params.state;
        property.price = params.price;
        property.description = params.description;
        property.image = params.image;
        property.OwnerId = params.OwnerId;

        const updatedProperty = await repo.save(property);
        return updatedProperty;
    }

    async listProperty(listPropertyRequest: ListPropertyRequest): Promise<Property[]> {
        const query = this.dataSource.createQueryBuilder(Property, "property");

        if(listPropertyRequest.name){
            query.andWhere("property.name = :name", { name: listPropertyRequest.name });
        }

        if(listPropertyRequest.address){
            query.andWhere("property.address = :address", { address: listPropertyRequest.address });
        }

        if(listPropertyRequest.city){
            query.andWhere("property.city = :city", { city: listPropertyRequest.city });
        }

        if(listPropertyRequest.state){
            query.andWhere("property.state = :state", { state: listPropertyRequest.state });
        }

        if(listPropertyRequest.price){
            query.andWhere("property.price = :price", { price: listPropertyRequest.price });
        }

        if(listPropertyRequest.description){
            query.andWhere("property.description = :description", { description: listPropertyRequest.description });
        }

        if(listPropertyRequest.image){
            query.andWhere("property.image = :image", { image: listPropertyRequest.image });
        }

        if(listPropertyRequest.OwnerId){
            query.andWhere("property.OwnerId = :Owner", { OwnerId: listPropertyRequest.OwnerId });
        }

        const [properties] = await query.getManyAndCount();
        return properties;
        
    }

    async getPropertyById(id: number): Promise<Property> {
        const query = this.dataSource.createQueryBuilder(Property, "property")
            .where("property.id = :id", { id });
        const property = await query.getOne();

        if (!property) {
            throw new Error("Property not found");
        }
        return property;
    }
}
