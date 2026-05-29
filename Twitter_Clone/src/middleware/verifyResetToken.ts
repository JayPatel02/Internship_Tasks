import type { Request, Response, NextFunction } from 'express';

const verifyResetToken = (req: Request,res: Response ,next : NextFunction) =>{
    try {
        
        if(!req.cookies.resetToken){
            return res.redirect("/forgetPassword")
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Invalid request" })
    }
}

export default verifyResetToken;