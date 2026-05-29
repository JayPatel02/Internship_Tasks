const form = document.getElementById("jobForm")
const basicDiv = document.getElementById("basicDiv")
const eduDiv = document.getElementById("eduDiv")
const compDiv = document.getElementById("compDiv")
const langDiv = document.getElementById("langDiv")
const techDiv = document.getElementById("techDiv")
const refDiv = document.getElementById("refDiv")

const basicForm = document.getElementById("basicDiv")

const divs = [basicDiv, eduDiv, compDiv, langDiv, techDiv, refDiv]

function handleDisplay(id) {
    divs.forEach((t, i) => {
        if (id == i) {
            t.style.display = "block"
        } else {
            t.style.display = "none"
        }
    })
}

async function handleSave(field) {
    const data = new FormData(form)
    const formdata = Object.fromEntries(data.entries());
    
    if((field == "basicDiv" && basicVal()) || (field == "eduDiv" && eduVal()) || (field == "compDiv" && compVal()) || (field == "refDiv" && refVal()) || field == "langDiv" || field == "techDiv"){
        if(confirm("Sure, You want to UPDATE the data?")){
            let res = await fetch(`/updateData/${applicantId}?field=${field}`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formdata)
                }
            )
        }
    }
}