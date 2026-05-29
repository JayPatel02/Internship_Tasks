import { type Request , type Response } from "express"
import { pool } from "../config/dbConnection"

type params ={
    id:string
}

const preFilledData = async (req: Request<params>,res: Response)=>{
    try {
        const id = req.params.id
        const query = `select * from expenseDetails where expenseId=${id}`

        const [result] = await pool.query(query)

        res.render("updateData",{data : result})
    } catch (error) {
        console.log(error)
    }
}

export default preFilledData