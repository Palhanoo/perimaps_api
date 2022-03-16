declare namespace Express {
    export interface Request {
       user?: {
           email: string
           password?: string
           google_id?: string
       }
    }
 }
 