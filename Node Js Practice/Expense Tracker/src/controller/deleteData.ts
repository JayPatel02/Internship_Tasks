import { type Request, type Response } from "express"
import { pool } from "../config/dbConnection"

type params = {
    id :string
}

const deleteData = async (req: Request<params>, res: Response) => {
    try {
        const id = req.params.id
        const query = `delete from expenseDetails where expenseId=${id}`

        const [result] = await pool.query(query)

        if(result){
            res.status(200).send({message: "Data Deleted"})
        }else{
            res.status(500).send({message:"Database Error."})
        }

    }catch(error){
        console.log(error)
    }
}

export default deleteData