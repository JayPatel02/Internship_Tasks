import express from "express"
import { insertData } from "../controller/insertData"
import listData from "../controller/listData"
import deleteData from "../controller/deleteData"
import updateData from "../controller/updateData"
import preFilledData from "../controller/preFilledData"
 
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("index")
})

router.post("/insert", insertData )
router.get("/listData", listData )
router.delete("/delete/:id", deleteData)
router.get("/update/:id", preFilledData)
router.put("/updateData/:id", updateData)

export default router