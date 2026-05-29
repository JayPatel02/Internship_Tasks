async function handleForgetPassword() {
    const checkEmailDb = await checkEmail("forgetPassword")
    if (valEmail() && checkEmailDb) {
        window.location.href = "/otpEmail"
    }
}