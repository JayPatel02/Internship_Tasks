import { type Request , type Response } from "express"
import fs from "fs/promises"

type params = {
    id : string
}

const deleteData = async (req: Request<params>,res: Response)=>{
    let id: string = req.params.id
    let data: string = await fs.readFile('/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/data/data.csv',"utf-8")
    let desData: string[] = data.split("\n")
    let dirPath: String = "/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/uploads/"

    let deletedRow = desData.find((row: string) => row.split(",")[0] === id) 
    if(deletedRow){

        let deleteRowData: string[] = deletedRow.split(",")
        let url = deleteRowData[2]
        
        let result = desData.filter((row) => row.split(",")[0] != id)
        
        if(url){
            await fs.unlink(dirPath+url)
        }
    
        await fs.writeFile('/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/data/data.csv', result.join('\n') , "utf-8")
    
        res.redirect("/list")
    }
}

export default deleteData