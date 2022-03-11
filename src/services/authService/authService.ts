import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'

type tokenPayload = {
    email: string
    password: string
}

export class AuthService  {
    async private(request: Request, response: Response, next: NextFunction) {
        if(request.headers.authorization) {
            const [_, token] = request.headers.authorization.split(' ');
            
            try {
                const payload = verify(token, process.env.SECRET_KEY) as tokenPayload
                request.user = payload
                console.log(payload);
                next()
            }catch(err) {
                return response.status(403).json({message: 'tu é gay!'})
            }
        }
    }
}