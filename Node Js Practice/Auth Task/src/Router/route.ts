import { Router } from "express";
import checkEmail from "../services/checkEmail";
import * as authController from "../controller/authController";
import authUser from "../middleware/authUser";
import { checkCaptcha } from "../middleware/checkCaptcha";

const router = Router()

router.get("/",authUser, authController.disHomePage)

// Resgistration Routes
router.get("/register", authController.disRegister)
router.post("/register", checkCaptcha , authController.userRegister)

// Login Routes
router.get("/login", authController.disLogin)
router.post("/login", authController.userLogin)
router.get("/logout", authController.logout)

// Forget password routes
router.get("/forgetPassword" , authController.disForgetPage)
router.post("/forgetPassword", authController.forgetPassword)
router.get("/forgetPassword/:resetToken" , authController.disResetPage)
router.post("/resetPassword" , authController.resetPassword)

// checking if user exist
router.post("/checkEmail", checkEmail)

export default router