async function handleLogin() {
    const isRemMe = document.getElementById("rememberMe").checked
    const captchaInput = document.getElementById("captchaInput")
    if (checkNull()) {
        const res = await fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email.value.trim(), currpass: currpassword.value.trim(), isRemMe: isRemMe, captchaInput : captchaInput.value.trim() })
        })
        if (res.status == 200) {
            document.getElementById("invCreds").style.display = "none"
            window.location.href = "/user/home"
        } else if (res.status == 400) {
            document.getElementById("invCreds").style.display = "block"
        }
    }
}