import jwt from "jsonwebtoken"

interface userData {
    email: string,
    userId: number
}

export const generateToken = (payload: userData , expiresIn:number ): string => {
    const Jwtsecret: string = process.env.JWT_SECRET || ""
    const token: string = jwt.sign(payload, Jwtsecret , {expiresIn: `${expiresIn}`})
    return token
}

export const verifyJwt = (token: string) => {
    const Jwtsecret: string = process.env.JWT_SECRET || ""
    return jwt.verify(token, Jwtsecret)
}