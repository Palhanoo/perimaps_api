import { getRepository } from "typeorm";
import { Location } from "../../database/entities/Location";

export type deleteType = {
    latitude: String
    longitude: String
}

export class DeleteLocationService {
    async DeleteOne(location: deleteType) {
        const repo = getRepository(Location);

        const specificLocation = await repo.findOne({where: {latitude: location.latitude, longitude: location.longitude}});

        if(!specificLocation) throw new Error('Localidade não encontrada')

        const deletedLocation = await repo.delete(specificLocation.id);

        return deletedLocation;
    }
}