import express from "express";
import router from "./Router/router.js"
import * as path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // for modulejs 
const __dirname = path.dirname(__filename);

const app = express()
const port: Number = 3001

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"../src/views")) // give the absolute path 
app.use(express.urlencoded({ extended: true }))

app.use("/", router)

app.listen(port,()=>{
  console.log("Server Started")
})