import { GIST_FILENAME_CLIENTES, GIST_FILENAME_LISTA_VENTAS, GIST_FILENAME_MEDIO_PAGO, GIST_FILENAME_PRODUCTOS, GIST_FILENAME_STOCK, GIST_FILENAME_VENTAS_ESTADISTICA, GIST_ID_CLIENTES, GIST_ID_LISTA_VENTAS, GIST_ID_MEDIO_PAGOS, GIST_ID_PRODUCTOS, GIST_ID_STOCK, GIST_ID_VENTAS_ESTADISTICA, TOKEN } from "./constantes.js"

const $template = document.querySelector("#templates").content,
        $templateRowVentasModal = $template.querySelector("#template-ventas-modal"),
      $fragmentoRowVentasModal = document.createDocumentFragment(),
      $templateRowVentas = $template.querySelector("#template-row-ventas"),
      $templateOptionPagos = $template.querySelector("#template-pagos"),
      $fragmentoPagos = document.createDocumentFragment(),
      $templateRowClientesModal = $template.querySelector("#template-row-clientes-modal"),
      $fragmentoClientesModal = document.createDocumentFragment(),
      $templateRowVenta = $template.querySelector("#template-row-venta"),
      $fragmentoVenta = document.createDocumentFragment()

export function eliminarDatosVentas_modal(){
    document.querySelectorAll("#table-ventas-dialogo tr").forEach(element => {
        element.classList.remove("filterNone")
    })
    document.querySelectorAll("#table-ventas-dialogo *").forEach(element => {
        element.parentNode.removeChild(element)
    })
}

export function seleccionarClienteModal(event){
    if(event.target.nodeName != "IMG"){
        document.querySelector("#tbIdCliente").value = event.target.dataset.dni
        document.querySelector("#my_modal_2").close()
    }else{
        document.querySelector("#tbIdCliente").value = event.target.parentNode.dataset.dni
        document.querySelector("#my_modal_2").close()
    }
}

export async function pushVentas(){

    const $ventas = document.querySelectorAll("#table-listaVentas tr"),
                        VENTAS = []

    $ventas.forEach(element => {
        VENTAS.push({
            dni: element.dataset.dni,
            descripcion: element.dataset.descripcion,
            total: element.dataset.total,
            fecha: element.dataset.fecha,
            tipoPago: element.dataset.tipoPago,
            pagado:element.dataset.pagado
        })
    })
    const req = await fetch(`https://api.github.com/gists/${GIST_ID_LISTA_VENTAS}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
                files: {
                [GIST_FILENAME_LISTA_VENTAS]: {
                    content: JSON.stringify(VENTAS),
                },
            },
            }),
        });

    return req.json();
}


export function eliminarDatosClientes_Modal(){
    document.querySelectorAll("#table-clientes-dialogo *").forEach(element => {
        element.parentNode.removeChild(element)
    })
}

export async function getMedioPago(){
    try {
        let pagosRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_MEDIO_PAGOS}`),
            pagos = await pagosRespuesta.json(),
            listaPagos = await JSON.parse(pagos.files[GIST_FILENAME_MEDIO_PAGO].content)

            listaPagos.forEach(element => {
                $templateOptionPagos.textContent = element.nombre
                let $clone = document.importNode($templateOptionPagos,true)
                $fragmentoPagos.appendChild($clone)
                document.querySelector("#lista-pagos").appendChild($fragmentoPagos)
            })
    } catch (error) {
        alert(error)
        console.log(error)
    }
}

export async function syncRowClientes_Modal(){
    try {
        let clientesRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_CLIENTES}`),
            listaClientes = await clientesRespuesta.json(),
            clientes = await JSON.parse(listaClientes.files[GIST_FILENAME_CLIENTES].content)
        
            clientes.forEach(element => {
                $templateRowClientesModal.querySelector(".dni").textContent = element.dni
                $templateRowClientesModal.querySelector(".nombre").textContent = element.nombre
                $templateRowClientesModal.querySelector(".apellido").textContent = element.apellido 
                $templateRowClientesModal.querySelector(".direccion").textContent = element.direccion

                $templateRowClientesModal.querySelector("#bSeleccionarClienteModal").dataset.dni = element.dni
                let $clone = document.importNode($templateRowClientesModal,true)
                $clone.dataset.id = element.id
                $fragmentoClientesModal.appendChild($clone)
                document.querySelector("#table-clientes-dialogo").appendChild($fragmentoClientesModal)
            })
    } catch (error) {
        alert(error)
    }
}

export async function syncRowListaVentas(){
    try {
        let clientesRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_LISTA_VENTAS}`),
            listaClientes = await clientesRespuesta.json(),
            clientes = await JSON.parse(listaClientes.files[GIST_FILENAME_LISTA_VENTAS].content)
        
            clientes.forEach(element => {
                $templateRowVenta.querySelector(".dni").textContent = element.dni
                $templateRowVenta.querySelector(".descripcion").textContent = element.descripcion
                $templateRowVenta.querySelector(".total").textContent = element.total
                $templateRowVenta.querySelector(".fecha").textContent = element.fecha
                $templateRowVenta.querySelector(".tipoPago").textContent = element.tipoPago
                $templateRowVenta.querySelector(".pagado").textContent = element.pagado

                $templateRowVenta.dataset.dni = element.dni
                $templateRowVenta.dataset.descripcion = element.descripcion
                $templateRowVenta.dataset.total = element.total
                $templateRowVenta.dataset.fecha = element.fecha
                $templateRowVenta.dataset.tipoPago = element.tipoPago
                $templateRowVenta.dataset.pagado = element.pagado

                let $clone = document.importNode($templateRowVenta,true)
                $fragmentoVenta.appendChild($clone)
                document.querySelector("#table-listaVentas").appendChild($fragmentoVenta)
            })

    } catch (error) {
        alert(error)
    }
}


export async function syncRowVentas_Modal(){
    try {
        let productosRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_PRODUCTOS}`),
            listaProductos = await productosRespuesta.json(),
            productos = await JSON.parse(listaProductos.files[GIST_FILENAME_PRODUCTOS].content)
        
        let productosStock = await fetch(`https://api.github.com/gists/${GIST_ID_STOCK}`),
            listaStock = await productosStock.json(),
            stock = await JSON.parse(listaStock.files[GIST_FILENAME_STOCK].content)
        
            stock.forEach(stock => {
                productos.forEach(producto => {
                    if(stock.id_producto === producto.id){
                            $templateRowVentasModal.querySelector("#panel1").querySelector(".stat-title").textContent = producto.tipo
                            $templateRowVentasModal.querySelector("#panel1").querySelector(".stat-value").textContent = `$${stock.precioVenta}/u`
                            $templateRowVentasModal.querySelector("#panel1").querySelector("#modelo").textContent = producto.modelo 

                            $templateRowVentasModal.querySelector("#panel2").querySelector(".stat-title").textContent = "Stock"
                            $templateRowVentasModal.querySelector("#panel2").querySelector(".stat-value").textContent = stock.cantidad
                            
                            $templateRowVentasModal.querySelector("#bAgregarVenta").dataset.id = stock.id
                            $templateRowVentasModal.querySelector("#bAgregarVenta").dataset.tipo = producto.tipo
                            $templateRowVentasModal.querySelector("#bAgregarVenta").dataset.modelo = producto.modelo
                            $templateRowVentasModal.querySelector("#bAgregarVenta").dataset.precio = stock.precioVenta
                            $templateRowVentasModal.querySelector("#bAgregarVenta").dataset.cantidadDisponible = stock.cantidad
                            $templateRowVentasModal.querySelector("#bAgregarVenta").dataset.cantidadMinima = stock.stockMinimo

                            let $clone = document.importNode($templateRowVentasModal,true)
                            $clone.dataset.id = stock.id
                            $fragmentoRowVentasModal.appendChild($clone)
                            document.querySelector("#table-ventas-dialogo").appendChild($fragmentoRowVentasModal)
                    }
                })
            })

    } catch (error) {
        alert(error)
    }
}

export function seleccionarCliente(event){
    if(event.target.nodeName != "IMG"){
        document.querySelector("#tbIdProducto").value = event.target.dataset.id
        document.querySelector("#my_modal_1").close()
    }else{
        document.querySelector("#tbIdProducto").value = event.target.parentNode.dataset.id
        document.querySelector("#my_modal_1").close()
    }
}


export function venderProductos(){
    const $tbCliente = document.querySelector("#tbIdCliente"),
            $tbMedioPago = document.querySelector("#lista-pagos"),
            $tbPagado = document.querySelector("#tbPagado"),
            $listaProductos = document.querySelectorAll("#table-carroVentas tr")

    let descripcion = "",
        totalFactura = 0

    let fechaHoy = new Date(Date.now()).toLocaleDateString()

    $listaProductos.forEach(element => {
        descripcion+=` ${element.querySelector(".descripcion").textContent} =${element.querySelector(".cantidad").textContent}= __`
        totalFactura+=Number(element.querySelector(".total").textContent)
    })

    $templateRowVenta.querySelector(".dni").textContent = $tbCliente.value
    $templateRowVenta.querySelector(".descripcion").textContent = descripcion
    $templateRowVenta.querySelector(".total").textContent = totalFactura
    $templateRowVenta.querySelector(".fecha").textContent = fechaHoy
    $templateRowVenta.querySelector(".tipoPago").textContent = $tbMedioPago.value
    $templateRowVenta.querySelector(".pagado").textContent = $tbPagado.value

    $templateRowVenta.dataset.dni = $tbCliente.value
    $templateRowVenta.dataset.descripcion = descripcion
    $templateRowVenta.dataset.total = totalFactura
    $templateRowVenta.dataset.fecha = fechaHoy
    $templateRowVenta.dataset.tipoPago = $tbMedioPago.value
    $templateRowVenta.dataset.pagado = $tbPagado.value

    let $clone = document.importNode($templateRowVenta,true)
    $clone.dataset.id = $tbCliente.value

    document.querySelector("#table-listaVentas").appendChild($clone)
    $listaProductos.forEach(element =>{
        element.parentNode.removeChild(element)
    })
    $tbCliente.value = ""
    $tbPagado.value = ""
    $tbMedioPago.value = ""
}

export function agregarNuevaVenta(event){
    const $tbCantidad = document.querySelector("#tbCantidad"),
        $tbID_producto = document.querySelector("#tbIdProducto")
    let stockFinal = event.target.dataset.cantidad - $tbCantidad.value

    $templateRowVentas.querySelector(".descripcion").textContent = event.target.dataset.descripcion
    $templateRowVentas.querySelector(".cantidad").textContent = $tbCantidad.value
    $templateRowVentas.querySelector(".total").textContent = Number(event.target.dataset.precio) * Number($tbCantidad.value)

    let $clone = document.importNode($templateRowVentas,true)
    $clone.dataset.id = $tbID_producto.value

    document.querySelector("#table-carroVentas").appendChild($clone)

    $tbCantidad.value = ""
    $tbID_producto.value = ""
    document.querySelector("#tbIdCliente").value = " "
    document.querySelector("#lista-pagos").value = " "

}

export function eliminarVentaCarro(event){
    if(event.target.nodeName === "IMG"){
        document.querySelector("#table-carroVentas").removeChild(event.target.parentNode.parentNode.parentNode)
    }else{
        document.querySelector("#table-carroVentas").removeChild(event.target.parentNode.parentNode)
    }
}

export function seleccionarPVenta_Modal(event){
    if(event.target.nodeName != "IMG"){
        document.querySelector("#tbIdProducto").value = event.target.dataset.id
        document.querySelector("#bEnviarVenta").dataset.descripcion = `${event.target.dataset.tipo} ${event.target.dataset.modelo}`
        document.querySelector("#bEnviarVenta").dataset.cantidad = event.target.dataset.cantidadDisponible
        document.querySelector("#bEnviarVenta").dataset.precio = event.target.dataset.precio
        document.querySelector("#bEnviarVenta").dataset.cantidadMinima = event.target.dataset.cantidadMinima

        document.querySelector("#my_modal_1").close()
    }else{

        document.querySelector("#tbIdProducto").value = event.target.parentNode.dataset.id
        document.querySelector("#bEnviarVenta").dataset.descripcion = `${event.target.parentNode.dataset.tipo} ${event.target.parentNode.dataset.modelo}`
        document.querySelector("#bEnviarVenta").dataset.cantidad = event.target.parentNode.dataset.cantidadDisponible
        document.querySelector("#bEnviarVenta").dataset.precio = event.target.parentNode.dataset.precio
        document.querySelector("#bEnviarVenta").dataset.cantidadMinima = event.target.parentNode.dataset.cantidadMinima

        document.querySelector("#my_modal_1").close()
    }
}