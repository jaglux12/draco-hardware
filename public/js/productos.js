import { ACCION_PRODUCTOS, GIST_FILENAME_MARCAS, GIST_FILENAME_MODELOS, GIST_FILENAME_PRODUCTOS, GIST_FILENAME_TIPOS, GIST_ID_MARCAS, GIST_ID_MODELOS, GIST_ID_PRODUCTOS, GIST_ID_TIPOS, TAMANIO_PRODUCTO, TOKEN } from "./constantes.js"


const $template = document.querySelector("#templates").content,
        $templateRowProductos = $template.querySelector("#template-productos"),
        $fragmentoRowProductos = document.createDocumentFragment(),
        $templateListMarcas = $template.querySelector("#template-marcas"),
        $fragmentoListMarcas = document.createDocumentFragment(),
        $templateListModelos = $template.querySelector("#template-modelos"),
        $fragmentoListModelos = document.createDocumentFragment(),
        $templateListTipos = $template.querySelector("#template-tipos"),
        $fragmentoListTipos = document.createDocumentFragment()


export async function getListMarcas(){
    try {
        let marcasRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_MARCAS}`),
            marcas = await marcasRespuesta.json(),
            listaMarcas = await JSON.parse(marcas.files[GIST_FILENAME_MARCAS].content)

            listaMarcas.forEach(element => {
                $templateListMarcas.textContent = element.nombre_marca
                let $clone = document.importNode($templateListMarcas,true)
                $fragmentoListMarcas.appendChild($clone)
                document.querySelector("#lista-marcas").appendChild($fragmentoListMarcas)
            })
    } catch (error) {
        alert(error)
    }
}

export async function getListModelos(){
    try {
        let modelosRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_MODELOS}`),
            modelos = await modelosRespuesta.json(),
            listaModelos = await JSON.parse(modelos.files[GIST_FILENAME_MODELOS].content)

            listaModelos.forEach(element => {
                $templateListModelos.textContent = element.nombre_modelo
                let $clone = document.importNode($templateListModelos,true)
                $fragmentoListModelos.appendChild($clone)
                document.querySelector("#lista-modelos").appendChild($fragmentoListModelos)
            })
    } catch (error) {
        alert(error)
    }
}

export async function getListTipos(){
    try {
        let tiposRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_TIPOS}`),
            tipos = await tiposRespuesta.json(),
            listaTipos = await JSON.parse(tipos.files[GIST_FILENAME_TIPOS].content)

            listaTipos.forEach(element => {
                $templateListTipos.textContent = element.tipo_producto
                let $clone = document.importNode($templateListTipos,true)
                $fragmentoListTipos.appendChild($clone)
                document.querySelector("#lista-tipos").appendChild($fragmentoListTipos)
            })
    } catch (error) {
        alert(error)
    }
}

export async function getProductos(){
    try {
        let tiposRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_PRODUCTOS}`),
            tipos = await tiposRespuesta.json(),
            listaTipos = await JSON.parse(tipos.files[GIST_FILENAME_PRODUCTOS].content)

            listaTipos.forEach(element => {
                $templateListTipos.textContent = element.tipo_producto
                let $clone = document.importNode($templateListTipos,true)
                $fragmentoListTipos.appendChild($clone)
                document.querySelector("#lista-tipos").appendChild($fragmentoListTipos)
            })
    } catch (error) {
        alert(error)
    }
}

export async function addProducto(data){

    if(!ACCION_PRODUCTOS.status){

        const $listaTipo = document.querySelector("#lista-tipos"),
        $listaMarcas = document.querySelector("#lista-marcas"),
        $listaModelos = document.querySelector("#lista-modelos"),
        $descripcion = document.querySelector("#descripcion")

    $templateRowProductos.querySelector(".id").textContent = TAMANIO_PRODUCTO.length
    $templateRowProductos.querySelector(".tipo").textContent = $listaTipo.value 
    $templateRowProductos.querySelector(".marca").textContent = $listaMarcas.value 
    $templateRowProductos.querySelector(".modelo").textContent = $listaModelos.value
    $templateRowProductos.querySelector(".descripcion").textContent = $descripcion.value 

    $templateRowProductos.dataset.id = TAMANIO_PRODUCTO.length
    $templateRowProductos.dataset.tipo = $listaTipo.value
    $templateRowProductos.dataset.marca = $listaMarcas.value
    $templateRowProductos.dataset.modelo = $listaModelos.value
    $templateRowProductos.dataset.descripcion = $descripcion.value

    $templateRowProductos.querySelector("#bEditar").dataset.id = TAMANIO_PRODUCTO.length
    $templateRowProductos.querySelector("#bEditar").dataset.tipo = $listaTipo.value
    $templateRowProductos.querySelector("#bEditar").dataset.marca = $listaMarcas.value 
    $templateRowProductos.querySelector("#bEditar").dataset.modelo = $listaModelos.value
    $templateRowProductos.querySelector("#bEditar").dataset.descripcion = $descripcion.value
    $templateRowProductos.querySelector("#bEliminar").dataset.id = TAMANIO_PRODUCTO.length

    let $clone = document.importNode($templateRowProductos,true)
    $clone.dataset.id = TAMANIO_PRODUCTO.length
    $fragmentoRowProductos.appendChild($clone)
    document.querySelector("#table-productos").appendChild($fragmentoRowProductos)
    eliminarDatos()

    }else{
        // cuando está activa la opción de editar, simplemente cambiamos las propiedades del tr que elegimos con las nuevas que ingresamos
        const $listaTipo = document.querySelector("#lista-tipos"),
        $listaMarcas = document.querySelector("#lista-marcas"),
        $listaModelos = document.querySelector("#lista-modelos"),
        $descripcion = document.querySelector("#descripcion"),
        $productos = document.querySelectorAll("#table-productos tr")

        $productos.forEach(element => {
            if(element.dataset.id === ACCION_PRODUCTOS.id){
                element.querySelector(".tipo").textContent = $listaTipo.value
                element.querySelector(".marca").textContent = $listaMarcas.value 
                element.querySelector(".modelo").textContent = $listaModelos.value
                element.querySelector(".descripcion").textContent = $descripcion.value 
                element.dataset.id = ACCION_PRODUCTOS.id
                element.dataset.tipo = $listaTipo.value
                element.dataset.marca = $listaMarcas.value
                element.dataset.modelo = $listaModelos.value
                element.dataset.descripcion = $descripcion.value
                element.querySelector("#bEditar").dataset.tipo = $listaTipo.value
                element.querySelector("#bEditar").dataset.marca = $listaMarcas.value 
                element.querySelector("#bEditar").dataset.modelo = $listaModelos.value
                element.querySelector("#bEditar").dataset.descripcion = $descripcion.value
                element.querySelector("#bEliminar").dataset.id = ACCION_PRODUCTOS.id
            }
        })

        eliminarDatos()
        ACCION_PRODUCTOS.status = false
        ACCION_PRODUCTOS.id = -1

    // let $clone = document.importNode($templateRowProductos,true)
    // $clone.dataset.id = PRODUCTOS.length
    // $fragmentoRowProductos.appendChild($clone)
    // document.querySelector("#table-productos").appendChild($fragmentoRowProductos)
    // PRODUCTOS.push(prodInterno)
    // eliminarDatos()

    }
}

export function eliminarProducto(event){
    if(event.target.nodeName === "IMG"){
        document.querySelector("#table-productos").removeChild(event.target.parentNode.parentNode.parentNode)
    }else{
        document.querySelector("#table-productos").removeChild(event.target.parentNode.parentNode)
    }
    // event.target.parentNode.parentNode.removeChild(event.target)
    // console.log(event.target.parentNode.parentNode)
}

export function buscarProducto(){
    const $productos = document.querySelectorAll("tbody tr"),
            $listaFiltro = document.querySelector("#filtroProducto"),
            $tbBuscar = document.querySelector("#tbBuscarProducto")

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

export function eliminarFiltrosBusqueda(){
    document.querySelector("#filtroProducto").value = ""
    document.querySelector("#tbBuscarProducto").value = ""
    document.querySelectorAll("tbody tr").forEach(element => {
        element.classList.remove("filterNone")
    })
}


export async function syncRowProductos(){
    try {
        let productosRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_PRODUCTOS}`),
            listaProductos = await productosRespuesta.json(),
            productos = await JSON.parse(listaProductos.files[GIST_FILENAME_PRODUCTOS].content)
        
            productos.forEach(element => {
                $templateRowProductos.querySelector(".id").textContent = element.id
                $templateRowProductos.querySelector(".tipo").textContent = element.tipo
                $templateRowProductos.querySelector(".marca").textContent = element.marca 
                $templateRowProductos.querySelector(".modelo").textContent = element.modelo
                $templateRowProductos.querySelector(".descripcion").textContent = element.descripcion 

                $templateRowProductos.dataset.id = element.id
                $templateRowProductos.dataset.tipo = element.tipo
                $templateRowProductos.dataset.marca = element.marca
                $templateRowProductos.dataset.modelo = element.modelo
                $templateRowProductos.dataset.descripcion = element.descripcion

                $templateRowProductos.querySelector("#bEditar").dataset.id = element.id
                $templateRowProductos.querySelector("#bEditar").dataset.tipo = element.tipo
                $templateRowProductos.querySelector("#bEditar").dataset.marca = element.marca
                $templateRowProductos.querySelector("#bEditar").dataset.modelo = element.modelo
                $templateRowProductos.querySelector("#bEditar").dataset.descripcion = element.descripcion
                $templateRowProductos.querySelector("#bEliminar").dataset.id = element.id
                let $clone = document.importNode($templateRowProductos,true)
                $clone.dataset.id = element.id
                $fragmentoRowProductos.appendChild($clone)
                document.querySelector("#table-productos").appendChild($fragmentoRowProductos)
            })

            TAMANIO_PRODUCTO.length = productos.length

    } catch (error) {
        alert(error)
    }
}

function eliminarDatos(){
    document.querySelector("#lista-tipos").value = ""
    document.querySelector("#lista-marcas").value = ""
    document.querySelector("#lista-modelos").value = ""
    document.querySelector("#descripcion").value = ""
}

export async function pushProducts(){

    const $productos = document.querySelectorAll("#table-productos tr"),
                        PRODUCTOS = []
    
    $productos.forEach(element => {
        PRODUCTOS.push({
            id: element.dataset.id,
            tipo: element.dataset.tipo,
            marca: element.dataset.marca,
            modelo: element.dataset.modelo,
            descripcion: element.dataset.descripcion 
        })
    })

    const req = await fetch(`https://api.github.com/gists/${GIST_ID_PRODUCTOS}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
                files: {
                [GIST_FILENAME_PRODUCTOS]: {
                    content: JSON.stringify(PRODUCTOS),
                },
            },
            }),
        });

    return req.json();
}

export function editarProducto(event){
    
    const $listaTipo = document.querySelector("#lista-tipos"),
        $listaMarcas = document.querySelector("#lista-marcas"),
        $listaModelos = document.querySelector("#lista-modelos"),
        $descripcion = document.querySelector("#descripcion")

    if(event.target.nodeName === "IMG"){
        $listaTipo.value = event.target.parentNode.dataset.tipo
        $listaMarcas.value = event.target.parentNode.dataset.marca
    $listaModelos.value = event.target.parentNode.dataset.modelo
    $descripcion.value = event.target.parentNode.dataset.descripcion

    ACCION_PRODUCTOS.status = true
    ACCION_PRODUCTOS.id = event.target.parentNode.dataset.id
    }else{
        $listaTipo.value = event.target.dataset.tipo
        $listaMarcas.value = event.target.dataset.marca
    $listaModelos.value = event.target.dataset.modelo
    $descripcion.value = event.target.dataset.descripcion

    ACCION_PRODUCTOS.status = true
    ACCION_PRODUCTOS.id = event.target.dataset.id
    }

    
}