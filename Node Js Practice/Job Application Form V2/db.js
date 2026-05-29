const mysql = require("mysql2/promise");

async function getData(field, option = "") {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_applications_v2",
  });
  let selectMasQ = `select * from select_master where field_name="${field}"`;

  let [[selectData]] = await con.query(selectMasQ);
  let selectID = selectData.select_id;
  let optionMasQ = "";
  // let optionData = "";

  if (option == "") {
    optionMasQ = `select option_value,option_label from option_master where select_id=${selectID} and option_label != "lang_option" and option_label != "tech_option"`;
    var [optionData] = await con.query(optionMasQ);
  } else {
    optionMasQ = `select option_value,option_label from option_master where select_id=${selectID} and option_label="${option}"`;

    var [optionData] = await con.query(optionMasQ);
  }

  let fieldName = selectData.field_name;
  let tagName = selectData.tag_name;

  return { fieldName, tagName, optionData };
}

async function insertData(data) {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_applications_v2",
  });

  try {
    con.beginTransaction();

    let insertQuery = `insert into applicants_information_v2 (first_name,last_name,email,designation,phone_number,address1,address2,city,state,pincode,relationship_status,date_of_birth,gender,preferedCity1,preferedCity2,preferedCity3,notice_period,expected_ctc,current_ctc,department) 
        values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    if (Array.isArray(data.peferedLoc)) {
      var peferedLoc1 = data.peferedLoc[0];
      var peferedLoc2 = data.peferedLoc[1] || "";
      var peferedLoc3 = data.peferedLoc[2] || "";
    } else {
      var peferedLoc1 = data.peferedLoc;
      var peferedLoc2 = "";
      var peferedLoc3 = "";
    }

    let values = [
      data.firstName,
      data.lastName,
      data.email,
      data.designation,
      data.phoneNumber,
      data.address1,
      data.address2,
      data.cityName,
      data.State,
      data.pinCode,
      data.Relationship,
      data.dateOfBirth,
      data.Gender,
      peferedLoc1,
      peferedLoc2,
      peferedLoc3,
      data.noticePeriod === "" ? 0 : data.noticePeriod,
      data.expactedCtc,
      data.currentCtc,
      data.Departments,
    ];

    let [result] = await con.query(insertQuery, values);
    const lastID = result.insertId;

    if (Array.isArray(data.education)) {
      data.education.forEach(async (element) => {
        let eduQuery = `insert into  education_details_v2 (applicant_id,course_name,passing_year,university_board,result) 
            values ( ${lastID} ,"${element.course}","${element.passingYear}","${element.uniBod}","${element.result}")`;

        let insRes = await con.query(eduQuery);
        console.log("Edu data entered");
      });
    }

    if (Array.isArray(data.company)) {
      data.company.forEach(async (ele) => {
        let compQuery = `insert into work_experience_v2 (applicant_id,company_name,from_date,to_date,annual_package,reason_to_leave,ref_contact_number,ref_contact_name) 
            values (${lastID},"${ele.company}","${ele.fromDate}","${ele.toDate}","${ele.annualPackage}","${ele.reasonToLeave}","${ele.refContNumber}","${ele.refContName}")`;

        let insRes = await con.query(compQuery);
        console.log("Company Data entered");
      });
    }

    if (data.Lang) {
      for (let [langName, langValues] of Object.entries(data.Lang)) {
        let insLangQ = `insert into language_known_v2 (applicant_id,lang_name,can_read,can_write,can_speak) values(?,?,?,?,?)`;

        values = [
          lastID,
          langName,
          langValues.Read ? 1 : 0,
          langValues.Write ? 1 : 0,
          langValues.Speak ? 1 : 0,
        ];
        let langRes = await con.query(insLangQ, values);
      }
      console.log("Lang Inserted");
    }

    if (data.Tech) {
      for (let [techName, level] of Object.entries(data.Tech)) {
        let val = level.ability;

        let insTechQ = `insert into tech_known_v2 (applicant_id,tech_name,is_beginner,is_intermediate,is_expert) values (?,?,?,?,?)`;
        values = [
          lastID,
          techName,
          val == "Beginner" ? 1 : 0,
          val == "Intermediate" ? 1 : 0,
          val == "Expert" ? 1 : 0,
        ];

        let techRes = await con.query(insTechQ, values);
      }
      console.log("Techdata Enter");
    }

    data.reference.forEach(async (ref) => {
      if (ref.name != "") {
        let refQ = `insert into reference_contact_v2 (applicant_id,ref_name,ref_contact_number,ref_relation) VALUES (?,?,?,?)`;

        values = [
          lastID,
          ref.name,
          ref.number ? ref.number : "",
          ref.relation ? ref.relation : "",
        ];

        let refRes = await con.query(refQ, values);
        console.log("Data Insert in REF");
      }
    });

    con.commit();
  } catch (error) {
    console.log(error);
    con.rollback();
    console.log("Database rolled back.");
  }
  con.end();
}

async function getAllData() {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_applications_v2",
  });

  let query = `select applicant_id,first_name,last_name,email,designation,city from applicants_information_v2`;

  let [result] = await con.query(query);
  con.end();
  return result;
}

async function getRecord(id) {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_applications_v2",
  });

  const basQuery = `select * from applicants_information_v2 where applicant_id=${id}`;
  let [[basData]] = await con.query(basQuery);

  const eduQuery = `select * from education_details_v2 where applicant_id=${id}`;
  let [eduData] = await con.query(eduQuery);

  const compQuery = `select * from work_experience_v2 where applicant_id=${id}`;
  let [compData] = await con.query(compQuery);

  const langQuery = `select * from language_known_v2 where applicant_id=${id}`;
  let [langData] = await con.query(langQuery);

  const techQuery = `select * from tech_known_v2 where applicant_id=${id}`;
  let [techData] = await con.query(techQuery);

  const refQuery = `select * from reference_contact_v2 where applicant_id=${id}`;
  let [refData] = await con.query(refQuery);

  return { basData, eduData, compData, langData, techData, refData };
}

async function deleteRecord(id) {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_applications_v2",
  });

  let query = `delete from applicants_information_v2 where applicant_id=${id}`;

  let [result] = await con.query(query);

  con.end();
}

async function updateRecord(id, field, data) {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_applications_v2",
  });

  if (field == "basicDiv") {
    const updateQ = `UPDATE applicants_information_v2 set first_name = ?, last_name = ?, email = ?, designation = ?, phone_number = ?,address1 = ?, address2 = ?, city = ?, state = ?, pincode = ?,relationship_status = ?, date_of_birth = ?,gender = ?,preferedCity1 = ?, preferedCity2 = ?, preferedCity3 = ?,notice_period = ?,expected_ctc = ?, current_ctc = ?,department = ? WHERE applicant_id = ?`

    if (Array.isArray(data.peferedLoc)) {
      var peferedLoc1 = data.peferedLoc[0];
      var peferedLoc2 = data.peferedLoc[1] || "";
      var peferedLoc3 = data.peferedLoc[2] || "";
    } else {
      var peferedLoc1 = data.peferedLoc;
      var peferedLoc2 = "";
      var peferedLoc3 = "";
    }

    let values = [
      data.firstName,
      data.lastName,
      data.email,
      data.designation,
      data.phoneNumber,
      data.address1,
      data.address2,
      data.cityName,
      data.State,
      data.pinCode,
      data.Relationship,
      data.dateOfBirth,
      data.Gender,
      peferedLoc1,
      peferedLoc2,
      peferedLoc3,
      data.noticePeriod === "" ? 0 : data.noticePeriod,
      data.expactedCtc,
      data.currentCtc,
      data.Departments,
      id
    ];
    await con.query(updateQ, values)

  }
  else if (field == "eduDiv") {
    try {
      con.beginTransaction()
      if (Array.isArray(data.education)) {
        await deleteColumn(field, id)
        data.education.forEach(async (element) => {
          let eduQuery = `insert into  education_details_v2 (applicant_id,course_name,passing_year,university_board,result) 
              values ( ${id} ,"${element.course}","${element.passingYear}","${element.uniBod}","${element.result}")`;

          let insRes = await con.query(eduQuery);
        });
        console.log("Edu data Updated");
      }
      con.commit()
    } catch (error) {
      con.rollback()
      console.log("Data Rolled Back.")
    }
  }
  else if (field == "compDiv") {
    try {
      con.beginTransaction()
      if (Array.isArray(data.company)) {

        await deleteColumn(field, id)

        data.company.forEach(async (ele) => {
          let compQuery = `insert into work_experience_v2 (applicant_id,company_name,from_date,to_date,annual_package,reason_to_leave,ref_contact_number,ref_contact_name) 
              values (${id},"${ele.company}","${ele.fromDate}","${ele.toDate}","${ele.annualPackage}","${ele.reasonToLeave}","${ele.refContNumber}","${ele.refContName}")`;

          let insRes = await con.query(compQuery);
        });
        console.log("Company Data Updated");
      }
      con.commit()
    } catch (error) {
      con.rollback()
      console.log("Data Rolled Back.")
    }


  }
  else if (field == "langDiv") {
    try {
      con.beginTransaction()
      if (data.Lang) {
        await deleteColumn(field, id)

        for (let [langName, langValues] of Object.entries(data.Lang)) {
          let insLangQ = `insert into language_known_v2 (applicant_id,lang_name,can_read,can_write,can_speak) values(?,?,?,?,?)`;

          values = [
            id,
            langName,
            langValues.Read ? 1 : 0,
            langValues.Write ? 1 : 0,
            langValues.Speak ? 1 : 0,
          ];
          let langRes = await con.query(insLangQ, values);
        }
        console.log("Lang Updated");
      }
      con.commit()
    } catch (error) {
      con.rollback()
      console.log("Data Rolled Back.")
    }
  }
  else if (field == "techDiv") {
    try {
      con.beginTransaction()

      if (data.Tech) {
        await deleteColumn(field, id)
        for (let [techName, level] of Object.entries(data.Tech)) {
          let val = level.ability;

          let insTechQ = `insert into tech_known_v2 (applicant_id,tech_name,is_beginner,is_intermediate,is_expert) values (?,?,?,?,?)`;
          values = [
            id,
            techName,
            val == "Beginner" ? 1 : 0,
            val == "Intermediate" ? 1 : 0,
            val == "Expert" ? 1 : 0,
          ];

          let techRes = await con.query(insTechQ, values);
        }
        console.log("Techdata Updated");
      }
      con.commit()
    } catch (error) {
      con.rollback()
      console.log("Data Rolled Back.")
    }
  }
  else if (field == "refDiv") {
    try {
      con.beginTransaction()
      data.reference.forEach(async (ref) => {
        await deleteColumn(field, id)
        if (ref.name != "") {
          let refQ = `insert into reference_contact_v2 (applicant_id,ref_name,ref_contact_number,ref_relation) VALUES (?,?,?,?)`;

          values = [
            id,
            ref.name,
            ref.number ? ref.number : "",
            ref.relation ? ref.relation : "",
          ];

          let refRes = await con.query(refQ, values);
          console.log("Data Insert in REF");
        }
      });
      con.commit()
    } catch (error) {
      con.rollback()
      console.log("Database Rolled Back.")
    }
  }
}

async function deleteColumn(field, id) {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "job_applications_v2",
  });

  let getColumn = {
    "eduDiv": "education_details_v2",
    "compDiv": "work_experience_v2",
    "langDiv": "language_known_v2",
    "techDiv": "tech_known_v2",
    "refDiv": "reference_contact_v2"
  }
  let col = getColumn[field]
  let q = `delete from ${col} where applicant_id = ${id}`
  await con.query(q)
}


module.exports = { getData, insertData, getAllData, getRecord, deleteRecord, updateRecord };