import { Router } from "express";
import * as authController from "../controller/authController";
import { disHome } from "../controller/userController";
import authUser from "../middleware/authUser";
import verifyForgetPassword from "../middleware/verifyForgetPassword";
import verifyResetToken from "../middleware/verifyResetToken";
import { checkCaptcha } from "../middleware/checkCaptcha";

const authRouter = Router();

authRouter.get("/", authUser , disHome)

// Login Routes
authRouter.get("/login", authController.disLogin)
authRouter.post("/login", checkCaptcha, authController.loginUser)

// Register Routes
authRouter.get("/register", authController.disRegister)
authRouter.post("/register", checkCaptcha ,authController.registerUser)

// Logout Route
authRouter.post("/logout", authController.logoutUser)

// Forget Password Routes
authRouter.get("/forgetPassword", authController.disForgetPassword)
authRouter.get("/otpEmail",verifyForgetPassword , authController.disOtpEmail)
authRouter.get("/resetPassword", verifyResetToken , authController.disResetPassword)
authRouter.post("/resetPassword", verifyResetToken , authController.resetPassword)

// Validationroutes
authRouter.post("/checkEmail", authController.checkEmail)
authRouter.post("/checkUserName", authController.checkUserName)

export default authRouter;