const mysql = require("mysql2/promise")

async function insertData(data) {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_applications'
    })

    try {
        await con.beginTransaction()

        const basicQuery = `
        INSERT INTO applicants_information (
        first_name, last_name, email, designation, phone_number,address1, address2, city, state, pincode,relationship_status, date_of_birth,gender,preferedCity1, preferedCity2, preferedCity3,notice_period,expected_ctc, current_ctc,department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)
        `;

            if (Array.isArray(data.peferedLoc)) {
                var peferedLoc1 = data.peferedLoc[0];
                var peferedLoc2 = data.peferedLoc[1];
                var peferedLoc3 = data.peferedLoc[2];
            } else {
                var peferedLoc1 = data.peferedLoc
                var peferedLoc2 = ""
                var peferedLoc3 = ""
            }

            const values = [
                data.firstName,
                data.lastName,
                data.email,
                data.designation,
                data.phoneNumber,
                data.address1,
                data.address2 ?? "",
                data.cityName,
                data.stateNames,
                data.pinCode,
                data.relationshipDrop,
                data.dateOfBirth,
                data.gender,
                peferedLoc1,
                peferedLoc2,
                peferedLoc3,
                data.noticePeriod === "" ? 0 : data.noticePeriod,
                data.expactedCtc,
                data.currentCtc,
                data.departmentName
            ];

            const basicData = await con.query(basicQuery, values, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log({ result })
                }
            })
            console.log("Basic table enrtires Done .....")
            const previousIdOb = await con.query('SELECT LAST_INSERT_ID() as lastId')

            const previousId = previousIdOb[0][0].lastId

            // ---------------------------Education Query-------------------------------------
            const eduArr = Array.isArray(data.education) ? data.education : Array(data.education);
            if (eduArr.length > 0) {
                eduArr.forEach(async (ele) => {
                    let eduQuery = `INSERT INTO education_details (applicant_id,course_name,passing_year,university_board ,result) VALUES (${previousId} , '${ele.course}' , '${ele.passingYear}','${ele.uniBod}','${ele.result}')`

                    await con.query(eduQuery)
                    console.log("Education Entries Done ....")
                });
            }

            // ---------------------------Company Query----------------------------------------
            const comArr = Array.isArray(data.company) ? data.company : Array(data.company);
            if (comArr.length > 0) {
                comArr.forEach(async (ele) => {
                    let comQuery = `INSERT INTO work_experience (applicant_id,company_name,from_date,to_date,annual_package,reason_to_leave,ref_contact_number,ref_contact_name ) VALUES (${previousId} , '${ele.company}', '${ele.fromDate}','${ele.toDate}','${ele.annualPackage}','${ele.reasonToLeave}','${ele.refContNumber}','${ele.refContName}')`

                    await con.query(comQuery)
                    console.log("Education Entries Done ....")
                });
            }

            // ---------------------------Lang----------------------------------------
            const langData = data.lang
            let langArr = Object.entries(langData)

            for (let i = 0; i < langArr.length; i++) {
                const langTitle = langArr[i][0]
                let [getTitleId] = await con.query(`SELECT lang_id FROM lang_master WHERE lang_name='${langTitle}'`)
                let langId = getTitleId[0].lang_id
                const langDetails = langArr[i][1]

                const query = `INSERT INTO language_known (applicant_id,lang_id, can_read, can_write, can_speak) VALUES ( ?, ?, ?, ?, ?)`;

                const values = [
                    previousId,
                    langId,
                    langDetails.read ? 1 : 0,
                    langDetails.write ? 1 : 0,
                    langDetails.speak ? 1 : 0
                ];

                await con.query(query, values);
            }
            console.log("Lang entries done")


            // ---------------------------Tech-----------------------------------------------
            const techData = data.tech
            const techArr = Object.entries(techData)

            for (let i = 0; i < techArr.length; i++) {
                const techTitle = techArr[i][0]
                const [techTileOb] = await con.query(`SELECT tech_id FROM tech_master WHERE tech_name="${techTitle}"`)
                const techId = techTileOb[0].tech_id
                const techDetails = techArr[i][1]

                let query;
                if (techDetails.level == "beginner") {
                    query = `INSERT INTO tech_known (applicant_id,tech_id,is_beginner) VALUES (${previousId},${techId},1)`;
                    await con.query(query)
                } else if (techDetails.level == 'intermediate') {
                    query = `INSERT INTO tech_known (applicant_id,tech_id,is_intermediate) VALUES (${previousId},${techId},1)`;
                    await con.query(query)
                } else if (techDetails.level == 'expert') {
                    query = `INSERT INTO tech_known (applicant_id,tech_id,is_expert) VALUES (${previousId},${techId},1)`;
                    await con.query(query)
                }
            }
            console.log("tech entry done")

            // ----------------------------------------Ref Contact--------------------------------------

            if (!(data.refName1 == "")) {
                query = `INSERT INTO reference_contact (applicant_id,ref_name,ref_contact_number,ref_relation) VALUES (?,?,?,?)`

                const values = [
                    previousId,
                    data.refName1 ?? "",
                    data.refContNum1 ?? "",
                    data.refRelation1 ?? ""
                ]

                await con.query(query, values, (error, result) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }
            if (!(data.refName2 == "")) {
                query = `INSERT INTO reference_contact (applicant_id,ref_name,ref_contact_number,ref_relation) VALUES (1,?,?,?)`

                const values = [
                    data.refName1 ?? "",
                    data.refContNum1 ?? "",
                    data.refRelation1 ?? ""
                ]

                await con.query(query, values, (error, result) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }

        console.log("Reference Entries Done ......")

        con.commit()
    }catch(error){
        console.log(error)
        console.log("Due Some Error Db has been rollback")
        con.rollback()
    }

    con.end()
}

async function getLangNames() {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_applications'
    })

    const query = `SELECT lang_id,lang_name FROM lang_master`

    const [langNameOb] = await con.query(query)

    let langNames = new Array;
    let langIds = new Array;
    langNameOb.forEach(ele => { langIds.push(ele.lang_id); langNames.push(ele.lang_name) })

    con.end()

    return { langIds, langNames }
}

async function getTechNames() {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_applications'
    })

    const query = `SELECT tech_id,tech_name FROM tech_master`

    const [techNameOb] = await con.query(query)

    let techNames = new Array;
    let techIds = new Array;
    techNameOb.forEach(ele => { techIds.push(ele.tech_id); techNames.push(ele.tech_name) })

    con.end()
    return { techIds, techNames }
}

async function getApplicants(page) {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: "root",
        password: "root",
        database: "job_applications"
    })

    const offSet = (page - 1) * 50
    const allRecordsQ = `SELECT * FROM applicants_information LIMIT 50 OFFSET ${offSet}`;

    const [allRecords] = await con.query(allRecordsQ)

    return allRecords
}

async function getTotalRows() {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: "root",
        password: "root",
        database: "job_applications"
    })

    const query = "SELECT COUNT(*) as count FROM applicants_information"

    const [totalRows] = await con.query(query)

    await con.end()

    return totalRows[0].count
}

async function getInsertedData(id) {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: "root",
        password: "root",
        database: "job_applications"
    })

    const basQuery = `select * from applicants_information where applicant_id=${id}`
    let [[basData]] = await con.query(basQuery)

    const eduQuery = `select * from education_details where applicant_id=${id}`
    let [eduData] = await con.query(eduQuery)

    const compQuery = `select * from work_experience where applicant_id=${id}`
    let [compData] = await con.query(compQuery)

    const langQuery = `select * from language_known where applicant_id=${id}`
    let [langData] = await con.query(langQuery)

    const techQuery = `select * from tech_known where applicant_id=${id}`
    let [techData] = await con.query(techQuery)

    const refQuery = `select * from reference_contact where applicant_id=${id}`
    let [refData] = await con.query(refQuery)

    return { basData, eduData, compData, langData, techData, refData }
}

async function updateData(updateId, data) {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_applications'
    })

    try {
        await con.beginTransaction()

        const updateQ = `UPDATE applicants_information set first_name = ?, last_name = ?, email = ?, designation = ?, phone_number = ?,address1 = ?, address2 = ?, city = ?, state = ?, pincode = ?,relationship_status = ?, date_of_birth = ?,gender = ?,preferedCity1 = ?, preferedCity2 = ?, preferedCity3 = ?,notice_period = ?,expected_ctc = ?, current_ctc = ?,department = ? WHERE applicant_id = ?`

        if (Array.isArray(data.peferedLoc)) {
            var peferedLoc1 = data.peferedLoc[0];
            var peferedLoc2 = data.peferedLoc[1];
            var peferedLoc3 = data.peferedLoc[2];
        } else {
            var peferedLoc1 = data.peferedLoc
            var peferedLoc2 = ""
            var peferedLoc3 = ""
        }

        const values = [
            data.firstName,
            data.lastName,
            data.email,
            data.designation,
            data.phoneNumber,
            data.address1,
            data.address2 ?? "",
            data.cityName,
            data.stateNames,
            data.pinCode,
            data.relationshipDrop,
            data.dateOfBirth,
            data.gender,
            peferedLoc1,
            peferedLoc2,
            peferedLoc3,
            data.noticePeriod === "" ? 0 : data.noticePeriod,
            data.expactedCtc,
            data.currentCtc,
            data.departmentName,
            updateId
        ];

        const updatedBasic = await con.query(updateQ, values, (err, result) => {
            if (err) {
                console.log(err)
            }
        })

        console.log("Basic table Updated.....")

        const previousId = updateId

        // -----------------------Education---------------------------------------------------

        const eduDeleteQ = await con.query(`delete from education_details where applicant_id = ?`, [previousId])
        const eduArr = data.education;
        eduArr.forEach(async (ele) => {
            let eduQuery = `INSERT INTO education_details (applicant_id,course_name,passing_year,university_board ,result) VALUES (${previousId} , '${ele.course}' , '${ele.passingYear}','${ele.uniBod}','${ele.result}')`

            await con.query(eduQuery)
            console.log("Education Entries Done ....")
        });

        // ---------------------------Work EXP --------------------------------------------------------------
        const compDeleteQ = await con.query(`delete from work_experience where applicant_id = ?`, [previousId])
        const comArr = data.company
        comArr.forEach(async (ele) => {
            let comQuery = `INSERT INTO work_experience (applicant_id,company_name,from_date,to_date,annual_package,reason_to_leave,ref_contact_number,ref_contact_name ) VALUES (${previousId} , '${ele.company}', '${ele.fromDate}','${ele.toDate}','${ele.annualPackage}','${ele.reasonToLeave}','${ele.refContNumber}','${ele.refContName}')`

            await con.query(comQuery)
            console.log("Company Entries Done ....")
        });

        // ---------------------------Lang----------------------------------------
        const langData = data.lang
        if (!(langData == null)) {
            const langDeleteQ = await con.query(`delete from language_known where applicant_id = ?`, [previousId])

            let langArr = Object.entries(langData)

            for (let i = 0; i < langArr.length; i++) {
                const langTitle = langArr[i][0]
                let [getTitleId] = await con.query(`SELECT lang_id FROM lang_master WHERE lang_name='${langTitle}'`)
                let langId = getTitleId[0].lang_id
                const langDetails = langArr[i][1]

                const query = `INSERT INTO language_known (applicant_id,lang_id, can_read, can_write, can_speak) VALUES ( ?, ?, ?, ?, ?)`;

                const values = [
                    previousId,
                    langId,
                    langDetails.read ? 1 : 0,
                    langDetails.write ? 1 : 0,
                    langDetails.speak ? 1 : 0
                ];

                await con.query(query, values);
            }
            console.log("Lang entries done")
        }

        // ---------------------------Tech-----------------------------------------------
        const techData = data.tech
        if (!(techData == null)) {
            const techDeleteQ = await con.query(`delete from tech_known where applicant_id = ?`, [previousId])

            const techArr = Object.entries(techData)

            for (let i = 0; i < techArr.length; i++) {
                const techTitle = techArr[i][0]
                const [techTileOb] = await con.query(`SELECT tech_id FROM tech_master WHERE tech_name="${techTitle}"`)
                const techId = techTileOb[0].tech_id
                const techDetails = techArr[i][1]

                let query;
                if (techDetails.level == "beginner") {
                    query = `INSERT INTO tech_known (applicant_id,tech_id,is_beginner) VALUES (${previousId},${techId},1)`;
                    await con.query(query)
                } else if (techDetails.level == 'intermediate') {
                    query = `INSERT INTO tech_known (applicant_id,tech_id,is_intermediate) VALUES (${previousId},${techId},1)`;
                    await con.query(query)
                } else if (techDetails.level == 'expert') {
                    query = `INSERT INTO tech_known (applicant_id,tech_id,is_expert) VALUES (${previousId},${techId},1)`;
                    await con.query(query)
                }
            }
            console.log("tech entry done")
        }

        // -------------------------REF Update---------------------------------
        const refDeleteQ = await con.query(`delete from reference_contact where applicant_id=${previousId}`)

        if (!(data.refName1 == "")) {
            query = `INSERT INTO reference_contact (applicant_id,ref_name,ref_contact_number,ref_relation) VALUES (?,?,?,?)`

            const values = [
                previousId,
                data.refName1 ?? "",
                data.refContNum1 ?? "",
                data.refRelation1 ?? ""
            ]

            await con.query(query, values, (error, result) => {
                if (error) {
                    console.log(error)
                }
            })
        }
        if (!(data.refName2 == "")) {
            query = `INSERT INTO reference_contact (applicant_id,ref_name,ref_contact_number,ref_relation) VALUES (1,?,?,?)`

            const values = [
                data.refName1 ?? "",
                data.refContNum1 ?? "",
                data.refRelation1 ?? ""
            ]

            await con.query(query, values, (error, result) => {
                if (error) {
                    console.log(error)
                }
            })
        }

        console.log("Reference Entries Done ......")
        con.commit()
    } catch (error) {
        console.log(error)
        con.rollback()
    }

}

async function deleteData(deleteId) {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'job_applications'
    })

    await con.query(`delete from applicants_information where applicant_id=${deleteId}`)

    con.end()
}

module.exports = { insertData, getLangNames, getTechNames, getApplicants, getTotalRows, getInsertedData, updateData, deleteData }