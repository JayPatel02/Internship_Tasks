const express = require('express')
const app = express()
const multer = require("multer")
const fs = require("fs").promises
const path = require("path")

const port = 1111;

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null,file.fieldname + '-' +  uniqueSuffix + ext)
    }
})
const upload = multer({ storage })

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get("/", async(req, res) => {
    res.render("index")
})

app.get("/list",async(req,res)=>{
    let data = await fs.readFile('data.csv', 'utf-8')
    data = data.split("\n")
    res.render("list", {data:data})
})

app.post("/submit", upload.single('profilePic'), async (req, res) => {
    let data = await fs.readFile('data.csv', 'utf-8')
    data = data.split("\n")
    if (data.length > 1) {
        const currDate = new Date()
        let newIdx = parseInt(data[data.length - 1].split(",")[0]) + 1
        const entry = `\n${newIdx},${req.body.userName},${req.file.path},${currDate.toISOString()}`
        await fs.appendFile('data.csv', entry, 'utf-8')
    } else {
        const currDate = new Date()
        const entry = `\n1,${req.body.userName},${req.file.path},${currDate.toISOString()}`
        await fs.appendFile('data.csv', entry, 'utf-8')
    }
    res.redirect("/list")
})

app.get("/delete/:id",async (req,res)=>{
    let id = req.params.id
    let data = await fs.readFile("data.csv","utf-8")
    data = data.split("\n")

    let deletedRow = data.find(row => row.split(",")[0] === id ) 
    
    deletedRow = deletedRow.split(",")
    let url = deletedRow[2]
    
    let result = data.filter((row) => row.split(",")[0] != id)

    await fs.unlink(url)

    await fs.writeFile('data.csv', result.join('\n') , "utf-8")

    res.redirect("/list")
})

app.get("/update/:id" , async(req,res)=>{
    const id = req.params.id
    let data = await fs.readFile('data.csv', 'utf-8')
    data = data.split("\n")
    let result = data.filter((row) => row.split(",")[0] == id)
    let d = result[0].split(",")

    res.render("update",{data: d})
})

app.post("/update/:id",upload.single("profilePic"),async (req,res)=>{
    let id  = parseInt(req.params.id)
    const {userName} = req.body
    const url = req.file ? req.file.path : undefined
    
    let data = await fs.readFile('data.csv','utf-8')
    data = data.split("\n")
    
    let currentRow = data.find(d => d.split(",")[0] == id)

    let oldName = currentRow.split(",")[1]
    let oldUrl = currentRow.split(",")[2]

    let crrIdx = data.findIndex(d => d.split(",")[0] == id )

    const currDate = new Date()

    data[crrIdx] = `${id},${userName ? userName : oldName},${url ? url : oldUrl},${currDate.toISOString()}`

    let insertData = data.map(ele => ele).join("\n")

    if(url){
        await fs.unlink(oldUrl)
    }

    await fs.writeFile("data.csv" , insertData , "utf-8")

    res.redirect("/list")
})

app.listen(port, () => {
    console.log("Server Started")
})