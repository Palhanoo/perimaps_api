import { getRepository } from "typeorm";
import * as crypto from 'crypto'
import { User } from "../../database/entities/User";
import {sign } from 'jsonwebtoken'

type userRequestType = {
    name: string
    email: string
    password: string
}

export class CreateUserService {
    private getSaltAndKey (password: string) {
        const salt: string = crypto.randomUUID();
        const hash: Buffer = crypto.pbkdf2Sync(
            password,
            salt,
            1000000,
            64,
            'sha512'
        );

        const key: string = hash.toString('hex');

        return {salt, key};
    }

    async findByEmail(email: string): Promise<User | []> {
        const repo = getRepository(User);

        const user = await repo.findOne({email})
        return user
    }
    
    async create({name, email, password}: userRequestType) {
        const repo = getRepository(User);
        //select * from categories where name = name
        if(await this.findByEmail(email) !== undefined) return {success: false, message: "Email já cadastrado"} 

        const { salt, key } = this.getSaltAndKey(password);

        const payload = {
            email,
            password
        }

        const token = sign(JSON.stringify(payload), process.env.SECRET_KEY)
        
        const user = repo.create({
            name,
            email,
            password,
            salt,
            key
        })
        
        await repo.save(user);

        return {success:true, user: user, token};
    }
}