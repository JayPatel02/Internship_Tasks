import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRouter from './router/authenticationRoutes';
import session from 'express-session';
import userRouter from './router/userRoutes';
import errorHandler from './middleware/errorHandling';
dotenv.config();

const app = express();
const PORT = process.env.PORTN || 3000 ;

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET || "session_secret",
    resave: false,
    saveUninitialized:false,
    cookie: {
        secure:false
    }
}))


app.use('/', authRouter);
app.use("/user" , userRouter)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});