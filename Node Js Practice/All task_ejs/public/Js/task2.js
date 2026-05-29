const nr = document.getElementById("northRed")
const ng = document.getElementById("northGreen")
const ny = document.getElementById("northYellow")

const wr = document.getElementById("westRed")
const wg = document.getElementById("westGreen")
const wy = document.getElementById("westYellow")

const sr = document.getElementById("southRed")
const sg = document.getElementById("southGreen")
const sy = document.getElementById("southYellow")

const er = document.getElementById("eastRed")
const eg = document.getElementById("eastGreen")
const ey = document.getElementById("eastYellow")

let northDuration = 120;
async function northSignal(){
    let x = setInterval(()=>{
        
        if ( northDuration === 1 ){
            northDuration = 120
            clearInterval(x)
            northSignal()
        }
        --northDuration;
        if(northDuration > 95){
            ng.style.backgroundColor = "green"
            ng.innerText=`${northDuration-95}`
            ny.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            nr.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
            nr.innerText="R"
        }
        if(northDuration > 90 && northDuration <= 95 ){
            ny.style.backgroundColor = "yellow"
            ny.innerText=`${northDuration-90}`
            ng.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            ng.innerText="G"
            nr.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
        }
        if(northDuration >= 0 && northDuration <= 90){
            nr.style.backgroundColor = "red"
            nr.innerText=`${northDuration}`
            ng.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            ny.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            ny.innerText=`Y`
        } 
    },1000)
}

let westDuration = 150;
async function westSignal(){
    let x = setInterval(()=>{
        westDuration--;
        if( westDuration === 1){
            westDuration = 120
            clearInterval(x)
            westSignal()
        }
        if(westDuration > 120){
            wr.style.backgroundColor = "red"
            wr.innerText=`${westDuration-120}`
            wg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            wg.innerText="G"
            wy.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
        }
        if(westDuration > 95 && westDuration <= 120){
            wg.style.backgroundColor = "green"
            wg.innerText=`${westDuration-95}`
            wy.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            wr.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
            wr.innerText="R"
        }
        if(westDuration > 90 && westDuration <= 95 ){
            wy.style.backgroundColor = "yellow"
            wy.innerText=`${westDuration-90}`
            wg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            wg.innerText="G"
            wr.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
        }
        if(westDuration >= 0 && westDuration <= 90){
            wr.style.backgroundColor = "red"
            wr.innerText=`${westDuration}`
            wg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            wy.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            wy.innerText="Y"
        } 
    },1000)
}

let southDuration = 180;
async function southSignal(){
    let x = setInterval(()=>{
        southDuration--;
        if( southDuration === 1){
            southDuration = 120
            clearInterval(x)
            southSignal()
        }
        if(southDuration > 120){
            sr.style.backgroundColor = "red"
            sr.innerText=`${southDuration-120}`
            sg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            sg.innerText="G"
            sy.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
        }
        if(southDuration > 95 && southDuration <= 120){
            sg.style.backgroundColor = "green"
            sg.innerText=`${southDuration-95}`
            sy.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            sr.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
            sr.innerText="R"
        }
        if(southDuration > 90 && southDuration <= 95 ){
            sy.style.backgroundColor = "yellow"
            sy.innerText=`${southDuration-90}`
            sg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            sg.innerText="G"
            sr.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
        }
        if(southDuration >= 0 && southDuration <= 90){
            sr.style.backgroundColor = "red"
            sr.innerText=`${southDuration}`
            sg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            sy.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            sy.innerText="Y"
        } 
    },1000)
}

let eastDuration = 210;
async function eastSignal(){
    let x = setInterval(()=>{
        eastDuration--;
        if( eastDuration === 1){
            eastDuration = 120
            clearInterval(x)
            eastSignal()
        }
        if(eastDuration > 120){
            er.style.backgroundColor = "red"
            er.innerText=`${eastDuration-120}`
            eg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            eg.innerText="G"
            ey.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
        }
        if(eastDuration > 95 && eastDuration <= 120){
            eg.style.backgroundColor = "green"
            eg.innerText=`${eastDuration-95}`
            ey.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            er.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
            er.innerText="R"
        }
        if(eastDuration > 90 && eastDuration <= 95 ){
            ey.style.backgroundColor = "yellow"
            ey.innerText=`${eastDuration-90}`
            eg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            eg.innerText="G"
            er.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
        }
        if(eastDuration >= 0 && eastDuration <= 90){
            er.style.backgroundColor = "red"
            er.innerText=`${eastDuration}`
            eg.style.backgroundColor = "rgba(0, 225, 0, 0.2)"
            ey.style.backgroundColor = "rgba(255, 223, 0, 0.2)"
            ey.innerText="Y"
        } 
    },1000)
}

northSignal()
westSignal()
southSignal()
eastSignal()