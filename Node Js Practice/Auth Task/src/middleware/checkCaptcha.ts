import type { Request , Response , NextFunction } from "express"

export function checkCaptcha(req: Request, res: Response, next: NextFunction) {
    const userInput : string = req.body.userInput;
    const { captcha } = req.session;

    if(!captcha){
        return res.status(400).json({ message: "Session Expired" });
    }

    if (userInput !== captcha) {
        return res.status(400).json({ message: "Invalid Captcha." });
    }

    next(); 
}

