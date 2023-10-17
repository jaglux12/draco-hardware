import { ACCION_CLIENTES, GIST_FILENAME_CLIENTES, GIST_ID_CLIENTES, TAMANIO_CLIENTES, TOKEN } from "./constantes.js"


const $template = document.querySelector("#templates").content,
        $templateRowClientes = $template.querySelector("#template-row-clientes"),
        $fragmentoClientes = document.createDocumentFragment()


function eliminarDatos_Cliente(){
    document.querySelector("#tbDniCliente").value = ""
    document.querySelector("#tbNombreCliente").value = ""
    document.querySelector("#tbApellidoCliente").value = ""
    document.querySelector("#tbDireccionCliente").value = ""
}

export function eliminarCliente(event){
    if(event.target.nodeName === "IMG"){
        document.querySelector("#table-clientes").removeChild(event.target.parentNode.parentNode.parentNode)
    }else{
        document.querySelector("#table-clientes").removeChild(event.target.parentNode.parentNode)
    }
}

export function addCliente(){

    if(!ACCION_CLIENTES.status){

        const $tbDniCliente = document.querySelector("#tbDniCliente"),
        $tbNombreCliente = document.querySelector("#tbNombreCliente"),
        $tbApellidoCliente = document.querySelector("#tbApellidoCliente"),
        $tbDireccionCliente = document.querySelector("#tbDireccionCliente")

    $templateRowClientes.querySelector(".dni").textContent = $tbDniCliente.value
    $templateRowClientes.querySelector(".nombre").textContent = $tbNombreCliente.value 
    $templateRowClientes.querySelector(".apellido").textContent = $tbApellidoCliente.value 
    $templateRowClientes.querySelector(".direccion").textContent = $tbDireccionCliente.value     

    $templateRowClientes.dataset.dni = $tbDniCliente.value
    $templateRowClientes.dataset.nombre = $tbNombreCliente.value 
    $templateRowClientes.dataset.apellido = $tbApellidoCliente.value 
    $templateRowClientes.dataset.direccion = $tbDireccionCliente.value 

    $templateRowClientes.querySelector("#bEditarCliente").dataset.dni = $tbDniCliente.value
    $templateRowClientes.querySelector("#bEditarCliente").dataset.nombre = $tbNombreCliente.value
    $templateRowClientes.querySelector("#bEditarCliente").dataset.apellido =  $tbApellidoCliente.value 
    $templateRowClientes.querySelector("#bEditarCliente").dataset.direccion = $tbDireccionCliente.value 

    let $clone = document.importNode($templateRowClientes,true)
    $clone.dataset.dni = $tbDniCliente.value
    $fragmentoClientes.appendChild($clone)
    document.querySelector("#table-clientes").appendChild($fragmentoClientes)
    TAMANIO_CLIENTES.length++
    eliminarDatos_Cliente()

    }else{
        // cuando está activa la opción de editar, simplemente cambiamos las propiedades del tr que elegimos con las nuevas que ingresamos
        const $tbDniCliente = document.querySelector("#tbDniCliente"),
        $tbNombreCliente = document.querySelector("#tbNombreCliente"),
        $tbApellidoCliente = document.querySelector("#tbApellidoCliente"),
        $tbDireccionCliente = document.querySelector("#tbDireccionCliente"),
        $clientes = document.querySelectorAll("#table-clientes tr")

        $clientes.forEach(element => {
            if(element.dataset.dni === ACCION_CLIENTES.id){
                element.querySelector(".dni").textContent = $tbDniCliente.value
                element.querySelector(".nombre").textContent = $tbNombreCliente.value 
                element.querySelector(".apellido").textContent = $tbApellidoCliente.value 
                element.querySelector(".direccion").textContent = $tbDireccionCliente.value

                element.dataset.dni = $tbDniCliente.value
                element.dataset.nombre = $tbNombreCliente.value 
                element.dataset.apellido = $tbApellidoCliente.value 
                element.dataset.direccion = $tbDireccionCliente.value
                
                element.querySelector("#bEditarCliente").dataset.dni = $tbDniCliente.value
                element.querySelector("#bEditarCliente").dataset.nombre = $tbNombreCliente.value
                element.querySelector("#bEditarCliente").dataset.apellido =  $tbApellidoCliente.value 
                element.querySelector("#bEditarCliente").dataset.direccion = $tbDireccionCliente.value 
            }
        })

        eliminarDatos_Cliente()
        ACCION_CLIENTES.status = false
        ACCION_CLIENTES.id = -1

    }
}

export async function syncRowClientes(){
    try {
        let clientesRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_CLIENTES}`),
            listaClientes = await clientesRespuesta.json(),
            clientes = await JSON.parse(listaClientes.files[GIST_FILENAME_CLIENTES].content)
        
            clientes.forEach(element => {
                $templateRowClientes.querySelector(".dni").textContent = element.dni
                $templateRowClientes.querySelector(".nombre").textContent = element.nombre
                $templateRowClientes.querySelector(".apellido").textContent = element.apellido 
                $templateRowClientes.querySelector(".direccion").textContent = element.direccion

                $templateRowClientes.dataset.dni = element.dni
                $templateRowClientes.dataset.nombre = element.nombre 
                $templateRowClientes.dataset.apellido = element.apellido 
                $templateRowClientes.dataset.direccion = element.direccion

                $templateRowClientes.querySelector("#bEditarCliente").dataset.dni = element.dni
                $templateRowClientes.querySelector("#bEditarCliente").dataset.nombre = element.nombre
                $templateRowClientes.querySelector("#bEditarCliente").dataset.apellido = element.apellido 
                $templateRowClientes.querySelector("#bEditarCliente").dataset.direccion = element.direccion

                let $clone = document.importNode($templateRowClientes,true)
                $clone.dataset.id = element.id
                $fragmentoClientes.appendChild($clone)
                document.querySelector("#table-clientes").appendChild($fragmentoClientes)
            })

            TAMANIO_CLIENTES.length = clientes.length

    } catch (error) {
        alert(error)
    }
}

export function editarCliente(event){
    
    const $tbDniCliente = document.querySelector("#tbDniCliente"),
        $tbNombreCliente = document.querySelector("#tbNombreCliente"),
        $tbApellidoCliente = document.querySelector("#tbApellidoCliente"),
        $tbDireccionCliente = document.querySelector("#tbDireccionCliente")

    if(event.target.nodeName === "IMG"){

        $tbDniCliente.value = event.target.parentNode.dataset.dni
        $tbNombreCliente.value = event.target.parentNode.dataset.nombre
        $tbApellidoCliente.value = event.target.parentNode.dataset.apellido
        $tbDireccionCliente.value = event.target.parentNode.dataset.direccion

        ACCION_CLIENTES.status = true
        ACCION_CLIENTES.id = event.target.parentNode.dataset.dni

    }else{
        $tbDniCliente.value = event.target.dataset.dni
        $tbNombreCliente.value = event.target.dataset.nombre
        $tbApellidoCliente.value = event.target.dataset.apellido
        $tbDireccionCliente.value = event.target.dataset.direccion

        ACCION_CLIENTES.status = true
        ACCION_CLIENTES.id = event.target.dataset.dni

    }

    
}

export async function pushClientes(){

    const $clientes = document.querySelectorAll("#table-clientes tr"),
                        CLIENTES = []
    
    $clientes.forEach(element => {
        CLIENTES.push({
            dni: element.dataset.dni,
            nombre: element.dataset.nombre,
            apellido: element.dataset.apellido,
            direccion: element.dataset.direccion
        })
    })

    const req = await fetch(`https://api.github.com/gists/${GIST_ID_CLIENTES}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
                files: {
                [GIST_FILENAME_CLIENTES]: {
                    content: JSON.stringify(CLIENTES),
                },
            },
            }),
        });

    return req.json();
}
