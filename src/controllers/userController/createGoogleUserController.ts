import { Request, Response } from "express";
import { CreateGoogleUserService } from "../../services/userService/createUserGoogleService"; 

export class CreateGoogleUserController {
    async handle(request: Request, response: Response) {
        const { name, email, userPic, google_id } = request.body

        if(!name || !email || !google_id) {
            return response.status(422).json("Sem campos vazios!")
        }

        const service = new CreateGoogleUserService();

        const result = await service.create({name, email, google_id, userPic });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}