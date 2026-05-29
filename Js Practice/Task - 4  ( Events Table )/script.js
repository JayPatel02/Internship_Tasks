document.getElementById("mouse-inside").addEventListener('mouseover',()=>{
    document.getElementById("mouse-inside").style.backgroundColor="red"
    document.getElementById("mouse-inside").innerText="Mouse inside"
})

document.getElementById("clickMe").addEventListener('click',()=>{
    document.getElementById("clickMe").innerText="I have been clicked"
})

document.getElementById("mouseMove").addEventListener('mousemove',()=>{
    document.getElementById("mouseMove").innerText="Mouse Moved"
})

document.getElementById("mouseOut").addEventListener('mouseout',()=>{
    document.getElementById("mouseOut").innerText="Mouse is out of the div"
})

document.getElementById("keyDown").addEventListener("keydown",(event)=>{
    document.getElementById("demo").innerText=`You entered ${event.key}`
})

document.getElementById("mouse-inside").addEventListener('mouseenter',()=>{
    console.log("Mouse entered the div (mouseenter)")
})

document.getElementById("div7").addEventListener('dblclick', ()=>{
    const el = document.getElementById("div7");
    el.style.backgroundColor = el.style.backgroundColor === "orange" ? "aquamarine" : "orange";
});


document.getElementById("div8").addEventListener('mouseenter', ()=>{
    document.getElementById("div8").style.transform = "scale(1.2)";
});

document.getElementById("div10").addEventListener('mousedown', ()=>{
    document.getElementById("div10").style.transform = "rotate(15deg)";
});

document.getElementById("div11").addEventListener("wheel", ()=>{
    document.getElementById("div11").style.transform = "rotate(40deg)";
})

document.getElementById("div12").addEventListener('contextmenu', (event)=>{
    event.preventDefault();
    alert("Right-click on div 12!");
});

document.getElementById("div14").addEventListener('focus', ()=>{
    document.getElementById("div14").style.backgroundColor = "pink";
});
