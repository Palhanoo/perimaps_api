import { Request, Response } from "express";
import { GetAllLocationsService } from "../../services/locationService/getAllLocationsService";

export class GetAllLocationsController {
    async handle(request: Request, response: Response) {
        const service = new GetAllLocationsService();

        const result = await service.getAll();

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}