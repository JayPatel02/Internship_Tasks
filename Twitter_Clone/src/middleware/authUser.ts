import type { Request, Response, NextFunction } from 'express';
import { JwtPayload} from 'jsonwebtoken';
import { verifyJwt } from '../services/jwtServices';

const authUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token : string = req.cookies.token;

        if(!token){
            return res.redirect("/login")
        }

        const decoded = verifyJwt(token) as JwtPayload;

        (req as any).userDetails = decoded;
        res.locals.user = decoded; // Make user details available in EJS templates through res.locals
        
        next()

    } catch (error) {
        console.log(error)
        res.redirect("/login")
    }
}

export default authUser;