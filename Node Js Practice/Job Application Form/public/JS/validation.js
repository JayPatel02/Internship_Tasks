const jobForm = document.getElementById("form_JobApp"); 
const emailInp = document.getElementById("email");
const add1 = document.getElementById("address1");
const dateOfBirth = document.getElementById("dateOfBirth");
const pinCode = jobForm["pinCode"]

const valString = document.querySelectorAll(".valString");
const valPhoneNumber = document.querySelectorAll(".valPhoneN")

const strPattern = /^[a-zA-Z ]+$/;
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function basicStrVal(){
    let isValid = true
    valString.forEach((ele)=>{
        let nextEle = ele.nextElementSibling
        if(!ele.value.match(strPattern) || ele.value.length < 2){
            nextEle.style.visibility = "visible"
            isValid = false
        }else{
            nextEle.style.visibility = "hidden"
        }
    });
    return isValid
}

function phoneNumVal(){
    let isValid = true
    valPhoneNumber.forEach((ele)=>{
        let nextEle = ele.nextElementSibling
        if( !ele.value == NaN || ele.value.length != 10){
            nextEle.style.visibility = "visible"
            isValid = false
        }else{
            nextEle.style.visibility = "hidden"
        }
    })
    return isValid
}

function emailVal(){
    let isValid = true
    let nextEle = emailInp.nextElementSibling
    if(!emailInp.value.match(emailPattern)){
        nextEle.style.visibility = "visible"    
    }else{
        nextEle.style.visibility = "hidden"
    }
    return isValid
}

function valAdd(){
    let isValid = true
    let nextEle = add1.nextElementSibling
    if(add1.value.trim() == "" || add1.value.length < 10){
        nextEle.style.visibility = "visible" 
    }else{
        nextEle.style.visibility = "hidden"
    }
    return isValid
}

function valPincode(){
    let isValid = true
    let nextEle = pinCode.nextElementSibling
    if(pinCode.value == "" || !pinCode.value.match(/^[0-9]+$/)){
        nextEle.style.visibility = "visible"
    }else{
        nextEle.style.visibility = "hidden"
    }
    return isValid
}

function valDateOfBirth(){
    let isValid = true
    const dob = new Date(dateOfBirth.value);
    let nextEle = dateOfBirth.nextElementSibling
    if (dob >= new Date() || isNaN(dob)) {
        nextEle.style.visibility = "visible"
        isValid = false 
    }else{
        nextEle.style.visibility = "hidden"
    }
    return isValid;
}

function basicInfoVal(){
    
    const isEmailValid = emailVal();
    const isAddressValid = valAdd();
    const isDobValid = valDateOfBirth();
    const isPhoneValid = phoneNumVal();
    const isPinValid = valPincode();

    return (isEmailValid && isAddressValid && isDobValid && isPhoneValid && isPinValid);
}

//------------------------------------------------------------------------
//======= Education Validation ======
function educationValidation(){
    let isValid = true
    let educountfor = document.querySelectorAll('.educlass')
    let edulength = educountfor.length

    for(let i=0;i<edulength;i++){
        let eduValCor = document.getElementsByName(`education[${i}][course]`);
        let eduValPasY = document.getElementsByName(`education[${i}][passingYear]`);
        let eduValUni = document.getElementsByName(`education[${i}][uni/bod]`);
        let eduValRes = document.getElementsByName(`education[${i}][result]`);
        
        eduValCor.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            if(!ele.value.match(strPattern) || ele.value.length < 3){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })

        eduValPasY.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            let passY = parseInt(ele.value)
            let currentY = new Date().getFullYear()
            if(passY > currentY || isNaN(passY) ){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })

        eduValUni.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            if(!ele.value.match(strPattern) || ele.value.length < 3){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })

        eduValRes.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            let val = parseFloat(ele.value)
            if( val > 100 || isNaN(val)){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })
    }
    return isValid
}

// -------------------------------------------------------------------------------
// Work Exp

function companyValidation(){
    let compCounterFor = document.querySelectorAll(".compclass")
    let compCounter = compCounterFor.length
    let isValid = true

    for(i=0; i < compCounter ; i++){
        let compName = document.getElementsByName(`company[${i}][company]`)
        let fromDate = document.getElementsByName(`company[${i}][fromDate]`)
        let toDate = document.getElementsByName(`company[${i}][toDate]`)
        let annualPackage = document.getElementsByName(`company[${i}][annualPackage]`)
        let RTL = document.getElementsByName(`company[${i}][reasonToLeave]`) 
        let RCNum = document.getElementsByName(`company[${i}][refContNumber]`)
        let RCName = document.getElementsByName(`company[${i}][refContName]`)

        compName.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            if(!ele.value.match(strPattern) || ele.value.length < 3){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })

        if(fromDate[i].value > toDate[i].value || fromDate[i].value == ""){
            let nextEle = fromDate[i].nextElementSibling
            nextEle.style.visibility = "visible"
            isValid = false
        }else{
            let nextEle = fromDate[i].nextElementSibling
            nextEle.style.visibility = "hidden"
        }

        let currentD = new Date()
        let to_Date = new Date(toDate[i].value)
        if(to_Date > currentD || toDate[i].value == ""){
            let nextEle = toDate[i].nextElementSibling
            nextEle.style.visibility = "visible"
            isValid = false
        }else{
            let nextEle = toDate[i].nextElementSibling
            nextEle.style.visibility = "hidden"
        }

        annualPackage.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            if(ele.value == "" || !ele.value.match(/^\d+\.\d+$/)){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })

        RTL.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            if(!ele.value.match(strPattern) || ele.value.length < 3){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })

        RCNum.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            if( !ele.value == NaN || ele.value.length != 10){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })
        
        RCName.forEach((ele)=>{
            let nextEle = ele.nextElementSibling
            if(!ele.value.match(strPattern) || ele.value.length < 3){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        })
    }
    return isValid
}

//------------------------------------------------------------------------------
// Lang Known Val

langKnown.forEach((lang)=>{
    let langTitle = document.querySelector(`input[name="lang[${lang}][selected]"]`)
    let langRead = document.querySelector(`input[name="lang[${lang}][read]"]`)
    let langWrite = document.querySelector(`input[name="lang[${lang}][write]"]`)
    let langSpeak = document.querySelector(`input[name="lang[${lang}][speak]"]`)

    langTitle.addEventListener('change',()=>{
        if(langTitle.checked){
            langRead.disabled = false
            langWrite.disabled = false
            langSpeak.disabled = false
        }else{
            langRead.disabled = true
            langWrite.disabled = true
            langSpeak.disabled = true

            langRead.checked = false
            langWrite.checked = false
            langSpeak.checked = false
        }
     })
})

function langKnownVal(){
    let isValid = true
    langKnown.forEach((lang)=>{
    let langTitle = document.querySelector(`input[name="[${lang}][selected]"]`)
    let langRead = document.querySelector(`input[name="lang[${lang}][read]"]`)
    let langWrite = document.querySelector(`input[name="lang[${lang}][write]"]`)
    let langSpeak = document.querySelector(`input[name="lang[${lang}][speak]"]`)

        if(langTitle.checked){
            let nextEle = langTitle.nextElementSibling
            if(!langRead.checked && !langWrite.checked && !langSpeak.checked){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }           
        }
    })
    return isValid
}

// ----------------------------------------------------------------------------------
// TechKnown Validation

techKnown.forEach((tech)=>{
    let techTitle = document.querySelector(`input[name="tech[${tech}][selected]"]`)
    let techradioGroup = document.querySelectorAll(`input[name="tech[${tech}][level]"]`)
    
    techTitle.addEventListener('change',()=>{
        techradioGroup.forEach((t)=>{
            if(techTitle.checked){
                t.disabled = false
            }else{
                t.disabled = true
                t.checked = false
            }
        })
    })
})

function techValidation(){
    let isValid = true
    techKnown.forEach((tech)=>{
        let techTitle = document.querySelector(`input[name="tech[${tech}][selected]"]`)
        let techradioGroup = document.querySelectorAll(`input[name="tech[${tech}][level]"]`)
    
        let nextEle = techTitle.nextElementSibling
        let trueFlag = false
        if(techTitle.checked){
            techradioGroup.forEach((t)=>{
                if(t.checked){
                    trueFlag = true
                }
            })
            if(!trueFlag){
                nextEle.style.visibility = "visible"
                isValid = false
            }else{
                nextEle.style.visibility = "hidden"
            }
        }
    })
    return isValid
}

// ----------------------------------------------------------------------------------
// Reference Contact

let refName1 = document.getElementById("refName1")
let refName2 = document.getElementById("refName2")

let refContNum1 = document.getElementById("refContNum1")
let refContNum2 = document.getElementById("refContNum2")

let refRel1 = document.getElementById("refRel1")
let refRel2 = document.getElementById("refRel2")

let nameRelArr = [refName1,refName2,refRel1,refRel2]

function refContactVal(){
    let isValid = true;

    nameRelArr.forEach((ele) => {
        let nextEle = ele.nextElementSibling;
        if (ele.value.trim() !== "") { 
            if (!ele.value.match(strPattern)) {
                nextEle.style.visibility = "visible";
                isValid = false;
            } else {
                nextEle.style.visibility = "hidden";
            }
        } else {
            nextEle.style.visibility = "hidden"; 
        }
    });

    [refContNum1, refContNum2].forEach((numEle) => {
        let nextEle = numEle.nextElementSibling;
        let val = numEle.value.trim();

        if (val !== "") { 
            if (isNaN(val) || val.length !== 10) {
                nextEle.style.visibility = "visible";
                isValid = false;
            } else {
                nextEle.style.visibility = "hidden";
            }
        } else {
            nextEle.style.visibility = "hidden";
        }
    });

    return isValid; 
}

// ---------------------------------------------------------------------
// Preferences Validation

let prefLocations = document.getElementById("locations")
let noticePeriod = document.getElementById("noticePed") 
let expectedCtc = document.getElementById("exptCtc")
let currentCtc = document.getElementById("currCtc")

function prefValidation(){
    let isValid = true
    if(prefLocations.selectedOptions.length === 0){
        let nextEle = prefLocations.nextElementSibling
        nextEle.style.visibility = "visible"
        isValid = false
    }else{
        let nextEle = prefLocations.nextElementSibling
        nextEle.style.visibility = "hidden"
    }

    if( noticePeriod.value.match(strPattern) || noticePeriod.value > 12 || noticePeriod.value < 0){
        let nextEle = noticePeriod.nextElementSibling
        nextEle.style.visibility = "visible"
        isValid = false
    }else{
        let nextEle = noticePeriod.nextElementSibling
        nextEle.style.visibility = "hidden"
    }

    if( expectedCtc.value.match(strPattern) || expectedCtc.value < 0 || expectedCtc.value == ""){
        let nextEle = expectedCtc.nextElementSibling
        nextEle.style.visibility = "visible"
        isValid = false
    }else{
        let nextEle = expectedCtc.nextElementSibling
        nextEle.style.visibility = "hidden"
    }

    if( currentCtc.value.match(strPattern) || currentCtc.value < 0 || currentCtc.value == ""){
        let nextEle = currentCtc.nextElementSibling
        nextEle.style.visibility = "visible"
        isValid = false
    }else{
        let nextEle = currentCtc.nextElementSibling
        nextEle.style.visibility = "hidden"
    }

    return isValid
}


jobForm.addEventListener('submit', (e) => {

    const isBasicVal = basicStrVal()
    const isBasicInfoVal = basicInfoVal()
    const isEduVal = educationValidation()
    const isCompVal = companyValidation()
    const isLangVal = langKnownVal()
    const isTechVal = techValidation()
    const isRefVal = refContactVal()
    const isPrefVal = prefValidation()

    if(!isBasicVal){
        e.preventDefault(); 
        console.log("Validation failed 1 - stay on page");
    } 
    else if( !isBasicInfoVal ){
        e.preventDefault()
        console.log("Validation failed 2 - stay on page");
    }
    else if( !isEduVal ){
        e.preventDefault()
        console.log("Validation failed 3 - stay on page");
    }
    else if( !isCompVal ){
        e.preventDefault()
        console.log("Validation failed 4 - stay on page");
    }
    else if( !isLangVal ){
        e.preventDefault()
        console.log("Validation failed 5 - stay on page");
    }
    else if( !isTechVal ){
        e.preventDefault()
        console.log("Validation failed 6 - stay on page");
    }
    else if( !isRefVal ){
        e.preventDefault()
        console.log("Validation failed 7 - stay on page");
    }
    else if( !isPrefVal ){
        e.preventDefault()
        console.log("Validation failed 8 - stay on page");
    }
    else {
        console.log("Validation passed - browser will now navigate to form action URL");
    }
});