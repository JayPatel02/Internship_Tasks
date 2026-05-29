import { type Request, type Response } from "express";
import pool from "../config/db";

import { ResultSetHeader } from "mysql2";

interface qrs extends ResultSetHeader {
    email: string,
    user_pass: string
}

const checkEmail = async (req: Request, res: Response) => {
    try {
        const query = `select email from users where email="${req.body.email}"`
        const [result] = await pool.query<qrs[]>(query);
        if (result.length > 0) {
            return res.status(200).json({ message: "Email Exist." })
        } else {
            return res.status(404).json({ message: "Email not found." });
        }
    }catch(error){
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export default checkEmail