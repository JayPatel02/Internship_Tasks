const strs = document.querySelectorAll(".valstr")
const nullAbles = document.querySelectorAll(".valnull") 
const email = document.getElementById("email") 
const currpassword = document.getElementById("pass") 
const confpassword = document.getElementById("confPass") 
const userNameDiv = document.getElementById("userName") 
const userNameErr = document.getElementById("spanUN") 
const phoneNumber = document.getElementById("phoneNumber") 

const strPattern = /^[a-zA-Z\s]+$/
const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/ // ?=.* this will check if there is atleast one occurence of this in the string 
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userNamePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/

function validateStr() {
    let isValid = true
    strs.forEach(str => {
        let value = str.value.trim()
        if (!strPattern.test(value)) {
            str.style.border = "1px solid red"
            isValid = false
        } else {
            str.style.border = "1px solid #e6ecf0"
        }
    })
    return isValid
}

function valEmail() {
    let isValid = true
    const value = email.value.trim()
    if (!emailPattern.test(value)) {
        email.style.border = "1px solid red"
        isValid = false
    } else {
        email.style.border = "1px solid #e6ecf0"
    }
    return isValid
}

function validatePass() {
    let isValid = true
    let value = currpassword.value.trim()
    if (!passPattern.test(value)) {
        currpassword.style.border = "1px solid red"
        if (currpassword.nextElementSibling) {
            currpassword.nextElementSibling.style.display = "block"
        }
        isValid = false
    } else {
        currpassword.style.border = "1px solid #e6ecf0"
        if (currpassword.nextElementSibling) {
            currpassword.nextElementSibling.style.display = "none"
        }
    }
    return isValid
}

function comparePass() {
    let isValid = true
    let currpass = currpassword.value.trim()
    let confpass = confpassword.value.trim()
    if (!(currpass === confpass)) {
        confpassword.style.border = "1px solid red"
        isValid = false
    } else {
        confpassword.style.border = "1px solid #e6ecf0"
    }
    return isValid
}

function checkNull() {
    let isValid = true
    nullAbles.forEach(input => {
        const value = input.value.trim()
        if (value == "") {
            isValid = false
        }
    })
    return isValid
}

function valUserName() {
    let isValid = true
    const value = userNameDiv.value.trim()
    if (!userNamePattern.test(value)) {
        userNameDiv.style.border = "1px solid red";
        (userNameDiv.nextElementSibling ).style.display = "block"
        isValid = false
    } else {
        userNameDiv.style.border = "1px solid #e6ecf0";
        (userNameDiv.nextElementSibling ).style.display = "none"
    }
    return isValid
}

function valPhoneNumber() {
    let isValid = true
    const value = phoneNumber.value.trim()
    if (!/^\d{10}$/.test(value)) {
        phoneNumber.style.border = "1px solid red"
        isValid = false
    } else {
        phoneNumber.style.border = "1px solid #e6ecf0"
    }
    return isValid
}

function validateOtp(){
    const otpInput = document.getElementById("otp") 
    let isValid = true
    if(otpInput.value.trim() === ""){
        otpInput.style.border = "1px solid red"
        isValid = false
    } else {
        otpInput.style.border = "1px solid #e6ecf0"
    }
    return isValid
}

async function checkEmail(type) {
    let isValid = true
    let res = await fetch("/checkEmail", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.value.trim() , type: type})
    })
    if (type === "register") {
        if (res.status == 200) {
            (email.nextElementSibling ).style.display = "block"
            isValid = false
        } else {
            (email.nextElementSibling ).style.display = "none"
        }
    }
    if (type === "forgetPassword") {
        if (res.status == 400) {
            (email.nextElementSibling ).style.display = "block"
            isValid = false
        } else {
            (email.nextElementSibling ).style.display = "none"
        }
    }
    return isValid
}

async function checkUserName() {
    let isValid = true
    let res = await fetch("/checkUserName", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName: userNameDiv.value.trim() })
    })
    if (res.status == 200) {
        userNameErr.style.display = "block"
        isValid = false
    } else {
        userNameErr.style.display = "none"
        console.log("username is not present")
    }
    return isValid
}