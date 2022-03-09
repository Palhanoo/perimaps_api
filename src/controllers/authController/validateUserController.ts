import { Request, Response } from "express";
import { ValidateUserService } from "../../services/authService/validateUserService";

export class ValidateUserController {
    async handle(request: Request, response: Response) {
        const {email, password} = request.body;

        if(!email || !password) {
            return response.status(422).json("Sem campos vazios!")
        }

        const service = new ValidateUserService();

        const result = await service.validate(email, password);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}