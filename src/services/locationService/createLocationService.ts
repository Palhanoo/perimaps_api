import { getRepository } from "typeorm";
import { Location } from "../../database/entities/Location";

export type CreateLocationType = {
    latitude: string,
    longitude: string,
    user_id: string,
}

export class CreateLocationService {
    async create({latitude, longitude, user_id}:CreateLocationType) {
        const repo = getRepository(Location);

        const location = repo.create({
            latitude,
            longitude,
            user_id
        });

        const savedLocation = await repo.save(location);

        return {success: true, location};



    }
}