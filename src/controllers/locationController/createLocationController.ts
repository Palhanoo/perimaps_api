import { Request, Response } from "express";
import { CreateLocationService, CreateLocationType } from "../../services/locationService/createLocationService";

export class CreateLocationController {
    async handle(request: Request, response: Response) {
        const { latitude, longitude, user_id }: CreateLocationType = request.body;

        if(!latitude || !longitude || !user_id) {
            return response.status(422).json("Sem campos vazios!")
        }

        const createLocation: CreateLocationType = {
            latitude,
            longitude,
            user_id
        }

        const service = new CreateLocationService();

        const result = await service.create(createLocation);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);

    }
}