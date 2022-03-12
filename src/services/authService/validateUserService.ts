import { getRepository } from "typeorm";
import * as crypto from 'crypto'
import { User } from "../../database/entities/User";
import { sign } from 'jsonwebtoken'

export class ValidateUserService {
    async validate(email:string, password: string) {
        const repo = getRepository(User);

        const user = await repo.findOne({email});

        if (!user) return {success: false, message: 'Login inválido'};

        const {salt, key} = user;

        const payload = {
            email,
            password
        }

        const token = sign(JSON.stringify(payload), process.env.SECRET_KEY)

        if(!salt) {
            return new Error('Usuário sem senha cadastrada!');
        }

        const hash = crypto.pbkdf2Sync(
            password,
            salt,
            1000000,
            64,
            'sha512'
        );

        if(hash.toString('hex') === key) {
            return {success: true, user, token};
        }else {
            return {success: false, message: 'Credenciais Inválidas'};
        }
    }
}