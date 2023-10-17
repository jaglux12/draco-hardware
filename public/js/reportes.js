import { GIST_FILENAME_LISTA_VENTAS, GIST_FILENAME_PRODUCTOS, GIST_FILENAME_STOCK, GIST_ID_LISTA_VENTAS, GIST_ID_PRODUCTOS, GIST_ID_STOCK } from "./constantes.js";

export async function generaReporteProductos(){
    try {
        let productosRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_PRODUCTOS}`),
            listaProductos = await productosRespuesta.json(),
            productos = await JSON.parse(listaProductos.files[GIST_FILENAME_PRODUCTOS].content)

        let stockRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_STOCK}`),
            listaStock = await stockRespuesta.json(),
            stock = await JSON.parse(listaStock.files[GIST_FILENAME_STOCK].content)


        let posY = 37
        var doc = new jsPDF();

        doc.text(`Reporte de productos ${new Date(Date.now()).toLocaleDateString()}`, 10, 15);
        doc.line(10, 20, 200, 20);
        doc.setFontSize(9)

        doc.text("Descripcion",10,28)
        doc.text("Cantidad",112,28)
        doc.text("Stock Minimo",130,28)
        doc.text("Precio Unitario",155,28)
        doc.text("Precio Venta",181,28)
        doc.line(10, 31, 200, 31);
        stock.forEach(stock => {
            productos.forEach(producto =>{
                if(stock.id_producto === producto.id){
                    doc.text(`${producto.tipo} - ${producto.marca} - ${producto.modelo}`,10,posY)
                    doc.text(`${stock.cantidad}`,112,posY)
                    doc.text(`${stock.stockMinimo}`,130,posY)
                    doc.text(`$${stock.precioUnitario}`,155,posY)
                    doc.text(`$${stock.precioVenta}`,181,posY)

                }
            })
            posY+=6
        })
        doc.save(`Reporte${new Date(Date.now()).toLocaleDateString()}.pdf`);
    } catch (error) {
        alert(error)
    }

   
} 

export async function generarFacturasCobrar(){
    try {

        let ventasRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_LISTA_VENTAS}`),
            listaVentas = await ventasRespuesta.json(),
            ventas = await JSON.parse(listaVentas.files[GIST_FILENAME_LISTA_VENTAS].content)
        

        let posY = 37
        var doc = new jsPDF();

        doc.text(`Reporte de facturas vencidas ${new Date(Date.now()).toLocaleDateString()}`, 10, 15);
        doc.line(10, 20, 200, 20);
        doc.setFontSize(9)

        doc.text("NºCliente",10,28)
        doc.text("Descripcion",30,28)
        doc.text("Total",140,28)
        doc.text("Fecha",150,28)
        doc.text("Tipo pago",168,28)
        doc.text("Pagado",188,28)

        ventas.forEach(element =>{
            if(element.pagado === "NO"){
                doc.text(`${element.dni}`,10,posY)
                doc.text(`${element.descripcion}`,30,posY)
                doc.text(`$${element.total}`,140,posY)
                doc.text(`${element.fecha}`,150,posY)
                doc.text(`${element.tipoPago}`,168,posY)
                doc.text(`${element.pagado}`,188,posY)
                posY+=7
            }
        }) 

        doc.line(10, 31, 200, 31);
        doc.save(`Reporte${new Date(Date.now()).toLocaleDateString()}.pdf`);
    } catch (error) {
        alert(error)
    }

   
} 


export async function generarStockRellenar(){
    try {

        let stockRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_STOCK}`),
            listaStock = await stockRespuesta.json(),
            stock = await JSON.parse(listaStock.files[GIST_FILENAME_STOCK].content)
        

        let posY = 37
        var doc = new jsPDF();

        doc.text(`Reporte de facturas vencidas ${new Date(Date.now()).toLocaleDateString()}`, 10, 15);
        doc.line(10, 20, 200, 20);
        doc.setFontSize(9)

        doc.text("ID Producto",10,28)
        doc.text("Cantidad",35,28)
        doc.text("Stock Minimo",55,28)
        doc.text("Precio Unitario",83,28)
        doc.text("Precio Venta",115,28)

        stock.forEach(element =>{
            if(Number(element.cantidad) <= Number(element.stockMinimo) || Number(element.cantidad) <= (Number(element.stockMinimo) + 1)){
                doc.text(`${element.id_producto}`,10,posY)
                doc.text(`${element.cantidad}`,35,posY)
                doc.text(`${element.stockMinimo}`,55,posY)
                doc.text(`$${element.precioUnitario}`,83,posY)
                doc.text(`$${element.precioVenta}`,115,posY)
                posY+=7
            }
        }) 

        doc.save(`Reporte${new Date(Date.now()).toLocaleDateString()}.pdf`);
    } catch (error) {
        alert(error)
    }
} 

export async function generaReporteCliente(){
    try {

        let ventasRespuesta = await fetch(`https://api.github.com/gists/${GIST_ID_LISTA_VENTAS}`),
            listaVentas = await ventasRespuesta.json(),
            ventas = await JSON.parse(listaVentas.files[GIST_FILENAME_LISTA_VENTAS].content),
            $DNICliente = document.querySelector("#dniCliente")
        
        let posY = 37
        var doc = new jsPDF();

        doc.text(`Reporte de facturas vencidas ${new Date(Date.now()).toLocaleDateString()}`, 10, 15);
        doc.text(`CLIENTE: ${$DNICliente.value}`,130,15)
        doc.line(10, 20, 200, 20);
        doc.setFontSize(9)

        doc.text("Descripcion",10,28)
        doc.text("Fecha",130,28)
        doc.text("Total",150,28)
        doc.text("Tipo pago",165,28)
        doc.text("Pagado",184,28)

        ventas.forEach(element =>{
            if($DNICliente.value === element.dni){
                doc.text(`${element.descripcion}`,10,posY)
                doc.text(`${element.fecha}`,130,posY)
                doc.text(`$${element.total}`,150,posY)
                doc.text(`${element.tipoPago}`,165,posY)
                doc.text(`${element.pagado}`,184,posY)
                posY+=7
            }
        }) 

        doc.save(`Reporte${new Date(Date.now()).toLocaleDateString()}.pdf`);
    } catch (error) {
        alert(error)
    }
} 

