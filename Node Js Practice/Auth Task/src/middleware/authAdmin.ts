import { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "../services/jwtServices";
import { type Request, type Response, type NextFunction } from "express";

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (token == undefined) {
        res.redirect("/login")
    }

    try {
        if (token) {
            const decodedData = verifyJwt(token) as JwtPayload
            if (decodedData?.userRole === "admin") {
                next()
            }

            if(decodedData?.userRole === "user"){
                res.redirect("/")
            }
        }
    } catch (error) {
        res.status(400).json({ message: "Token invalid or expired" })
    }
}

export default authAdmin