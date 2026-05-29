

// NOT USED THIS FILE IN CURRENT CODE

const totalPgDis = document.getElementById("totalPgDis")

totalPgDis.innerText = totalPage

const homePgBtn = document.getElementById("toHomePage")
const toPrevPage = document.getElementById("toPrevPage")
const currPageDis = document.getElementById("currPageDis")
const toNextPage = document.getElementById("toNextPage")
const toLastPage = document.getElementById("toLastPage")

homePgBtn.addEventListener("click",()=>{
    if(pageN == 1){
        console.log(pageN)
    }else{
        pageN = 1 
        currPageDis.innerText = pageN 
        changeUrl(pageN)
    }
})

toNextPage.addEventListener('click',()=>{
    if(pageN  == totalPage){
       console.log("already on last page")
    }else{
        pageN++;
        currPageDis.textContent = pageN 
        changeUrl(pageN)
    }
})

toPrevPage.addEventListener('click',()=>{
    if(pageN  == 1){
        console.log("already on Home Page")
    }else{
        pageN --;
        currPageDis.innerText = pageN 
        changeUrl(pageN)
    }
})

toLastPage.addEventListener('click',()=>{
    if(pageN  == totalPage ){
        console.log("already on Last Page")
    }else{
        pageN  = totalPage;
        currPageDis.innerText = pageN
        changeUrl(pageN)
    }
})

function changeUrl(count) {
    const newUrl = `${window.location.pathname}?page=${count}`
    window.history.pushState({path: newUrl}, "", newUrl)
} 