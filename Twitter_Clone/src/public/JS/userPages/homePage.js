const tweetForm = document.getElementById("tweetForm")
const tweetContentarea = document.getElementById("tweetContent")
const charCount = document.getElementById("charCount")
const fileTypeErr = document.getElementById("fileTypeErr") 

// Update character count as user types
tweetContentarea.addEventListener("input", () => {
    const currentLength = tweetContentarea.value.length
    if(currentLength > 0){
      charCount.parentElement.style.display = "block"  
    } 
    else charCount.parentElement.style.display = "none"
    
    charCount.innerText = currentLength
    if (currentLength > 280) {
        tweetContentarea.value = tweetContentarea.value.substring(0, 280)
        charCount.innerText = 280
        charCount.style.color = "red"
    } else {
        charCount.style.color = "black"
    }
})

function validateTweetContent(){
    let isValid = true
    const tweetContent = tweetContentarea.value.trim()
    if(tweetContent === ""){
        tweetContentarea.style.border = "1px solid red"
        isValid = false
    }else{
        tweetContentarea.style.border = "none"
    }
    return isValid
}

async function postTweet(){
    if(!validateTweetContent()){
        e.preventDefault()
    }
    const formData = new FormData(tweetForm)
    const res = await fetch("/user/postTweet",{
        method: "post",
        body: formData
    })
    if(res.status === 400 || res.status === 413 ){
        const response = await res.json()
        fileTypeErr.style = "block"
        fileTypeErr.innerText = ""
        fileTypeErr.innerText = response.message
        fileTypeErr.style.color = "red"
    }else{
        fileTypeErr.style = "none"
        window.location.reload()
        tweetForm.reset()
    }
}