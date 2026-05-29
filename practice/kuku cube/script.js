const tableCont = document.getElementById("tableContainer")
const table = document.createElement("table")
const score = document.getElementById("score")
const timer = document.getElementById("timer")

let size = 2 

function generateTable(size){
    table.innerHTML = ""

    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    let correctRow = getRandomC(size)
    let correctCol = getRandomC(size)

    for(let i =0 ; i < size ; i++){
        let row = table.insertRow()
        for(let j=0 ; j < size; j++){
            let cell = row.insertCell()
            cell.style.backgroundColor = `rgba(${r}, ${g}, ${b} , 1)`
            if(i === correctRow && j === correctCol){
                cell.style.backgroundColor = `rgba(${r}, ${g}, ${b} , 0.5)`
            }
            cell.addEventListener("click",()=>{
                if(i == correctRow && j == correctCol){
                    incScr()
                    generateTable(size+1)
                }else{
                    generateTable(size)
                }
            })
        }
        tableCont.appendChild(table)
    }
}

function getRandomC(size){
    return Math.floor(Math.random() * size)
}

function incScr(){
    let val = parseInt(score.innerText)
    score.innerText = `${++val}`
}

function startTimer(){
    let counter = 10
    timer.innerText = counter
    let interval = setInterval(()=>{
        if(counter === 1){
            clearInterval(interval)
            alert(`Game Over.Score is ${score.innerText}`)
            startGame()
        }
        timer.innerText = --counter
    },1000)
}

function startGame(){
    if(confirm("Want to Start a New Game ?")){
        score.innerText = 1
        startTimer()
        generateTable(size)
    }else{
        alert("Bye")
    }
}

startGame()