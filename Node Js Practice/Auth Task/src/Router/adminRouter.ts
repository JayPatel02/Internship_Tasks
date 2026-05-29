import { Router , type Request , type Response} from "express";
import * as adminController from "../controller/adminController"
import authAdmin from "../middleware/authAdmin";

const adminRouter = Router()

adminRouter.get("/",authAdmin ,(req: Request ,res: Response)=>{
    res.render("admin/home")
})

adminRouter.get("/showUsers", authAdmin, adminController.showUsers)

adminRouter.get("/logs", authAdmin,  adminController.showLogs)

export default adminRouter