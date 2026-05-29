import { type Request, type Response } from "express"
import fs from "fs/promises"

type params = {
    id: string
}

const updateData = async (req: Request<params>, res: Response) => {
    let id: number = parseInt(req.params.id)
    const { userName } = req.body
    const url = req.file ? req.file.filename : undefined
    const dirPath: String = "/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/uploads/"
    const dataPath: string = '/home/jay-patel/Internship Tasks/Node Js Practice/Csv-Crud (TS)/src/data/data.csv'

    let data = await fs.readFile( dataPath, 'utf-8')
    let desData = data.split("\n")

    let currentRow = desData.find(d => d.split(",")[0] == id.toString())

    if (currentRow) {

        let oldName = currentRow.split(",")[1]
        let oldUrl = currentRow.split(",")[2]

        let crrIdx = desData.findIndex(d => d.split(",")[0] == id.toString())

        const currDate = new Date()

        desData[crrIdx] = `${id},${userName ? userName : oldName},${url ? url : oldUrl},${currDate.toISOString()}`

        let insertData = desData.map(ele => ele).join("\n")

        if (url) {
            if (oldUrl)
            await fs.unlink(dirPath+oldUrl)
        }

        await fs.writeFile(dataPath, insertData, "utf-8")

        res.redirect("/list")
    }
}

export default updateData