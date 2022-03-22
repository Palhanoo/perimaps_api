import { getRepository } from "typeorm";
import { GoogleUser } from "../../database/entities/GoogleUser";
import { sign } from 'jsonwebtoken'

export class ValidateGoogleUserService {
    async validate(email:string, google_id: string) {
        const repo = getRepository(GoogleUser);

        const user = await repo.findOne({where: {email, google_id}});

        if (!user) return {success: false, message: 'Login inválido'};

        const payload = {
            email,
            id: user.id
        }

        const token = sign(JSON.stringify(payload), process.env.SECRET_KEY)
        
        if(user) {
            return {success: true, user, token};
        }else {
            return {success: false, message: 'Email não cadastrado'};
        }
    }
}