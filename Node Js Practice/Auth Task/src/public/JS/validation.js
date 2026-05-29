const strs = document.querySelectorAll(".valstr")
const email = document.getElementById("email")
const currpassword = document.getElementById("pass")
const confpassword = document.getElementById("confPass")
const userInput = document.getElementById("captchaInput")

const strPattern = /^[a-zA-Z\s]+$/
const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/ // ?=.* this will check if there is atleast one occurence of this in the string 
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateStr() {
    let isValid = true
    strs.forEach(str => {
        let value = str.value
        if (!strPattern.test(value)) {
            str.previousElementSibling.style.display = "block"
            str.style.border = "1px solid red"
            isValid = false
        } else {
            str.previousElementSibling.style.display = "none"
            str.style.border = "1px solid black"
        }
    })
    return isValid
}

async function checkEmail() {
    let isValid = true
    let res = await fetch("/checkEmail", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.value })
    })
    if(res.status == 200){
        if(document.getElementById("userExistMes")){
            document.getElementById("userExistMes").style.display = "block"
        }
        isValid = false
    }else{
        document.getElementById("userExistMes").style.display = "none"
    }
    return isValid
}

function valEmail() {
    let isValid = true
    const value = email.value
    if (!emailPattern.test(value)) {
        email.previousElementSibling.style.display = "block"
        email.style.border = "1px solid red"
        isValid = false
    } else {
        email.previousElementSibling.style.display = "none"
        email.style.border = "1px solid black"
    }
    return isValid
}

function validatePass() {
    let isValid = true
    let value = currpassword.value
    if (!passPattern.test(value)) {
        currpassword.previousElementSibling.style.display = "block"
        currpassword.style.border = "1px solid red"
        isValid = false
    } else {
        currpassword.previousElementSibling.style.display = "none"
        currpassword.style.border = "1px solid black"
    }
    return isValid
}

function comparePass() {
    let isValid = true
    let currpass = currpassword.value
    let confpass = confpassword.value
    if (!(currpass === confpass)) {
        confpassword.previousElementSibling.style.display = "block"
        confpassword.style.border = "1px solid red"
        isValid = false
    } else {
        confpassword.previousElementSibling.style.display = "none"
        confpassword.style.border = "1px solid black"
    }
    return isValid
}