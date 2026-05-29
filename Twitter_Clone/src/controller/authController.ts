import type { Response, Request } from "express";
import bcrypt from "bcrypt";
import pool from "../config/db";
import { RowDataPacket } from "mysql2";
import { generateToken, verifyJwt } from "../services/jwtServices";
import { generateOtp } from "../services/otpServices";
import { JwtPayload } from "jsonwebtoken";
import generateCaptcha from "../services/generateCaptcha";

// Register Controllers
export const disRegister = (req: Request, res: Response) => {
    const data = generateCaptcha(req)
    res.render("authPages/registerUser" , {data : data});
}

export const registerUser = async (req: Request, res: Response) => {
    try {

        const { userName, email, currpass, phoneNumber, firstName, lastName } = req.body;

        const hassedPassword = await bcrypt.hash(currpass, 10);

        const query = `Insert into users (userName, userEmail, userPassword, userPhone, firstName, lastName) values (?, ?, ?, ?, ?, ?)`

        try {
            const [rows] = await pool.execute(query, [userName, email, hassedPassword, phoneNumber, firstName, lastName]) as RowDataPacket[];

            res.status(201).json({ message: "User Registered Successfully." })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Error in Registering User." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Register User." })
    }
}

// Login Controllers
export const disLogin = (req: Request, res: Response) => {
    const data = generateCaptcha(req)
    res.render("authPages/loginUser" , { data : data });
}

export const loginUser = async (req: Request, res: Response) => {
    try {

        const { email, currpass, isRemMe } = req.body;
        const query = `Select * from users where userEmail=? or userName=? or userPhone=?`

        const [rows] = await pool.execute<RowDataPacket[]>(query, [email, email, email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid Credentials." })
        }

        const hassedPassword = rows[0]?.userPassword;
        const isMatch = await bcrypt.compare(currpass, hassedPassword)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials." })
        }

        const data = {
            userId: parseInt(rows[0]?.user_id) || 0,
            userName: rows[0]?.userName || "",
            firstName: rows[0]?.firstName || "",
            lastName: rows[0]?.lastName || "",
            email: rows[0]?.userEmail || ""
        }

        const expiresIn = isRemMe ? "7d" : "1d";
        const maxAge = isRemMe ? 1000 * 60 * 60 * 24 * 7 : 1000 * 60 * 60 * 24 * 1; // in milliseconds

        const token: string = generateToken(data, expiresIn)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: maxAge
        })

        res.status(200).json({ message: "Login Successful." })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Login User." })
    }
}

// Logout Controller
export const logoutUser = (req: Request, res: Response) => {
    if (!req.cookies.token) {
        return res.status(400).json({ message: "User not logged in." })
    }
    res.clearCookie("token")
    return res.status(200).json({ message: "Logout Successful." })
}

// Forget Password Controller
export const disForgetPassword = (req: Request, res: Response) => {
    res.render("authPages/forgetPassword");
}

export const disOtpEmail = (req: Request, res: Response) => {
    const otp = generateOtp(res)
    res.render("authPages/otpEmail", { otp: otp });
}

export const disResetPassword = (req: Request, res: Response) => {
    const decodedToken = verifyJwt(req.cookies.resetToken) as { exp: number } & JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingSeconds = decodedToken.exp - currentTime;

    res.render("authPages/resetPassword", { expireTime: remainingSeconds });
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const email = req.session.email
        const { newPassword, otp } = req.body
        const decodedToken = verifyJwt(req.cookies.resetToken) as JwtPayload;

        if (!decodedToken) {
            return res.status(400).json({ message: "Invalid or expired OTP." })
        }

        const isCorrectOtp = decodedToken.otp === otp ? true : false

        if (isCorrectOtp) {

            const updateQuery = `update users set userPassword=? where userEmail=?`

            try {
                const hassedPassword = await bcrypt.hash(newPassword, 10);

                const [result] = await pool.execute<RowDataPacket[]>(updateQuery, [hassedPassword ?? "", email ?? ""]);

                res.clearCookie("resetToken")
                delete req.session.email

                res.status(200).json({ message: "Password reset successful." });

            } catch (error) {

                console.log(error)
                
                res.clearCookie("resetToken")
                delete req.session.email

                res.status(400).json({ message: "Error in Updating Password." })
            }
        } else {
            res.status(400).json({ message: "Invalid OTP." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Reset Password." })
    }
}

// Validate user credentials
export const checkEmail = async (req: Request, res: Response) => {
    try {

        const email: string = req.body.email;
        const type: string = req.body.type;

        const query = `Select * from users where userEmail=?`

        const [rows] = await pool.execute(query, [email]) as RowDataPacket[];

        if (rows?.length > 0) {
            if (type === "forgetPassword") {
                req.session.email = email
            }
            res.status(200).json({ message: "Email already exists." })
        }
        else {
            res.status(400).json({ message: "Email is unique." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Check Email." })
    }
}

export const checkUserName = async (req: Request, res: Response) => {
    try {

        const userName: string = req.body.userName;

        const query = `Select * from users where userName=?`

        const [rows] = await pool.execute(query, [userName]) as RowDataPacket[];

        if (rows?.length > 0) {
            res.status(200).json({ message: "User Name already exists." })
        }
        else {
            res.status(400).json({ message: "User Name is unique." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Check User Name." })
    }
}