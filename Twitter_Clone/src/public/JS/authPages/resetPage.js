const timerElement = document.getElementById('timer')

const timerInterval = setInterval(() => {
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        timerElement.innerText = '00:00';
        document.getElementById('resendBtn').disabled = false;
        document.getElementById('regBtn').disabled = true;
        document.getElementById('regBtn').style.pointerEvents = 'none';
        return;
    }
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    timeLeft--;
}, 1000)

async function handleResetPassword() {
    if (validatePass() && comparePass() && validateOtp()) {
        const res = await fetch("/resetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newPassword: currpassword.value.trim(), otp: otp.value.trim() })
        })
        const data = await res.json();
        if (data.message === "Password reset successful.") {
            window.location.href = "/login";
        } else {
            document.getElementById('commonError').innerText = data.message;
            document.getElementById('commonError').style.display = 'block';
        }
    }
}

function handleResendOtp() {
    window.location.href = "/forgetPassword";
}