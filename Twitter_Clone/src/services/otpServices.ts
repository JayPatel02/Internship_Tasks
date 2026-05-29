import { generateToken } from "./jwtServices"
import { Response } from "express"

export const generateOtp = (res: Response): number => {
    const opt: number = Math.floor(1000 + Math.random() * 9000)
    const payload = {
        otp: opt.toString()
    }
    const resetToken: string = generateToken(payload, "2m")
    res.cookie("resetToken", resetToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 2 // 2 minutes in milliseconds
    })
    return opt
}