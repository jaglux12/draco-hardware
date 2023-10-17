import { ACCION_STOCK, GIST_FILENAME_PRODUCTOS, GIST_FILENAME_STOCK, GIST_ID_PRODUCTOS, GIST_ID_STOCK, TAMANIO_PRODUCTO, TAMANIO_STOCK, TOKEN } from "./constantes.js"


const $template = document.querySelector("#templates").content,
        $templateRowProductosModal = $template.querySelector("#template-productos-modal"),
      $fragmentoRowProductosModal = document.createDocumentFragment(),
      $templateRowStock = $template.querySelector("#template-stock"),
      $fragmentoRowStock = document.createDocumentFragment()


      export async function syncRowProductos_Modal(){
    try {
        let productosRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_PRODUCTOS}`),
            listaProductos = await productosRespuesta.json(),
            productos = await JSON.parse(listaProductos.files[GIST_FILENAME_PRODUCTOS].content)
        
            productos.forEach(element => {
                $templateRowProductosModal.querySelector(".id").textContent = element.id
                $templateRowProductosModal.querySelector(".tipo").textContent = element.tipo
                $templateRowProductosModal.querySelector(".marca").textContent = element.marca 
                $templateRowProductosModal.querySelector(".modelo").textContent = element.modelo
                $templateRowProductosModal.querySelector(".descripcion").textContent = element.descripcion 

                $templateRowProductosModal.querySelector("#bSeleccionar").dataset.id = element.id
                let $clone = document.importNode($templateRowProductosModal,true)
                $clone.dataset.id = element.id
                $fragmentoRowProductosModal.appendChild($clone)
                document.querySelector("#table-productos-dialogo").appendChild($fragmentoRowProductosModal)
            })

            TAMANIO_PRODUCTO.length = productos.length

    } catch (error) {
        alert(error)
    }
}

export async function syncRowStock_Modal(){
    try {
        let productosRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_STOCK}`),
            listaProductos = await productosRespuesta.json(),
            productos = await JSON.parse(listaProductos.files[GIST_FILENAME_STOCK].content)
                    
            productos.forEach(element => {
                $templateRowStock.querySelector(".id").textContent = element.id
                $templateRowStock.querySelector(".id_producto").textContent = element.id_producto
                $templateRowStock.querySelector(".cantidad").textContent = element.cantidad 
                $templateRowStock.querySelector(".stockMinimo").textContent = element.stockMinimo
                $templateRowStock.querySelector(".ganancia").textContent = element.ganancia 
                $templateRowStock.querySelector(".precioUnitario").textContent = element.precioUnitario
                $templateRowStock.querySelector(".precioVenta").textContent = element.precioVenta 

                $templateRowStock.dataset.id = element.id
                $templateRowStock.dataset.id_producto = element.id_producto 
                $templateRowStock.dataset.cantidad = element.cantidad 
                $templateRowStock.dataset.stockMinimo = element.stockMinimo 
                $templateRowStock.dataset.ganancia =  element.ganancia
                $templateRowStock.dataset.precioUnitario =  element.precioUnitario
                $templateRowStock.dataset.precioVenta =  element.precioVenta

                $templateRowStock.querySelector("#bEditarStock").dataset.id = element.id
                $templateRowStock.querySelector("#bEditarStock").dataset.id_producto = element.id_producto
                $templateRowStock.querySelector("#bEditarStock").dataset.cantidad = element.cantidad
                $templateRowStock.querySelector("#bEditarStock").dataset.stockMinimo = element.stockMinimo
                $templateRowStock.querySelector("#bEditarStock").dataset.ganancia = element.ganancia
                $templateRowStock.querySelector("#bEditarStock").dataset.precioUnitario = element.precioUnitario
                $templateRowStock.querySelector("#bEditarStock").dataset.precioVenta = element.precioVenta

                $templateRowStock.querySelector("#bEliminarStock").dataset.id = element.id
                let $clone = document.importNode($templateRowStock,true)
                $clone.dataset.id = element.id
                $fragmentoRowStock.appendChild($clone)
                document.querySelector("#table-stock").appendChild($fragmentoRowStock)
            })

            TAMANIO_STOCK.length = productos.length

    } catch (error) {
        alert(error)
    }
}
export function eliminarTodosProductos(){
    document.querySelectorAll("#table-productos-dialogo tr").forEach(element => {
        element.parentNode.removeChild(element)
    })
}

export function eliminarStock(event){
    if(event.target.nodeName === "IMG"){
        document.querySelector("#table-stock").removeChild(event.target.parentNode.parentNode.parentNode)
    }else{
        document.querySelector("#table-stock").removeChild(event.target.parentNode.parentNode)
    }
    // event.target.parentNode.parentNode.removeChild(event.target)
    // console.log(event.target.parentNode.parentNode)
}

export function seleccionarProducto(event){
    if(event.target.nodeName != "IMG"){
        document.querySelector("#tbIdProducto").value = event.target.dataset.id
        document.querySelector("#my_modal_1").close()
    }else{
        document.querySelector("#tbIdProducto").value = event.target.parentNode.dataset.id
        document.querySelector("#my_modal_1").close()
    }
}

export function eliminarFiltrosBusqueda_stock(){
    document.querySelector("#filtroProducto-dialogo").value = ""
    document.querySelector("#tbBuscarProducto-dialogo").value = ""
    document.querySelectorAll("#table-productos-dialogo tr").forEach(element => {
        element.classList.remove("filterNone")
    })
}


export function buscarProducto_stock(){
    const $productos = document.querySelectorAll("#table-productos-dialogo tr"),
            $listaFiltro = document.querySelector("#filtroProducto-dialogo"),
            $tbBuscar = document.querySelector("#tbBuscarProducto-dialogo")

    if($listaFiltro.value.includes("Tipo")){
        $productos.forEach(element => {
            let tipo = element.dataset.tipo.toLowerCase()
            if(tipo.startsWith($tbBuscar.value.toLowerCase())){
                element.classList.remove("filterNone")
            }else{
                element.classList.add("filterNone")
            }
        })
    }

    if($listaFiltro.value.includes("Marca")){
        $productos.forEach(element => {
            let tipo = element.dataset.marca.toLowerCase()
            if(tipo.startsWith($tbBuscar.value.toLowerCase())){
                element.classList.remove("filterNone")
            }else{
                element.classList.add("filterNone")
            }
        })
    }

    if($listaFiltro.value.includes("Modelo")){
        $productos.forEach(element => {
            let tipo = element.dataset.modelo.toLowerCase()
            if(tipo.startsWith($tbBuscar.value.toLowerCase())){
                element.classList.remove("filterNone")
            }else{
                element.classList.add("filterNone")
            }
        })
    }

    if($listaFiltro.value.includes("Descripcion")){
        $productos.forEach(element => {
            let tipo = element.dataset.descripcion.toLowerCase()
            if(tipo.startsWith($tbBuscar.value.toLowerCase())){
                element.classList.remove("filterNone")
            }else{
                element.classList.add("filterNone")
            }
        })
    }

}

export async function calcularGanancia(){
    let $tbGanancia = document.querySelector("#tbGanancia"),
    $tbPrecioUnitario = document.querySelector("#tbPrecioUnitario"),
    $tbPrecioVenta = document.querySelector("#tbPrecioVenta")

    let iva = Number($tbPrecioUnitario.value) + (Number($tbPrecioUnitario.value) * (21/100))
    let ganancia = iva * (Number($tbGanancia.value) / 100)
    let precio_venta = iva + ganancia
    $tbPrecioVenta.value = precio_venta
}

export async function addStock(){

    if(!ACCION_STOCK.status){

        const $tbID_producto = document.querySelector("#tbIdProducto"),
        $tbCantidad = document.querySelector("#tbCantidad"),
        $tbStockMinimo = document.querySelector("#tbStockMinimo"),
        $tbGanancia = document.querySelector("#tbGanancia"),
        $tbPrecioUnitario = document.querySelector("#tbPrecioUnitario"),
        $tbPrecioVenta = document.querySelector("#tbPrecioVenta")
    
    let iva = Number($tbPrecioUnitario.value) + (Number($tbPrecioUnitario.value) * (21/100))
    let ganancia = iva * (Number($tbGanancia.value) / 100)
    let precio_venta = iva + ganancia

    $templateRowStock.querySelector(".id").textContent = TAMANIO_STOCK.length
    $templateRowStock.querySelector(".id_producto").textContent = $tbID_producto.value 
    $templateRowStock.querySelector(".cantidad").textContent = $tbCantidad.value 
    $templateRowStock.querySelector(".stockMinimo").textContent = $tbStockMinimo.value 
    $templateRowStock.querySelector(".ganancia").textContent = $tbGanancia.value
    $templateRowStock.querySelector(".precioUnitario").textContent = $tbPrecioUnitario.value
    $templateRowStock.querySelector(".precioVenta").textContent = precio_venta
    

    $templateRowStock.dataset.id = TAMANIO_STOCK.length
    $templateRowStock.dataset.id_producto = $tbID_producto.value 
    $templateRowStock.dataset.cantidad = $tbCantidad.value 
    $templateRowStock.dataset.stockMinimo = $tbStockMinimo.value 
    $templateRowStock.dataset.ganancia =  $tbGanancia.value
    $templateRowStock.dataset.precioUnitario = $tbPrecioUnitario.value
    $templateRowStock.dataset.precioVenta = precio_venta

    $templateRowStock.querySelector("#bEditarStock").dataset.id = TAMANIO_STOCK.length
    $templateRowStock.querySelector("#bEditarStock").dataset.id_producto = $tbID_producto.value
    $templateRowStock.querySelector("#bEditarStock").dataset.cantidad =  $tbCantidad.value 
    $templateRowStock.querySelector("#bEditarStock").dataset.stockMinimo = $tbStockMinimo.value 
    $templateRowStock.querySelector("#bEditarStock").dataset.ganancia = $tbGanancia.value
    $templateRowStock.querySelector("#bEditarStock").dataset.precioUnitario = $tbPrecioUnitario.value
    $templateRowStock.querySelector("#bEditarStock").dataset.precioVenta = precio_venta
    $templateRowStock.querySelector("#bEliminarStock").dataset.id = TAMANIO_STOCK.length

    let $clone = document.importNode($templateRowStock,true)
    $clone.dataset.id = TAMANIO_STOCK.length
    $fragmentoRowStock.appendChild($clone)
    document.querySelector("#table-stock").appendChild($fragmentoRowStock)
    eliminarDatos_Stock()
    TAMANIO_STOCK.length++

    }else{
        // cuando está activa la opción de editar, simplemente cambiamos las propiedades del tr que elegimos con las nuevas que ingresamos
        const $tbID_producto = document.querySelector("#tbIdProducto"),
        $tbGanancia = document.querySelector("#tbGanancia"),
        $tbPrecioUnitario = document.querySelector("#tbPrecioUnitario"),
        $tbPrecioVenta = document.querySelector("#tbPrecioVenta"),
        $tbCantidad = document.querySelector("#tbCantidad"),
        $tbStockMinimo = document.querySelector("#tbStockMinimo"),
        $stock = document.querySelectorAll("#table-stock tr")

        $stock.forEach(element => {
            if(element.dataset.id === ACCION_STOCK.id){
                element.querySelector(".id_producto").textContent = $tbID_producto.value
                element.querySelector(".cantidad").textContent = $tbCantidad.value 
                element.querySelector(".stockMinimo").textContent = $tbStockMinimo.value 
                element.querySelector(".ganancia").textContent = $tbGanancia.value
                element.querySelector(".precioUnitario").textContent = $tbPrecioUnitario.value
                element.querySelector(".precioVenta").textContent = $tbPrecioVenta.value

                element.dataset.id = ACCION_STOCK.id
                element.dataset.id_producto = $tbID_producto.value
                element.dataset.cantidad = $tbCantidad.value
                element.dataset.stockMinimo = $tbStockMinimo.value
                element.dataset.ganancia = $tbGanancia.value
                element.dataset.precioUnitario = $tbPrecioUnitario.value
                element.dataset.precioVenta = $tbPrecioVenta.value
                
                element.querySelector("#bEditarStock").dataset.id_producto = $tbID_producto.value
                element.querySelector("#bEditarStock").dataset.cantidad = $tbCantidad.value
                element.querySelector("#bEditarStock").dataset.stockMinimo = $tbStockMinimo.value 
                element.querySelector("#bEditarStock").dataset.ganancia = $tbGanancia.value
                element.querySelector("#bEditarStock").dataset.precioUnitario = $tbPrecioUnitario.value
                element.querySelector("#bEditarStock").dataset.precioVenta = $tbPrecioVenta.value
                element.querySelector("#bEliminarStock").dataset.id = ACCION_STOCK.id
            }
        })

        eliminarDatos_Stock()
        ACCION_STOCK.status = false
        ACCION_STOCK.id = -1

    // let $clone = document.importNode($templateRowProductos,true)
    // $clone.dataset.id = PRODUCTOS.length
    // $fragmentoRowProductos.appendChild($clone)
    // document.querySelector("#table-productos").appendChild($fragmentoRowProductos)
    // PRODUCTOS.push(prodInterno)
    // eliminarDatos()

    }
}

function eliminarDatos_Stock(){
    document.querySelector("#tbIdProducto").value = ""
    document.querySelector("#tbCantidad").value = ""
    document.querySelector("#tbStockMinimo").value = ""
    document.querySelector("#tbGanancia").value = ""
    document.querySelector("#tbPrecioUnitario").value = ""
    document.querySelector("#tbPrecioVenta").value = ""
}

export async function pushStock(){

    const $stock = document.querySelectorAll("#table-stock tr"),
                        STOCK = []
    
    $stock.forEach(element => {
        STOCK.push({
            id: element.dataset.id,
            id_producto: element.dataset.id_producto,
            cantidad: element.dataset.cantidad,
            stockMinimo: element.dataset.stockMinimo,
            ganancia: element.dataset.ganancia,
            precioUnitario:element.dataset.precioUnitario,
            precioVenta: element.dataset.precioVenta
        })
    })

    const req = await fetch(`https://api.github.com/gists/${GIST_ID_STOCK}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
                files: {
                [GIST_FILENAME_STOCK]: {
                    content: JSON.stringify(STOCK),
                },
            },
            }),
        });

    return req.json();
}

export function editarStock(event){
    
    const $tbID_producto = document.querySelector("#tbIdProducto"),
        $tbCantidad = document.querySelector("#tbCantidad"),
        $tbStockMinimo = document.querySelector("#tbStockMinimo"),
        $tbPrecioUnitario = document.querySelector("#tbPrecioUnitario"),
        $tbGanancia = document.querySelector("#tbGanancia"),
        $tbPrecioVenta = document.querySelector("#tbPrecioVenta")


    if(event.target.nodeName === "IMG"){

        $tbID_producto.value = event.target.parentNode.dataset.id_producto
        $tbCantidad.value = event.target.parentNode.dataset.cantidad
        $tbStockMinimo.value = event.target.parentNode.dataset.stockMinimo
        $tbPrecioUnitario.value = event.target.parentNode.dataset.precioUnitario
        $tbGanancia.value = event.target.parentNode.dataset.ganancia
        $tbPrecioVenta.value = event.target.parentNode.dataset.precioVenta

        ACCION_STOCK.status = true
        ACCION_STOCK.id = event.target.parentNode.dataset.id

    }else{

        $tbID_producto.value = event.target.dataset.id_producto
        $tbCantidad.value = event.target.dataset.cantidad
        $tbStockMinimo.value = event.target.dataset.stockMinimo
        $tbPrecioUnitario.value = event.target.dataset.precioUnitario
        $tbGanancia.value = event.target.dataset.ganancia
        $tbPrecioVenta.valeu = event.target.dataset.precioVenta

        ACCION_STOCK.status = true
        ACCION_STOCK.id = event.target.dataset.id

    }

    
}