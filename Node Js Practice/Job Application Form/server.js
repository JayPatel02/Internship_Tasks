const express = require("express")
const app = express()
const port = 4554

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

const {insertData, getLangNames, getTechNames ,getApplicants, getTotalRows , getInsertedData , updateData, deleteData} = require("./database")
const {basicVal , eduVal, compVal , langVal, techVal, refVal} = require("./serverValidation")

app.get("/", async (req, res) => {
    const {langIds,langNames} = await getLangNames()
    const {techIds,techNames} = await getTechNames()

    res.render("index" , {
        langKnown:langNames,
        techKnown:techNames
    })
})

app.post("/submit",basicVal,eduVal,compVal,langVal,techVal, refVal,(req, res) => {
    const data = req.body
    console.log(data)
    insertData(data)

    res.redirect("/applicantsData")
})

app.get("/applicantsData",async (req,res)=>{
    const page = parseInt(req.query.page) || 1;

    const rows = await getApplicants(page)
    let totalRows = await getTotalRows()
    const rowPerPage = 50

    const totalPage = Math.ceil(totalRows / rowPerPage)
    res.render("dataEntries",{
        currentPage: page,
        totalPage : totalPage,
        rows:rows
    })
})

app.get("/updateData", async(req,res)=>{
    const id = parseInt(req.query.update)
    const {langIds,langNames} = await getLangNames()
    const {techIds,techNames} = await getTechNames()
    const {basData , eduData, compData, langData , techData ,refData} = await getInsertedData(id)

    res.render("updateFrom",{
        id:id,
        basData:basData,
        eduData:eduData,
        compData:compData,
        langData:langData,
        techData:techData,
        refData:refData,
        langNames:langNames,
        langIds:langIds,
        techNames:techNames,
        techIds:techIds
    })
})

app.get("/view/:id",async (req,res)=>{
    const id = parseInt(req.params.id)
    const {langIds,langNames} = await getLangNames()
    const {techIds,techNames} = await getTechNames()
    const {basData , eduData, compData, langData , techData ,refData} = await getInsertedData(id)

    res.render("viewData",{
        id:id,
        basData:basData,
        eduData:eduData,
        compData:compData,
        langData:langData,
        techData:techData,
        refData:refData,
        langNames:langNames,
        langIds:langIds,
        techNames:techNames,
        techIds:techIds
    })
})

app.post("/update/:id",basicVal,eduVal,compVal,langVal,techVal, refVal,async(req,res)=>{
    const id = parseInt(req.params.id)
    const data = req.body

    const updatedData = await updateData(id,data)

    res.redirect("/applicantsData")
})

app.get("/delete/:id",async(req,res)=>{
    const id = parseInt(req.params.id)
    const deletedData = await deleteData(id)
    res.redirect("/applicantsData")
})

app.listen(port, () => {
    console.log("Server Started...")
})