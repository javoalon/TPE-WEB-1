"use strict"

document.querySelector("#menuBurger").addEventListener("click",mostrarMenu);
function mostrarMenu (){
    document.querySelector("#menu").classList.toggle("queSeVea")
}