import { getRepository } from "typeorm";
import * as crypto from 'crypto'
import { User } from "../../database/entities/User";

export class ValidateUserService {
    async validate(email:string, password: string) {
        const repo = getRepository(User);

        const user = await repo.findOne({email});

        if (!user) return new Error('Login inválido');

        const {salt, key} = user;

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
            return {success: true, hash: hash.toString('hex')};
        }else {
            return new Error('Credenciais Inválidas');
        }
    }
}