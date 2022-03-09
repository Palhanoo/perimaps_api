import { getRepository } from "typeorm";
import { Location } from "../../database/entities/Location";


export class GetAllLocationsService {
    async getAll() {
        const repo = getRepository(Location);

        const allLocations = await repo.find();

        return allLocations;
    }
}