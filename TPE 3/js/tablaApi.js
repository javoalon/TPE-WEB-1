"use strict"
let btnBorrar;
let id = 0;
const url = 'https://62c3ada1876c4700f54044fe.mockapi.io/api/v1/jugadores';
let filtroTabla = document.querySelector("#filtroTabla");
let btnFiltrar = document.querySelector("#btn-filtrar");
btnFiltrar.addEventListener("click", mostrarTabla)
mostrarTabla();
async function mostrarTabla(){
    const tablaStats = document.querySelector("#statsJugadores");
    tablaStats.innerHTML = "";
    try {
        let response;
        let data;
        switch (filtroTabla.value) {
            case "ID":
                response = await fetch(url);
                data = await response.json();
                break;
            case "Mas puntos":
                response = await fetch(url+"/?sortBy=ppp&order=desc");
                data = await response.json();
                break;
            case "Mas asistencias":
                response = await fetch(url+"/?sortBy=app&order=desc");
                data = await response.json();
                break;
            case "Mas rebotes":
                response = await fetch(url+"/?sortBy=rpp&order=desc");
                data = await response.json();
                break;
        }
        tablaStats.innerHTML = `<tr>
                                <td>Nombre</td>
                                <td>Equipo</td>
                                <td>Puntos p.p</td>
                                <td>Asistencias p.p</td>
                                <td>Rebotes p.p</td>
                                </tr>`;
        for (const jugador of data) {
            let nombre = jugador.nombre;
            let equipo = jugador.equipo;
            let ppp = jugador.ppp;
            let app = jugador.app;
            let rpp = jugador.rpp;
            id = jugador.id;
            tablaStats.innerHTML += `<tr>
                                    <td>${nombre}</td>
                                    <td>${equipo}</td>
                                    <td>${ppp}</td>
                                    <td>${app}</td>
                                    <td>${rpp}<button class="${id}" onclick="eliminarFila(${id})"><img src="images/bin.png"></button><button class="${id}" onclick="editarFila(${id})"><img src="images/editar.png"></button></td>
                                    </tr>`;
        } //Entendemos que usar OnClick puede llegar a ser de mala practica pero, intentamos de las otras formas y no andaba.
    } catch (error) {
        console.log(error);
    }
}
let btnAgregar = document.querySelector("#agregar");
btnAgregar.addEventListener("click", agregarATabla); 
async function agregarATabla(){
    let jugador = document.querySelector("#inp-jugador").value;
    let equipo = document.querySelector("#inp-equipo").value;
    let puntos = document.querySelector("#inp-ppp").value;
    let asistencias = document.querySelector("#inp-app").value;
    let rebotes = document.querySelector("#inp-rpp").value;
    let jugadoresAgregados = {
        "nombre": jugador,
        "equipo": equipo,
        "ppp": puntos,
        "app": asistencias,
        "rpp": rebotes,
    }
    try{
        let response = await fetch(url,{
            method:"POST",
            headers:{
                "content-type":"Application/JSON",
            },
            body: JSON.stringify(jugadoresAgregados),
        });
    } catch(error){
        console.log(error);
    }
    mostrarTabla();
};
async function eliminarFila(id){
    let response = await fetch(url+"/"+id,{
        method: "DELETE",
    });
    mostrarTabla();
}
async function editarFila(id){
    let jugador = document.querySelector("#inp-jugador").value;
    let equipo = document.querySelector("#inp-equipo").value;
    let puntos = document.querySelector("#inp-ppp").value;
    let asistencias = document.querySelector("#inp-app").value;
    let rebotes = document.querySelector("#inp-rpp").value;
    let jugadoresAgregados = {
        "nombre": jugador,
        "equipo": equipo,
        "ppp": puntos,
        "app": asistencias,
        "rpp": rebotes,
    }
    try{
        let response = await fetch(url+"/"+id,{
            method: "PUT",
            headers:{
                "content-type":"Application/JSON",
            },
            body: JSON.stringify(jugadoresAgregados),
        })
    } catch(error){
        console.log(error);
    }
    mostrarTabla();
}
document.querySelector("#agregarTres").addEventListener("click",async function(){ //La funcion es async porque
    for(let i=0;i<3;i++){                                                         //sino habia veces que tomaba 2/3 veces
        await agregarATabla();                                                    //el mismo id.
    }
})