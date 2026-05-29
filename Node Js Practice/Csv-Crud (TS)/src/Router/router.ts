import { Router ,type Request ,type Response} from "express"
import multer from "multer"
import path from "path"

import listData from "../Controller/listData.js"
import insertData from "../Controller/insertData.js"
import deleteData from "../Controller/deleteData.js"
import showRecord from "../Controller/showRecord.js"
import updateData from "../Controller/updateData.js"

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => cb(null, "src/uploads"),
    filename: (req: Request, file, cb) => {
        const uniqueSuffix: string = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext: string = path.extname(file.originalname)
        cb(null,file.fieldname + '-' +  uniqueSuffix + ext)
    }
})
const upload = multer({ storage })

const router = Router()

// home routes
router.get("/",(req,res)=>{
    res.render("index")
})
router.post("/submit",upload.single('profilePic'), insertData)

// list of data
router.get("/list", listData)
// delete row
router.get("/delete/:id", deleteData)

// update routes
router.get("/update/:id", showRecord)
router.post("/updateRecord/:id", upload.single('profilePic') , updateData)

export default router