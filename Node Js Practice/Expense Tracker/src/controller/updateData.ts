import { type Request, type Response } from "express"
import { pool } from "../config/dbConnection"

type params = {
    id: string
}

const updateData = async (req: Request<params>, res: Response) => {
    try {
        console.log("Inside Update")
        const id = req.params.id
        const { expDet, expAmt } = req.body

        const query = `update expenseDetails set expDescription="${expDet}" , expAmount="${expAmt}" where expenseId=${id}`

        const result = await pool.query(query)

        if (result) {
            res.status(200).send({ message: "Data Updated" })
        } else {
            res.status(500).send({ message: "Error in Update" })
        }
    }catch(error){
        console.log(error)
    }
}

export default updateData