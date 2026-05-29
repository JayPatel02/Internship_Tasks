require("dotenv").config()

const express = require("express")
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.static("public"))

const {getData , getTotalRows} = require("./db")

app.get("/",async (req,res)=>{

    const page = parseInt(req.query.page) || 1
    const sortBy = req.query.sortBy || "student_id"
    const sortOrder = req.query.sortOrder || "ASC"

    const rows = await getData(page,sortBy,sortOrder)
    const totalPage = 100

    res.render("index",{
        rows:rows,
        previousPage: page - 1,
        currentPage : page,
        nextPage : page + 1,
        totalPage : totalPage,
        sortBy:sortBy,
        sortOrder:sortOrder
    })
})

// app.use("/",(req,res)=>{

//     const page = parseInt(req.query.page) || 1
//     const totalPage = 100

//     res.render("incIndex",{
//         currentPage: page,
//         totalPage:totalPage
//     })
// })

app.listen(port,()=>{
    console.log("Server Started")
})