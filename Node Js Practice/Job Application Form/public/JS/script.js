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

addEdu.addEventListener('click', (e) => {
    e.preventDefault()
    const row = document.createElement("tr")
    row.innerHTML = `<td style="padding: 0;">
        <select name="education[${eduCounter}][course]" style="height:4vmin;width:80%;background:white;border:none;font-size:large;"> 
            <option value="10">10th</option>
            <option value="12">12th</option>
            <option value="BTech">Btech</option>
            <option value="BE">BE</option>
            <option value="MTech">MTech</option>
        </select>
        </td>
        <td style="padding: 0;">
        <input type="text" name="education[${eduCounter}][passingYear]" minlength="4" maxlength="4">
        <small class="error">Enter valid Passing Year</small>
        </td>
        <td style="padding: 0;">
        <input type="text" name="education[${eduCounter}][uniBod]">
        <small class="error">Enter valid University Name</small>
        </td>
        <td style="padding: 0;">
        <input type="text" name="education[${eduCounter}][result]" maxlength="4" >
        <small class="error">Enter valid Result</small>
        </td>
        <td style="border:none;">
            <button onclick="deleteEduRow(this)">Delete</button>
        </td>
    `
    eduTbl.lastChild.appendChild(row)
    eduCounter++;
})

// deleteEdu.addEventListener('click', (e) => {
//     e.preventDefault()

//     let lastRow = eduTbl.lastChild.lastElementChild
//     if (lastRow.id != "eduHeading") {
//         document.getElementById("educationTbl").lastChild.lastElementChild.remove()
//         if (eduCounter > 0) {
//             eduCounter--
//         }
//     }
// })

function deleteEduRow(btn) {
    let currentRow = btn.closest("tr")
    if (!(currentRow.childNodes[2].childNodes[1].value == "")) {
        if (confirm("Are you sure you want to delete the data? ")) {
            currentRow.remove()
            eduCounter--
        }
    } else {
        currentRow.remove()
        eduCounter--
    }
}

addComp.addEventListener('click', (e) => {
    e.preventDefault()

    let row = document.createElement("tr")

    row.innerHTML = `<td style="padding: 0;">
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
                        <input type="text" maxlength="10" name="company[${compCounter}][refContNumber]">
                        <small class="error">Enter valid Number</small>
                    </td>
                    <td style="padding: 0;">
                        <input type="text" name="company[${compCounter}][refContName]">
                        <small class="error">Enter valid Name</small>
                    </td>
                    <td style="border:none;">
                        <button onclick="deleteCompRow(this)">Delete</button>
                    </td>`

    compTbl.lastChild.appendChild(row)
    compCounter++
})

function deleteCompRow(btn) {
    let currentRow = btn.closest("tr")
    if (!(currentRow.childNodes[0].childNodes[1].value == "")) {
        if (confirm("Are you sure you want to delete the data? ")) {
            currentRow.remove()
            compCounter--
        }
    } else {
        currentRow.remove()
        compCounter--
    }
}

langKnown.forEach(ele => {

    let row = document.createElement("tr")

    row.innerHTML = `<td><input type="checkbox" name="lang[${ele}][selected]" class="langTitle" ">${ele}
    <small class="error">Atleast select one ability</small>
    </td>
                   <td><input type="checkbox" name="lang[${ele}][read]" value="true" disabled></td>
                   <td><input type="checkbox" name="lang[${ele}][write]" value="true" disabled></td>
                   <td><input type="checkbox" name="lang[${ele}][speak]" value="true" disabled></td>`

    langKnownTbl.appendChild(row)
})

techKnown.forEach(ele => {
    let row = document.createElement("tr")

    row.innerHTML = `<td><input type="checkbox" name="tech[${ele}][selected]">${ele}
    <small class="error">Atleast select one ability</small>
    </td>
                   <td><input type="radio" name="tech[${ele}][level]" value="beginner" disabled></td>
                   <td><input type="radio" name="tech[${ele}][level]" value="intermediate" disabled></td>
                   <td><input type="radio" name="tech[${ele}][level]" value="expert" disabled></td>`
    techKnownTbl.appendChild(row)
})