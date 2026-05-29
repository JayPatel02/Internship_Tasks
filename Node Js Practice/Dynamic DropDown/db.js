const mysql = require("mysql2/promise")

async function getCountries(){
    const con = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"dyn_location"
    })

    let query = `select * from country`

    let [result] = await con.query(query)

    con.end()

    return result
}

async function getStates(id){
    const con = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"dyn_location"
    })
    let query = `select * from states where country_id=${id}`

    let [result] = await con.query(query)
    
    con.end()
    
    return result
}

async function getCities(id){
    const con = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"dyn_location"
    })
    let query = `select * from citys where state_id=${id}`

    let [result] = await con.query(query)
    
    con.end()
    
    return result
}

module.exports =  {getCountries , getStates, getCities}