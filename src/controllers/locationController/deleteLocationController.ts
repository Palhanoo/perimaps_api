import { Request, Response } from "express";
import { DeleteLocationService, deleteType } from "../../services/locationService/deleteLocationService";

export class DeleteLocationController {
    async handle(request: Request, response: Response) {
        const location: deleteType = request.body;
        const service = new DeleteLocationService();

        const result = await service.DeleteOne(location);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}