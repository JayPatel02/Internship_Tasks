document.getElementById("mouse-inside").addEventListener('mouseover',()=>{
    document.getElementById("mouse-inside").style.backgroundColor="red"
    document.getElementById("mouse-inside").innerText="Mouse inside"
})

document.getElementById("clickMe").addEventListener('click',()=>{
    document.getElementById("clickMe").innerText="I have been clicked"
})

document.getElementById("doubClickMe").addEventListener('dblclick',()=>{
    document.getElementById("doubClickMe").innerText="I have been double clicked"
})

document.getElementById("mouseMove").addEventListener('mousemove',()=>{
    document.getElementById("mouseMove").innerText="Mouse Moved"
})

document.getElementById("mouseOut").addEventListener('mouseout',()=>{
    document.getElementById("mouseOut").innerText="Mouse is out of the div"
})

document.getElementById("keyDown").addEventListener("keydown",(event)=>{
    document.getElementById("demo").innerText=`You enter ${event.key}`
})