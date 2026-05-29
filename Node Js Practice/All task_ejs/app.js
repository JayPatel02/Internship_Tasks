const express = require("express")
const path = require("node:path")
const app = express()

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))

app.get("/",(req,res)=>{
    res.render("app")
})

app.get("/Task1",(req,res)=>{
    res.render("task1")
})

app.get("/Task2",(req,res)=>{
    res.render("task2")
})

app.get("/Task3",(req,res)=>{
    res.render("task3")
})

app.get("/Task4",(req,res)=>{
    res.render("task4")
})



app.listen(3000,()=>{
    console.log("Server is running on 3000")
})