const tableArea = document.getElementById("tblContainer")
const table = document.createElement("table")
const timerCount = document.getElementById("timerCount")
const pauseBtn = document.getElementById("pauseBtn")

let scoreNum = document.getElementById("scoreNum");
let score = 1;    
let tSize = 2;
let max_size = 100;
let default_time = 60;
let is_pause = false;

function generateTable(tSize){
    table.innerHTML=''

    table.style.width = (tSize*10) + "vmin";
    table.style.height = (tSize*10) + "vmin";


    let correctRow = randomSize(tSize)
    let correctCol = randomSize(tSize)

    let r = randomColor();
    let g = randomColor();
    let b = randomColor();

    for( i=0; i<tSize; i++){
        let row = table.insertRow()
        for( j=0 ; j<tSize ; j++){
            let col = row.insertCell()
            if( j == correctCol && i == correctRow ){
                if(i<5){
                    col.style.backgroundColor = `rgba(${r-50},${g-40},${b-40},0.5)`
                }
                if(i>=5 && i<10){
                    col.style.backgroundColor = `rgba(${r-50},${g-40},${b-40},0.6)`
                }
                if(i>=10 && i<15){
                    col.style.backgroundColor = `rgba(${r-50},${g-40},${b-40},0.7)`
                }
                if(i>=15 && i<20){
                    col.style.backgroundColor = `rgba(${r-50},${g-40},${b-40},0.8)`
                }
                if(i>20){
                    col.style.backgroundColor = `rgba(${r-50},${g-40},${b-40},0.85)`
                }
                col.setAttribute("id","correct")
            } else {
                col.style.backgroundColor = `rgba(${r-50},${g-40},${b-40},1)`
            }
        }
        tableArea.appendChild(table)
    }
}

table.addEventListener('click',(e)=>{
    e.preventDefault()
    if (tSize < max_size ){
        if(e.target.id === "correct"){
            incScore()
            generateTable(++tSize)
        }else{
            generateTable(tSize)
        }
    } 
    else if (tSize === max_size){
        if(e.target.id === "correct"){
            incScore()
            generateTable(tSize)
        }else{
            generateTable(tSize)
        }
    }
})

pauseBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(is_pause){
        pauseBtn.innerHTML='Pause'
        is_pause=false;
        table.classList.remove("disable-table")
    }else{
        pauseBtn.innerHTML='Resume'
        is_pause = true
        table.classList.add("disable-table")
    }
})

function randomSize(size){
    return Math.floor(Math.random() * size)
}
function randomColor(){
    return Math.floor(Math.random() * 256)
}
function incScore(){
    score += 1;
    scoreNum.innerHTML = `${score}`
}
function gameTimer(){

    if( default_time > 0){
        if(!is_pause){
            --default_time;
            timerCount.innerHTML=`${default_time}`
        }
    }
    if( default_time === 0){
        endGame()
        clearInterval()
        default_time=30
    }
}

function startGame(){
    alert("Want to Start Game")
    generateTable(2)
    scoreNum.innerHTML="1"
    let x = setInterval(gameTimer,1000)  
}

function endGame(){
    alert("Game is Over\n"+`Your Score is ${score}`)
    startGame()
}

startGame()