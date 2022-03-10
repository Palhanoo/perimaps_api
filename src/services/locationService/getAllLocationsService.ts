import { getRepository } from "typeorm";
import { Location } from "../../database/entities/Location";

export class GetAllLocationsService {
    async getAll() {
        const repo = getRepository(Location);

        const allLocations = await repo.find();

        let data = [];

        for( const location of allLocations) {
            data.push({
                latitude: Number(location.latitude),
                longitude: Number(location.longitude)
            })
        }        

        return data;
    }
}