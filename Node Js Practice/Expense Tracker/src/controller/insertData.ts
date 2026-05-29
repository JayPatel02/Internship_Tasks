import { pool } from "../config/dbConnection"
import { type Response, type Request } from "express"

interface values {
    expDet: string,
    expAmt: string
}

export const insertData = async (req: Request<values>, res: Response) => {
    try {
        const { expDet, expAmt } = req.body

        const query = `insert into expenseDetails(expDescription,expAmount) values(?,?)`

        const amount: number = parseFloat(expAmt)

        const values = [
            expDet,
            amount
        ]

        const result = await pool.query(query, values)

        if (result) {
            res.status(200).send({ message: "Data Entered" })
        } else {
            res.status(500).send({ message: "Error in Db" })
        }
    } catch (error) {
        console.log(error)
    }
}