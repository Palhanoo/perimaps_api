import { Request, Response } from "express";
import { ValidateGoogleUserService } from "../../services/authService/validateGoogleUserService";

export class ValidateGoogleUserController {
    async handle(request: Request, response: Response) {
        const {email, google_id} = request.body;

        if(!email || !google_id) {
            return response.status(422).json("Sem campos vazios!")
        }

        const service = new ValidateGoogleUserService();

        const result = await service.validate(email, google_id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}