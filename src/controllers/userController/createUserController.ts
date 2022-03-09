import { Request, Response } from "express";
import { CreateUserService } from "../../services/userService/createUserService";

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body

        const service = new CreateUserService();

        const result = await service.create({name, email, password});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}