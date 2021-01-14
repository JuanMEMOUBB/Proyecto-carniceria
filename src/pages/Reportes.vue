<template>
<div>

    <b-button @click="download">Descargar</b-button>

</div>    
</template>

<script>
import jsPDF from "jspdf";
import gql from 'graphql-tag';

export const GET_PEDIDOS = gql`
query getPedidosProductos {
  pedido(order_by: {updated_at: asc}, where: {estado_pedido: {_ilike: "Completado"}}) {
    id
    precio
    updated_at
    estado_pedido
    detallepedidos {
      peso
      producto {
        id
        nombre
        precio
      }
    }
  }
}
`;

export const GET_PRODUCTOS = gql`
query getProductos {
  producto(order_by: {id: asc}) {
    id
  }
}
`;



export default {
    name: 'Reportes',

    data(){
        return{
            pedido: null,
            producto: null,
            totalProductoVendido: [],

        }
    },
    apollo:{
        pedido:{
            query: GET_PEDIDOS
        },
        producto:{
            query: GET_PRODUCTOS
        }
    },
    methods:{
        download(){
           /* let fecha = this.pedido[0].updated_at
            fecha = fecha.split('T',1).toString()
            fecha = fecha.split('-',2); //año - mes
            //let mes = fecha[1];
            //this.totalProductoVendido.splice(this.producto.length);
            this.totalProductoVendido.length = this.producto.length

            console.log(this.totalProductoVendido.length);*/
            /*let headers = createHeaders([
                "Producto",
                "Kilogramos Vendidos"
                ]);*/

            //var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
            //doc.table(1, 1, generateData(100), headers, { autoSize: true });

            this.reporteVentaProductoXMes();
           console.log(this.totalProductoVendido);

        },

        reporteVentaProductoXMes(){
            let mesActual = new Date().getMonth();
            this.totalProductoVendido.length = this.producto.length;
            for(let i = 0;i<this.totalProductoVendido.length;i++){ //setear arreglo
                this.totalProductoVendido[i] = 0;
            }

            for(let i = 0; i<this.pedido.length;i++){               
                if(this.pedido[i].estado_pedido = "Completado"){
                    let fecha = this.pedido[i].updated_at;
                    fecha = fecha.split('T',1).toString();
                    fecha = fecha.split('-',2); //año - mes, falta restar 1
                    if(mesActual == (fecha[1]-1)){
                        for(let j = 0; j<this.producto.length;j++){
                            for(let z= 0; z<this.pedido[i].detallepedidos.length;z++){
                                if(this.pedido[i].detallepedidos[z].producto.id == this.producto[j].id){
                                    this.totalProductoVendido[j] += this.pedido[i].detallepedidos[z].peso;
                    
                                }
                                console.log("producto: "+j +" tiene: " +this.totalProductoVendido[j])
                                
                            }

                        }
                        
                    }



                }
            }
        },

        reporteIngresosUltimoMes(){
            let mesActual = new Date().getMonth();
            let totalVenta = 0;
        

            for(let i = 0; i<this.pedido.length;i++){               
                if(this.pedido[i].estado_pedido = "Completado"){
                    let fecha = this.pedido[i].updated_at;
                    fecha = fecha.split('T',1).toString();
                    fecha = fecha.split('-',2); //año - mes, falta restar 1
                    if(mesActual == (fecha[1]-1)){
                        console.log(this.pedido[i].precio);
                        totalVenta +=  this.pedido[i].precio;

                    }
                        
                }



            }
            return totalVenta
            
        },



    }

    
}
</script>

<style scoped>

</style>