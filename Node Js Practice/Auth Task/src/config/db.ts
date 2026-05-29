import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"auth_cap_task"
})

export default pool