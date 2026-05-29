const mysql = require("mysql2/promise")

async function getData(page,sortBy,sortOrder) {

    let recordPerPage = process.env.RECORDPERPAGE

    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'students'
    })

    const offSet = (page-1)*recordPerPage
    
    let query

    if(sortBy == "fullName"){
        query = `SELECT * FROM student_info ORDER BY firstName ${sortOrder} LIMIT ${recordPerPage} OFFSET ${offSet}`
    }else{
        query = `SELECT * FROM student_info ORDER BY ${sortBy} ${sortOrder} LIMIT ${recordPerPage} OFFSET ${offSet}`
    }
    
    let [result] = await con.query(query)

    await con.end()

    return result
}

async function getTotalRows(){
    const con = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'students'
    })

    const query = "SELECT COUNT(*) as count FROM student_info"

    const [totalRows] = await con.query(query)

    await con.end()

    return totalRows[0].count 
}

async function updateData(saveId,newFn,newLn){
    const con = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'students'
    })

    const query = `UPDATE student_info SET firstName="${newFn}",lastName="${newLn}" WHERE student_id=${saveId}`

    const [updatedRecord] = await con.query(query)

    await con.end()

    return updatedRecord.affectedRows
}

async function deleteData(delete_id){
    const con = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'students'
    })

    const query = `DELETE FROM student_info WHERE student_id=${delete_id}`

    const [deletedRecord] = await con.query(query)

    await con.end()

    return deletedRecord.affectedRows 
}

async function searchData(page,sortBy,sortOrder,queryArr,condition){
    let recordPerPage = process.env.RECORDPERPAGE

    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'students'
    })

    const offSet = (page-1)*recordPerPage
    
    let whereClause = ""

    queryArr.forEach( (ele,i) => {
        if(!(ele.param == "")){
            if(i == queryArr.length-1){
                whereClause += " " + ele.column + ` like '${ele.param.trim()}%'`
            }else{
                whereClause += " " + ele.column + ` like '${ele.param.trim()}%' ${condition}`
            }
        }
    });

    if(!(whereClause == "")){
        // let query = `select * from student_info where ${whereClause}`
        let query = ""
        if(sortBy == "fullName"){
            query = `select * from student_info where ${whereClause} ORDER BY firstName ${sortOrder} LIMIT ${recordPerPage} OFFSET ${offSet}`
        }else{
            query = `select * from student_info where ${whereClause} ORDER BY ${sortBy} ${sortOrder} LIMIT ${recordPerPage} OFFSET ${offSet}`
        }

        let [result] = await con.query(query)
    
        await con.end()
        
        if( result.length == 0 ){
            return null
        }else{
            return result
        }

    }else{
        await con.end()

        return null
    }
}

async function getUpdateCount(queryArr,condition) {
    let recordPerPage = process.env.RECORDPERPAGE

    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'students'
    })
    
    let whereClause = ""

    queryArr.forEach( (ele,i) => {
        if(!(ele.param == "")){
            if(i == queryArr.length-1){
                whereClause += " " + ele.column + ` like '${ele.param.trim()}%'`
            }else{
                whereClause += " " + ele.column + ` like '${ele.param.trim()}%' ${condition}`
            }
        }
    });

    if(!(whereClause == "")){
        
        let totalRecQ = `select count(*) as count from student_info where ${whereClause}`
        let [totalRec] = await con.query(totalRecQ)

        let totalCount = totalRec[0].count
    
        await con.end()
        
        return totalCount
    }
}

module.exports = {getData , getTotalRows , updateData , deleteData ,searchData, getUpdateCount}