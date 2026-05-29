import { type Request , type Response } from "express"
import fs from "fs/promises"

type params = {
    id : string
}

const showRecord = async (req: Request<params>,res: Response)=>{
    const id: string = req.params.id
    let data: String = await fs.readFile('/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/data/data.csv', 'utf-8')
    let desData = data.split("\n")
    let result = desData.filter((row) => row.split(",")[0] == id) 
    if(result){
        let d = result[0]?.split(",")
        res.render("update",{data: d})
    }

}

export default showRecord