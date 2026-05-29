const mysql = require("mysql2/promise")

async function getData(page, sortBy , sortOrder){
    const con = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'students'
    })

    let limit = process.env.RECORDSPERROW

    let offset = (page-1)*limit

    let query

    if(sortBy == "fullName"){
        query = `SELECT * FROM student_info ORDER BY firstName ${sortOrder} LIMIT ${limit} OFFSET ${offset}`
    }else{
        query = `SELECT * FROM student_info ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`
    }
    const [rows] = await con.query(query)

    await con.end()

    return rows
}

async function getTotalRows(){
    const con = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'students'
    })

    const [rowCount] = await con.query('SELECT COUNT(*) as count FROM student_info')

    await con.end()

    return rowCount[0].count
}

module.exports = {getData,getTotalRows}