import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (payload : object , expiresIn: number | string): string => {
    const secretKey = process.env.JWT_SECRET || ""
    const token : string = jwt.sign(payload , secretKey , { expiresIn : expiresIn as any})
    return token
}

export const verifyJwt = (token: string) => {
    const Jwtsecret: string = process.env.JWT_SECRET || ""
    return jwt.verify(token, Jwtsecret)
}
