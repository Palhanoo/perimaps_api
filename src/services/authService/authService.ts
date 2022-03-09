import { Request, Response } from "express"
import * as crypto from 'crypto'

export class AuthService  {
    async private(request: Request, response: Response) {
        if(request.headers.authorization) {
            const [authType, hash] = request.headers.authorization;
            
            if(authType === 'basic') {
                // const hash = crypto.pbkdf2Sync(
                //     password,
                //     salt,
                //     1000000,
                //     64,
                //     'sha512'
                // );
            }
        }
    }
}