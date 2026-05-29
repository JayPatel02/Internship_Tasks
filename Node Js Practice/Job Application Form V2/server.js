const express = require("express")
const qs = require('qs')
const app = express()
const port = 2222

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const {getData,insertData,getAllData,getRecord,deleteRecord, updateRecord} = require("./db")

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/preLoadData",async (req,res)=>{
    let field = req.query.field 
    let option = req.query.option

    const data = await getData(field,option)

    res.send(data)
})

app.post("/submit", async (req,res)=>{
    let result = await insertData(req.body)
    res.redirect("/applicantsData")
})

app.get("/applicantsData",async (req,res)=>{
    let data = await getAllData()

    res.render("dataEntries" , {data:data})
})

app.get("/viewData/:id", async (req,res)=>{
    let id = req.params.id
    let { basData, eduData, compData, langData, techData, refData } = await getRecord(id)

    res.render("viewData", {
        basData:basData,
        eduData:eduData,
        compData:compData,
        langData:langData,
        techData:techData,
        refData:refData
    })
})

app.get("/updateData/:id", async (req,res)=>{
    let id = req.params.id
    let { basData, eduData, compData, langData, techData, refData } = await getRecord(id)

    res.render("updateData", {
        id:id,
        basData:basData,
        eduData:eduData,
        compData:compData,
        langData:langData,
        techData:techData,
        refData:refData
    })
})

app.post("/updateData/:id",async(req,res)=>{
    const id = req.params.id
    const field = req.query.field
    const data = qs.parse(req.body)

    let updatedData = await updateRecord(id,field,data)

    res.redirect(`/updateData/${id}`)
})

app.get("/deleteData/:id",async (req,res)=>{
    let id = req.params.id
    let deletedData = await deleteRecord(id)

    res.redirect("/applicantsData")
})

app.listen(port,()=>{
    console.log("Server Started.........")
})