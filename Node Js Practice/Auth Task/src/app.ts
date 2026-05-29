import express from "express"
import path from "path"
import router from "./Router/route"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import session from "express-session"
import adminRouter from "./Router/adminRouter"
import morganMiddleware from "./services/morganServices"

dotenv.config()

const app = express()
const port = 3003

app.use(morganMiddleware)
app.use(session({
    secret: "session scret",
    resave: false,
    saveUninitialized:false,
    cookie: {
        secure:false,
        maxAge: 1000 * 60 * 10
    }
}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", router)
app.use("/admin", adminRouter)

app.listen(port, () => {                                                  
    console.log("Server Started")
})