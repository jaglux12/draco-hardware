import { GIST_FILENAME_LISTA_VENTAS, GIST_FILENAME_TIPOS, GIST_ID_LISTA_VENTAS, GIST_ID_TIPOS } from "./constantes.js";



export async function addGrafico(){

    // let ventasRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_LISTA_VENTAS}`),
    //         listaVentas = await ventasRespuesta.json(),
    //         ventas = await JSON.parse(listaVentas.files[GIST_FILENAME_LISTA_VENTAS].content)
    
    // let tiposRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_TIPOS}`),
    //     tipos = await tiposRespuesta.json(),
    //     listaTipos = await JSON.parse(tipos.files[GIST_FILENAME_TIPOS].content)

    // let DATOS = []

    
    // listaTipos.forEach(tipo =>{
    //     ventas.forEach(element => {
    //         let productos = element.descripcion.split("__")
    //         productos.forEach(producto => { 
    //             if(producto.startsWith(tipo.tipo_producto)){
    //                 DATOS.push({
    //                     tipo:tipo.tipo_producto,
    //                     cantidad:producto.split("=")[1f]
    //                 })
    //             }
    //         })
    //     }) 
    // }) 

    // console.log(DATOS)


    // const $grafica = document.querySelector("#grafica");

    // const etiquetas = ["Enero","Febrero","Marzo","Abril"];

    // const datosVentas2020 = {
    //     label: "Ventas de productos",
    //     data: [5000, 1500, 8000, 5102],
    //     backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    //     borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    //     borderWidth: 1,// Ancho del borde
    // };

    // new Chart($grafica, {
    //     type: 'line',// Tipo de gráfica
    //     data: {
    //         labels: etiquetas,
    //         datasets: [
    //             datosVentas2020,
    //             // Aquí más datos...
    //         ]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }],
    //         },
    //     }
    // });

}