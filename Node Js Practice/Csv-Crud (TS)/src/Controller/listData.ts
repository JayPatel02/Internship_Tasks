import fs from "fs/promises";
import { type Request ,type Response } from "express";

const listData = async (req: Request,res: Response) =>{
    let data: string = await fs.readFile('/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/data/data.csv', 'utf-8')
    let desData: string[] = data.split("\n")
    res.render("list", {data: desData})
}

export default listData