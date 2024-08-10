import { DataSource } from "typeorm";
import { Property } from "../database/entities/Property";
import { CreatePropertyRequest, ListPropertyRequest } from "../handlers/validators/Property-validator";

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

export class PropertyUseCase {
    constructor(private dataSource: DataSource) {}

    async createProperty(params: CreatePropertyRequest): Promise<Property> {
        const repo = this.dataSource.getRepository(Property);
        const newProperty = repo.create(params);
        const savedProperty = await repo.save(newProperty);
        return savedProperty;
    }

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

    async deleteProperty(id: number): Promise<void> {
        const repo = this.dataSource.getRepository(Property);
        const property = await repo.findOneBy({ id });
        if (!property) {
            throw new Error("Property not found");
        }

        await repo.remove(property);
    }

    async listProperties(params: ListPropertyRequest): Promise<Property[]> {
        const repo = this.dataSource.getRepository(Property);
        const queryBuilder = repo.createQueryBuilder("property");

        if (params.name) {
            queryBuilder.andWhere("property.name LIKE :name", { name: `%${params.name}%` });
        }
        if (params.address) {
            queryBuilder.andWhere("property.address LIKE :address", { address: `%${params.address}%` });
        }
        if (params.city) {
            queryBuilder.andWhere("property.city LIKE :city", { city: `%${params.city}%` });
        }
        if (params.state) {
            queryBuilder.andWhere("property.state LIKE :state", { state: `%${params.state}%` });
        }
        if (params.price) {
            queryBuilder.andWhere("property.price = :price", { price: params.price });
        }
        if (params.description) {
            queryBuilder.andWhere("property.description LIKE :description", { description: `%${params.description}%` });
        }
        if (params.image) {
            queryBuilder.andWhere("property.image LIKE :image", { image: `%${params.image}%` });
        }
        if (params.OwnerId) {
            queryBuilder.andWhere("property.OwnerId = :OwnerId", { OwnerId: params.OwnerId });
        }

        if (params.page && params.limit) {
            queryBuilder.skip((params.page - 1) * params.limit).take(params.limit);
        }

        const properties = await queryBuilder.getMany();
        return properties;
    }

    async getPropertyById(id: number): Promise<Property | null> {
        const repo = this.dataSource.getRepository(Property);
        const property = await repo.findOneBy({ id });
        return property || null;
    }
}
