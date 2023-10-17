import { addCliente, editarCliente, eliminarCliente, pushClientes, syncRowClientes } from "./clientes.js";
import { FRAME_ACTIVE } from "./constantes.js"
import { addGrafico } from "./masvendidos.js";
import { addProducto, buscarProducto, editarProducto, eliminarFiltrosBusqueda, eliminarProducto, getListMarcas, getListModelos, getListTipos, pushProducts, syncRowProductos } from "./productos.js";
import { generaReporteCliente, generaReporteProductos, generarFacturasCobrar, generarStockRellenar } from "./reportes.js";
import { addStock, calcularGanancia, editarStock, eliminarFiltrosBusqueda_stock, eliminarStock, eliminarTodosProductos, pushStock, seleccionarProducto, syncRowProductos_Modal, syncRowStock_Modal } from "./stock.js";
import { agregarNuevaVenta, eliminarDatosClientes_Modal, eliminarDatosVentas_modal, eliminarVentaCarro, getMedioPago, pushVentas, seleccionarClienteModal, seleccionarPVenta_Modal, syncRowClientes_Modal, syncRowListaVentas, syncRowVentas_Modal, venderProductos } from "./ventas.js";

document.addEventListener("click", event => {
    event.preventDefault()

    if(event.target.matches("#productos *") || event.target.matches("#productos") ){
        if(!FRAME_ACTIVE[0].status){
            fetch("productos.html")
            .then(res => res.text())
            .then(html => {
                document.querySelector("#main-content").innerHTML = html
                getListMarcas()
                getListModelos()
                getListTipos()
                syncRowProductos()
                FRAME_ACTIVE.forEach(element => {
                    element.status = false
                })
                FRAME_ACTIVE[0].status = true
            })
            .catch(function(err) {  
                console.log('Failed to fetch page: ', err);  
            });
        } 
    }

    if(event.target.matches("#stock *") || event.target.matches("#stock") ){
        if(!FRAME_ACTIVE[2].status){
            fetch("stock.html")
            .then(res => res.text())
            .then(html => {
                document.querySelector("#main-content").innerHTML = html
                syncRowStock_Modal()
                FRAME_ACTIVE.forEach(element => {
                    element.status = false
                })
                FRAME_ACTIVE[2].status = true
            })
            .catch(function(err) {  
                console.log('Failed to fetch page: ', err);  
            });
        } 
    }

    if(event.target.matches("#menu-principal *") || event.target.matches("#menu-principal") ){
        if(!FRAME_ACTIVE[1].status){
            fetch("main-content.html")
            .then(res => res.text())
            .then(html => {
                document.querySelector("#main-content").innerHTML = html
                FRAME_ACTIVE.forEach(element => {
                    element.status = false
                })
                FRAME_ACTIVE[1].status = true
            })
            .catch(function(err) {  
                console.log('Failed to fetch page: ', err);  
            });
        } 
    }

    if(event.target.matches("#ventas *") || event.target.matches("#ventas") ){
        if(!FRAME_ACTIVE[4].status){
            fetch("ventas.html")
            .then(res => res.text())
            .then(html => {
                document.querySelector("#main-content").innerHTML = html
                getMedioPago()
                syncRowListaVentas()
                FRAME_ACTIVE.forEach(element => {
                    element.status = false
                })
                FRAME_ACTIVE[4].status = true
            })
            .catch(function(err) {  
                console.log('Failed to fetch page: ', err);  
            });
        } 
    }

    if(event.target.matches("#clientes *") || event.target.matches("#clientes") ){
        if(!FRAME_ACTIVE[3].status){
            fetch("clientes.html")
            .then(res => res.text())
            .then(html => {
                document.querySelector("#main-content").innerHTML = html
                syncRowClientes()
                FRAME_ACTIVE.forEach(element => {
                    element.status = false
                })
                FRAME_ACTIVE[3].status = true
            })
            .catch(function(err) {  
                console.log('Failed to fetch page: ', err);  
            });
        } 
    }

    if(event.target.matches("#reportes *") || event.target.matches("#reportes") ){
        if(!FRAME_ACTIVE[5].status){
            fetch("reportes.html")
            .then(res => res.text())
            .then(html => {
                document.querySelector("#main-content").innerHTML = html
                FRAME_ACTIVE.forEach(element => {
                    element.status = false
                })
                FRAME_ACTIVE[5].status = true
            })
            .catch(function(err) {  
                console.log('Failed to fetch page: ', err);  
            });
        } 
    }

    if(event.target.matches("#bProductosMasVendidos *") || event.target.matches("#bProductosMasVendidos") ){
        if(!FRAME_ACTIVE[6].status){
            fetch("masvendidos.html")
            .then(res => res.text())
            .then(html => {
                document.querySelector("#main-content").innerHTML = html
                addGrafico()
                FRAME_ACTIVE.forEach(element => {
                    element.status = false
                })
                FRAME_ACTIVE[6].status = true
            })
            .catch(function(err) {  
                console.log('Failed to fetch page: ', err);  
            });
        } 
    }

    if(event.target.matches("#push *") || event.target.matches("#push") ){
        if(FRAME_ACTIVE[0].status){
            pushProducts()
        }
        if(FRAME_ACTIVE[2].status){
            pushStock()
        }
        if(FRAME_ACTIVE[3].status){
            pushClientes()
        }

        if(FRAME_ACTIVE[4].status){
            pushVentas()
        }
    }

    if(event.target.matches("#btn-openmodal-stock *") || event.target.matches("#btn-openmodal-stock") ){
        eliminarTodosProductos()
        eliminarFiltrosBusqueda_stock()
        document.querySelector("#my_modal_1").showModal()
        syncRowProductos_Modal()
    }

    if(event.target.matches("#btn-openmodal-clientes *") || event.target.matches("#btn-openmodal-clientes") ){
        eliminarDatosClientes_Modal()
        document.querySelector("#my_modal_2").showModal()
        syncRowClientes_Modal()
    }

    if(event.target.matches("#btn-openmodal-ventas *") || event.target.matches("#btn-openmodal-ventas") ){
        eliminarDatosVentas_modal()
        document.querySelector("#my_modal_1").showModal()
        syncRowVentas_Modal()
    }

    if(event.target.matches("#bGenerarReporteProductos") || event.target.matches("#bGenerarReporteProductos *")){
        generaReporteProductos()
    }

    if(event.target.matches("#bGenerarReporteFacturasVencidas") || event.target.matches("#bGenerarReporteFacturasVencidas *")){
        generarFacturasCobrar()
    }

    if(event.target.matches("#bGenerarReporteStockFalta") || event.target.matches("#bGenerarReporteStockFalta *")){
        generarStockRellenar()
    }

    if(event.target.matches("#bGenerarReporteCliente") || event.target.matches("#bGenerarReporteCliente *")){
        generaReporteCliente()
    }

    if(event.target.matches("#bSeleccionar") || event.target.matches("#bSeleccionar *")){
        seleccionarProducto(event)
    }
    
    if(event.target.matches("#bSeleccionarClienteModal") || event.target.matches("#bSeleccionarClienteModal *")){
        seleccionarClienteModal(event)
    }

    if(event.target.matches("#bVenderProducto") || event.target.matches("#bVenderProducto *")){
        venderProductos()
    }

    if(event.target.matches("#bEnviarProducto") || event.target.matches("#bEnviarProducto *")){
        addProducto()
    }

    if(event.target.matches("#bEnviarCliente") || event.target.matches("#bEnviarCliente *")){
        addCliente()
    }

    if(event.target.matches("#bEditarCliente") || event.target.matches("#bEditarCliente *")){
        editarCliente(event)
    }

    if(event.target.matches("#bEnviarStock") || event.target.matches("#bEnviarStock *")){
        addStock()
    }

    if (event.target.matches("#bEditar") || event.target.matches("#bEditar *")) {
        editarProducto(event)
    }

    if (event.target.matches("#bEditarStock") || event.target.matches("#bEditarStock *")) {
        editarStock(event)
    }

    if(event.target.matches("#bEliminar") || event.target.matches("#bEliminar *")){
        eliminarProducto(event)
    }

    if(event.target.matches("#bEliminarStock") || event.target.matches("#bEliminarStock *")){
        eliminarStock(event)
    }

    if(event.target.matches("#bBuscarProducto") || event.target.matches("#bBuscarProducto *")){
        buscarProducto()
    }

    if(event.target.matches("#bEliminarFiltros") || event.target.matches("#bEliminarFiltros ")){
        eliminarFiltrosBusqueda()
    }

    if(event.target.matches("#bEnviarVenta") || event.target.matches("#bEnviarVenta *")){
        agregarNuevaVenta(event)
    }

    if(event.target.matches("#bEliminarCarro") || event.target.matches("#bEliminarCarro *")){
        eliminarVentaCarro(event)
    }

    if(event.target.matches("#bEliminarCliente") || event.target.matches("#bEliminarCliente *")){
        eliminarCliente(event)
    }

    if(event.target.matches("#bAgregarVenta") || event.target.matches("#bAgregarVenta *")){
        seleccionarPVenta_Modal(event)
    }

    if(event.target.matches("#bCalcGanancia") || event.target.matches("#bCalcGanancia *")){
        calcularGanancia()
    }

})

document.addEventListener("DOMContentLoaded",event => {
    fetch("main-content.html")
    .then(res => res.text())
    .then(html => {
        document.querySelector("#main-content").innerHTML = html
        FRAME_ACTIVE[1].status = true
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
})