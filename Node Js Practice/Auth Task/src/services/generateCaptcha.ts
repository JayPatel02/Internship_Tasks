import svgCaptcha from "svg-captcha"
import { type Request } from "express"
import "express-session"

declare module "express-session" {
    interface SessionData {
        captcha?: string
    }
}

const generateCaptcha = (req:Request) : string=>{
    const captcha = svgCaptcha.create()
    req.session.captcha = captcha.text
    return captcha.data
}

export default generateCaptcha