let t1 = "LEGES"
let t2 = "your legal companion"

let i = 0
let j = 0

function typeMain(){

if(i < t1.length){
document.getElementById("text1").innerHTML += t1.charAt(i)
i++
setTimeout(typeMain,180)
}else{
setTimeout(typeSub,400)
}

}

function typeSub(){

if(j < t2.length){
document.getElementById("text2").innerHTML += t2.charAt(j)
j++
setTimeout(typeSub,70)
}

}

typeMain()

function enterApp(){
    window.location.href = "login.html";
}