import { Request, Response } from "express";
import { GetAllUserLocationsService } from "../../services/locationService/getUserLocations";

export class GetAllUserLocationsController {
    async handle(request: Request, response: Response) {
        const { user_id } = request.body;
        const service = new GetAllUserLocationsService();

        const result = await service.getAll(user_id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}