import { type Request, type Response } from "express"
import fs from "fs/promises"

let insertData = async (req: Request, res: Response) => {
    const dataPath : string = '/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/data/data.csv'

    let data = await fs.readFile(dataPath, 'utf-8')
    let desData = data.split("\n")
    
    if(desData.length > 1){
        const currDate = new Date()
        let row = desData[desData.length - 1]?.split(",")[0] || "0"
        let newIdx = parseInt(row) + 1
        const entry = `\n${newIdx},${req.body.userName},${req.file?.filename},${currDate.toISOString()}`
        await fs.appendFile(dataPath, entry, 'utf-8')
    }else{
        const currDate = new Date()
        const entry = `\n1,${req.body.userName},${req.file?.filename},${currDate.toISOString()}`
        await fs.appendFile(dataPath, entry, 'utf-8')
    }
    res.redirect("/list")
}

export default insertData