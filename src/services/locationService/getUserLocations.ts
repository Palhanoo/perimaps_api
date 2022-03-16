import { getRepository } from "typeorm";
import { Location } from "../../database/entities/Location";

export class GetAllUserLocationsService {
    async getAll(user_id: string) {
        const repo = getRepository(Location);

        const allUserLocations = await repo.find({where: {user_id: user_id}});

        let data = [];

        for(const location of allUserLocations) {
            data.push({
                latitude: Number(location.latitude),
                longitude: Number(location.longitude)
            })
        }        

        return data;
    }
}