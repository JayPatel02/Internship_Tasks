import { type Request, type Response } from "express"
import { pool } from "../config/dbConnection"

const listData = async (req: Request, res: Response) => {
    try {
        const query = `select * from expenseDetails;`
        const [result] = await pool.query(query)
        if (result) {
            res.render("list", { data: result })
        }
    }catch(error){
        console.log(error)
    }
}

export default listData