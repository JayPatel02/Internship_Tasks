const express = require("express")
const app = express()
const port = 1111

app.set("view engine","ejs")
app.use(express.json())

const {getCountries , getStates , getCities} = require("./db")

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/countries",async (req,res)=>{
    let countries  = await getCountries()
    res.send(countries)
})

app.get("/state/:id", async(req,res)=>{
    let states = await getStates(req.params.id)
    res.send(states)
})

app.get("/cities/:id", async(req,res)=>{
    let cities = await getCities(req.params.id)
    res.send(cities)
})

app.listen(port,()=>{
    console.log("Server started")
})