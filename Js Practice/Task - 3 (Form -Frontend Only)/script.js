const eduTbl = document.getElementById("educationTbl")
const addEdu = document.getElementById("addEdu")
const deleteEdu = document.getElementById("deleteEdu")

const addComp = document.getElementById("addComp")
const deleteComp = document.getElementById("deleteComp")
const compTbl = document.getElementById("compTbl")

const langKnownTbl = document.getElementById("langKnownTbl")
const techKnownTbl = document.getElementById("techKnownTbl")

let eduCounter = 0
let compCounter = 0

const langKnown = ["Hindi" , "Gujarati" , "English" ]
const techKnown = ["PHP","React","Python","Java"]

addEdu.addEventListener('click',(e)=>{
    e.preventDefault()
    const row = document.createElement("tr")
    row.innerHTML=`<td style="padding: 0;">
    <input type="text" name="education[${eduCounter}][course]" id='education[${eduCounter}][course]' class='educlass'>
    <small class="error">Enter valid Course Name</small>
    </td>
    <td style="padding: 0;">
    <input type="text" name="education[${eduCounter}][passingYear]" minlength="4" maxlength="4">
    <small class="error">Enter valid Passing Year</small>
    </td>
    <td style="padding: 0;">
    <input type="text" name="education[${eduCounter}][uni/bod]">
    <small class="error">Enter valid University Name</small>
    </td>
    <td style="padding: 0;">
    <input type="text" name="education[${eduCounter}][result]" maxlength="4" >
    <small class="error">Enter valid Result</small>
    </td>
    `
    
    eduTbl.appendChild(row)
    eduCounter++;
    
})

deleteEdu.addEventListener('click',(e)=>{
    let lastrow = eduTbl.lastElementChild
    
    if(lastrow.tagName != "TBODY"){
        eduTbl.removeChild(lastrow)
        if(eduCounter > 0){
            eduCounter--
        }
    }
})

addComp.addEventListener('click',(e)=>{
    e.preventDefault()

    let row = document.createElement("tr")

    row.innerHTML=`<td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][company]" class="compclass" >
                        <small class="error">Enter valid Company Name</small>
                    </td>
                    <td style="padding: 0;">
                        <input type="date" name="company[${compCounter}][fromDate]">
                        <small class="error">Enter valid From Date</small>
                    </td>
                    <td style="padding: 0;">
                        <input type="date" name="company[${compCounter}][toDate]">
                        <small class="error">Enter valid To Date</small>
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][annualPackage]">
                        <small class="error">Enter valid Annual Package</small>
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][reasonToLeave]">
                        <small class="error">Enter valid Input</small>
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][refContNumber]">
                        <small class="error">Enter valid Number</small>
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][refContName]">
                        <small class="error">Enter valid Name</small>
                    </td>`

    compTbl.appendChild(row)
})

deleteComp.addEventListener('click',(e)=>{
    e.preventDefault()

    let lastRow = compTbl.lastElementChild
    if(lastRow.tagName != "TBODY"){
        compTbl.removeChild(lastRow)
        if(compCounter > 0){
            compCounter--
        }
    }
})

langKnown.forEach( ele =>{
    let row = document.createElement("tr")

    row.innerHTML=`<td><input type="checkbox" name="lang[${ele}]" value="${ele}" class="langTitle" ">${ele}
    <small class="error">Atleast select one ability</small>
    </td>
                   <td><input type="checkbox" name="${ele}_read" value="${ele}_read" disabled>Read</td>
                   <td><input type="checkbox" name="${ele}_write" value="${ele}_write" disabled>Write</td>
                   <td><input type="checkbox" name="${ele}_speak" value="${ele}_speak" disabled>Speak</td>`

    langKnownTbl.appendChild(row)
})

techKnown.forEach( ele => {
    let row = document.createElement("tr")

    row.innerHTML=`<td><input type="checkbox" name="${ele}" value="${ele}">${ele}
    <small class="error">Atleast select one ability</small>
    </td>
                   <td><input type="radio" name="${ele}_skill" value="${ele}_beginner" disabled>Beginner</td>
                   <td><input type="radio" name="${ele}_skill" value="${ele}_intermediate" disabled>Intermediate</td>
                   <td><input type="radio" name="${ele}_skill" value="${ele}_expert" disabled>Expert</td>`
    techKnownTbl.appendChild(row)
})