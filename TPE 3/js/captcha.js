"use strict";
let btnEnviar = document.querySelector("#btn-enviar");
let ladoEnviar = document.querySelector("#ladoEnviar");
let numeroCaptcha = document.querySelector("#numeroCaptcha");
let btnCambiar = document.querySelector("#cambiarNumero");
btnEnviar.addEventListener("click",verificarNumero);
btnCambiar.addEventListener("click",cambiarNumero);

let numeroRNG = Math.ceil((Math.random()*99999));
numeroCaptcha.innerHTML = numeroRNG;

function cambiarNumero(){
    numeroRNG = Math.ceil((Math.random()*99999));
    numeroCaptcha.innerHTML = numeroRNG;
}
let formPrediccion = document.querySelector("#predict");
function verificarNumero(){
    let captcha = document.querySelector("#inputCaptcha").value;
    if (captcha == numeroRNG) {
        ladoEnviar.innerHTML = " Prediccion enviada con exito!";
        formPrediccion.reset();
    } else {
        ladoEnviar.innerHTML = " El captcha es erroneo";
        numeroRNG = Math.ceil((Math.random()*99999)); //Cuando el captcha se introduce mal, se genera otro numero.
        numeroCaptcha.innerHTML = numeroRNG;
    }
}
