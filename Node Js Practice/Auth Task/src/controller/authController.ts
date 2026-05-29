import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import pool from "../config/db"
import { generateToken } from "../services/jwtServices"
import { ResultSetHeader, RowDataPacket } from "mysql2";
import generateCaptcha from "../services/generateCaptcha";
import crypto from "crypto"
import logger from "../config/winston.config";

interface qrs extends ResultSetHeader {
    email: string,
    user_pass: string,
    userId: number,
    user_role: string
}

interface UserRow extends RowDataPacket {
    email: string;
}

export const disHomePage = (req: Request, res: Response) => {
    res.render("home")
}

export const disRegister = (req: Request, res: Response) => {
    const data = generateCaptcha(req)
    res.render("register", { data: data })
}

export const disLogin = (req: Request, res: Response) => {
    res.render("login")
}

export const disForgetPage = (req: Request, res: Response) => {
    res.render("forgetPassword")
}

export const disResetPage = (req: Request, res: Response) => {
    const email = req.query.email
    res.render("resetPassword", { email: email })
}

export const forgetPassword = (req: Request, res: Response) => {
    try {
        const resetToken: string = crypto.randomBytes(32).toString("hex")
        logger.info("Reset Password Link Generated", {
            ip: req.ip,
            action: "FORGET_PASSWORD"
        })
        res.status(200).json({ link: `forgetPassword/${resetToken}` })
    } catch (error) {
        console.log(error)
        logger.info("Error Generating Reset Password Link", {
            ip: req.ip,
            action: "ERR_FORGET_PASSWORD"
        })
        res.status(500).json({ message: "Database Error" })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        logger.info("Opened Reset Password Page", {
            ip: req.ip,
            action: "RESET_PASSWORD",
            email: req.body.email
        })
        const getPassword = `select user_pass from users where email="${req.body.email}"`
        const [passResult] = await pool.query<UserRow[]>(getPassword)
        const oldPass = passResult[0]?.user_pass
        const isSame: boolean = await bcrypt.compare(req.body.newPassword, oldPass)

        if (isSame) {
            logger.info("Entered Password is same as Old Password", {
                ip: req.ip,
                action: "ERR_RESET_PASSWORD",
                email: req.body.email
            })
            return res.status(400).json({ message: "Entered Password is same as Old Password" })
        }

        const hashedPass: string = await bcrypt.hash(req.body.newPassword, 10)

        const updatePass = `update users set user_pass = "${hashedPass}" where email="${req.body.email}"`
        const updatedRes = await pool.query(updatePass)

        if (updatedRes) {
            logger.info("Password Updated Successfully", {
                ip: req.ip,
                action: "RESET_PASSWORD",
                email: req.body.email
            })
            return res.status(200).json({ message: "Password Updated" })
        } else {
            logger.info("Error in Updating the Password", {
                ip: req.ip,
                action: "ERR_RESET_PASSWORD",
                email: req.body.email
            })
            return res.status(400).json({ message: "Error in Updating the Password" })
        }

    } catch (error) {
        console.log("Database Error. ( Reset Password )")
        logger.info("Database Error in Reset Password", {
            ip: req.ip,
            action: "ERR_RESET_PASSWORD",
            email: req.body.email
        })
        return res.status(500).json({ message: "Database Error in ( Reset Password )" })
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const query = `select email,user_role,user_pass from users where email="${req.body.email}"`
        const [result] = await pool.query<qrs[]>(query);

        if (result.length === 0) {
            logger.info("Invalid Login Attempt", {
                ip: req.ip,
                action: "ERR_LOGIN",
                email: req.body.email
            });
            return res.status(400).json({ message: "Email does not Exist." });
        }

        const hashedPass = result[0]?.user_pass || ""
        const isMatch = bcrypt.compareSync(req.body.currpass, hashedPass);

        if (!isMatch) {
            logger.info("User Login Failed",
                {
                    ip: req.ip,
                    action: "ERR_LOGIN",
                    email: req.body.email
                });
            return res.status(400).json({ message: "Invalid Creds." });
        }

        const data = {
            email: result[0]?.email || "",
            userId: result[0]?.userId || 0,
            userRole: result[0]?.user_role || 0,
        }

        const maxAge = req.body.isRemMe ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60

        const token: string = generateToken(data, maxAge)

        res.cookie("token", token, {
            httpOnly: true,  // Prevents JavaScript access 
            secure: false,
            maxAge: maxAge
        })

        logger.info("User Login Successfull", {
            ip: req.ip,
            action: "LOGIN",
            email: req.body.email
        })
        res.status(200).json({ message: "User Logged in Successfully." })

    } catch (error) {
        console.log(error)
    }
}


export const userRegister = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, currpass } = req.body
        const role: string = "user"

        const query = `insert into users(firstName,lastName,email,user_role,user_pass) values (?,?,?,?,?) `
        const hashedPass = await bcrypt.hash(currpass, 10)

        const values = [
            firstName,
            lastName,
            email,
            role,
            hashedPass
        ]

        let [result] = await pool.query(query, values)

        if (result) {
            res.status(200).json({ message: "User registerd." })
            logger.info("New User Registered", {
                ip: req.ip,
                action: "REGISTER",
                email: req.body.email
            })
        } else {
            res.status(400).json({ message: "Error in Registring." })
            logger.info("Error Registering User", {
                ip: req.ip,
                action: "ERR_REGISTER",
                email: req.body.email
            })
        }

    } catch (error) {
        console.log(error)
    }
}

export const logout = (req: Request, res: Response) => {
    if (!req.cookies.token) {
        logger.info("User Logout Failed", {
            ip: req.ip,
            action: "ERR_LOGOUT"
        })
        return res.status(400).json({ message: "User not logged in." })
    }
    logger.info("User Logged Out", {
        ip: req.ip,
        action: "LOGOUT"
    })
    res.clearCookie("token")
    res.status(200).json({ message: "User logged out successfully." })
}