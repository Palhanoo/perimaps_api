import { getRepository } from "typeorm";
import * as crypto from 'crypto'
import { GoogleUser } from "../../database/entities/GoogleUser";
import {sign } from 'jsonwebtoken'

type googleUserRequestType = {
    name: string
    email: string
    google_id: string
    userPic: string
}

export class CreateGoogleUserService {

    async findByEmail(email: string): Promise<GoogleUser | []> {
        const repo = getRepository(GoogleUser);

        const user = await repo.findOne({email})
        return user
    }
    
    async create({name, email, google_id, userPic}: googleUserRequestType) {
        const repo = getRepository(GoogleUser);

        if(await this.findByEmail(email) !== undefined) return {success: false, message: "Email já cadastrado"} 

        const payload = {
            email,
            google_id
        }

        const token = sign(JSON.stringify(payload), process.env.SECRET_KEY)
        
        const user = repo.create({
            name,
            email,
            google_id,
            userPic,
        })
        
        await repo.save(user);

        return {success:true, user: user, token};
    }
}