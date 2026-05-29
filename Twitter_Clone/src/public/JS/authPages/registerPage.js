async function handleRegister() {
    const checkUserResult = await checkUserName()
    const checkEmailResult = await checkEmail("register")
    const captchaInput = document.getElementById("captchaInput")
    if (valUserName() && valEmail() && validateStr() && valPhoneNumber() && validatePass() && comparePass() && checkEmailResult && checkUserResult) {
        const res = await fetch("/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName: strs[0].value.trim(), lastName: strs[1].value.trim(), email: email.value.trim(), currpass: currpassword.value.trim(), userName: userName.value.trim(), phoneNumber: phoneNumber.value.trim() , captchaInput : captchaInput.value.trim()})
        })
        if (res.ok) {
            window.location.href = "/login"
        }
        if (res.status == 400) {
            window.location.reload()
        }
    }
}