import type { Request , Response } from "express"
import { RowDataPacket } from "mysql2"
import fs from "fs"
import pool from "../config/db"

export const showUsers = async (req: Request , res:Response) =>{
    try {
        const query = `Select * from users;`
        const result = await pool.query(query)
        const rows = result[0] as RowDataPacket[]; 
        
        if(rows.length > 0){
            res.render("admin/showUsers", {data : rows})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "DataBase Error from Admin Controller"})
    }
}

export const showLogs = async (req: Request , res:Response) =>{
    try {
    
        const fileContent = fs.readFileSync("./logs/audit.log", "utf-8");
        const lines = fileContent.split("\n");
        const logEntries = [];

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed) { 
                try {
                    logEntries.push(JSON.parse(trimmed));
                } catch (e) {
                    continue; 
                }
            }
        }
        res.render("admin/showLogs", { logs: logEntries.reverse() });

    } catch (error) {
        console.log(error)        
        res.status(500).json({message : "DataBase Error from Admin Controller"})
    }
}