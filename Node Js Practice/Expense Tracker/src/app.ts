import express, { urlencoded } from "express"
import router from "./Router/route"

const app = express()
const port = 3002

app.set("view engine","ejs")
app.set("views","./src/views")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/", router)

app.listen(port,()=>{
    console.log("Server Started")
})