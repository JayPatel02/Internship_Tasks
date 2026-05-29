import type { Request, Response, NextFunction } from 'express';

const verifyForgetPassword = (req: Request,res: Response ,next : NextFunction) =>{
    try {
        
        if(!req.session.email){
            return res.redirect("/forgetPassword")
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Invalid request" })
    }
}

export default verifyForgetPassword;