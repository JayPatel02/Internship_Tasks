const eduTbl = document.getElementById("Edutbl")
const addEdu = document.getElementById("addEdu")
const compTbl = document.getElementById("Comptbl")
const addComp = document.getElementById("addComp")

let eduCounter = 0
let compCounter = 0

async function getCourses( pre = "" ){
    const res = await fetch(`/preLoadData?field=Courses`)
    const data = await res.json()
    
    let options = data.optionData.map( ele =>{
        if(pre != ""){
            return `<option value=${ele.option_value}  ${ele.option_value== pre.course_name? "selected" : ""} >${ele.option_label}</option>`
        }else{
            return `<option value=${ele.option_value}>${ele.option_label}</option>`
        }
    }).join("")

    return options
}

if(educationData){
    educationData.forEach(async ele => {
        const row = document.createElement("tr")
        let options = await getCourses(ele)
    
        row.innerHTML = `<td style="padding: 0;">
            <select name="education[${eduCounter}][course]"> 
                ${options}
            </select>
            </td>
            <td style="padding: 0;">
            <input type="text" name="education[${eduCounter}][passingYear]" minlength="4" maxlength="4" class="valDigits" value="${ele.passing_year}">
            </td>
            <td style="padding: 0;">
            <input type="text" name="education[${eduCounter}][uniBod]" class="valString" value="${ele.university_board}">
            </td>
            <td style="padding: 0;">
            <input type="text" name="education[${eduCounter}][result]" maxlength="4" class="valDigits" value="${ele.result}">
            </td>
            <td style="border:none;">
            <button type="button" onclick="deleteRow(this)">Delete</button>
            </td>`
            
        eduTbl.lastChild.appendChild(row)
        eduCounter++;
    });
}

addEdu.addEventListener("click",async (e)=>{
    e.preventDefault()

    const row = document.createElement("tr")
    let options = await getCourses()

    row.innerHTML = `<td style="padding: 0;">
        <select name="education[${eduCounter}][course]"> 
            ${options}
        </select>
        </td>
        <td style="padding: 0;">
        <input type="text" name="education[${eduCounter}][passingYear]" minlength="4" maxlength="4" class="valDigits">
        </td>
        <td style="padding: 0;">
        <input type="text" name="education[${eduCounter}][uniBod]" class="valString">
        </td>
        <td style="padding: 0;">
        <input type="text" name="education[${eduCounter}][result]" maxlength="4" class="valDigits">
        </td>
        <td style="border:none;">
            <button type="button" onclick="deleteRow(this)">Delete</button>
        </td>
    `
    eduTbl.lastChild.appendChild(row)
    eduCounter++;
})

if(companyData){
    companyData.forEach( ele =>{
        let row = document.createElement("tr")
    
        row.innerHTML = `<td style="padding: 0;">
                            <input type="text" name="company[${compCounter}][company]" class="valString" value="${ele.company_name}">
                        </td>
                        <td style="padding: 0;">
                            <input type="date" name="company[${compCounter}][fromDate]" value="${new Date(ele.from_date).toISOString().split('T')[0]}">
                        </td>
                        <td style="padding: 0;">
                            <input type="date" name="company[${compCounter}][toDate]" value="${new Date(ele.to_date).toISOString().split('T')[0]}">
                        </td>
                        <td style="padding: 0;">
                            <input type="text" name="company[${compCounter}][annualPackage]" class="valDigits" value="${ele.annual_package}">
                        </td>
                        <td style="padding: 0;">
                            <input type="text" name="company[${compCounter}][reasonToLeave]" class="valString" value="${ele.reason_to_leave}">
                        </td>
                        <td style="padding: 0;">
                            <input type="text" maxlength="10" name="company[${compCounter}][refContNumber]" class="valPhNum" value="${ele.ref_contact_number}">
                        </td>
                        <td style="padding: 0;">
                            <input type="text" name="company[${compCounter}][refContName]" class="valString" value="${ele.ref_contact_name}">
                        </td>
                        <td style="border:none;">
                        <button type="button" onclick="deleteRow(this)">Delete</button>
                        </td>`
    
        compTbl.lastChild.appendChild(row)
        compCounter++
    })
}

addComp.addEventListener("click",(e)=>{
    e.preventDefault()
    let row = document.createElement("tr")

    row.innerHTML = `<td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][company]" class="valString" >
                    </td>
                    <td style="padding: 0;">
                        <input type="date" name="company[${compCounter}][fromDate]">
                    </td>
                    <td style="padding: 0;">
                        <input type="date" name="company[${compCounter}][toDate]">
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][annualPackage]" class="valDigits">
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][reasonToLeave]" class="valString">
                    </td>
                    <td style="padding: 0;">
                        <input type="text" maxlength="10" name="company[${compCounter}][refContNumber]" class="valPhNum">
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][refContName]" class="valString">
                    </td>
                    <td style="border:none;">
                        <button type="button" onclick="deleteRow(this)">Delete</button>
                    </td>`

    compTbl.lastChild.appendChild(row)
    compCounter++
})

function deleteRow(btn){
    let currentRow = btn.closest("tr")
    currentRow.remove()
    eduCounter--
}