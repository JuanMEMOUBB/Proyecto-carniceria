<template>
<div>
  <br>
    <div class="row">
        <div class= "col-md-1">
        </div>
        <div class= "col-md-5">
            <b-card
                title="Productos Vendidos"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                Cantidad de productos vendidos en el ultimo mes
                </b-card-text>    
                <b-button @click="downloadVentaProductoXMes">Descargar</b-button>
            </b-card>
        </div>

        <div class= "col-md-5">
            <b-card
                title="Ingresos"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                Ganancias mensuales de los pedidos
                </b-card-text>    
                <b-button @click="downloadIngresosXMes">Descargar</b-button>
            </b-card>
        </div>
    </div>


    

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br><br><br><br><br><br><br><br><br>






</div>    

</template>

<script>
import jsPDF from "jspdf";
import 'jspdf-autotable'
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
    nombre
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

            infoModal:{
                id: 'info-modal',
                content: '',
                egresos: [0,0,0,0,0,0,0,0,0,0,0,0],
            }

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
        downloadIngresosXMes(){

             const doc = new jsPDF()
           //doc.autoTable({ html: '#my-table' })
           let ingresos = this.reporteIngresosUltimosMeses();
           for(let i = 0; i<12; i++){
               if(ingresos[i] == null){
                    ingresos[i]= 0;
               }
           }
           
           let bodyPdf = [
               ['Enero','$' + ingresos[0]],
               ['Febrero',ingresos[1]],
               ['Marzo','$' +ingresos[2]],
               ['Abril','$' +ingresos[3]],
               ['Mayo','$' +ingresos[4]],
               ['Junio','$' +ingresos[5]],
               ['Julio','$' +ingresos[6]],
               ['Agosto','$' +ingresos[7]],
               ['Septiembre','$' +ingresos[8]],
               ['Octubre','$' +ingresos[9]],
               ['Noviembre','$' +ingresos[10]],
               ['Diciembre','$' +ingresos[11]]
               ]
           
 
            // Or use javascript directly:
            doc.autoTable({
            head: [['Mes', 'Ingresos']],
            body: bodyPdf,
            })
            
            doc.save('table.pdf')


        },
        
        downloadVentaProductoXMes(){
            let header= this.producto;
           this.reporteVentaProductoXMes()



           const doc = new jsPDF()
           //doc.autoTable({ html: '#my-table' })

           let bodyPdf = []

           for(let i= 0; i<this.producto.length;i++){
               bodyPdf[i] = [this.producto[i].nombre,this.totalProductoVendido[i] + ' kg'];
           }
 
            // Or use javascript directly:
            doc.autoTable({
            head: [['Producto', 'Cantidad']],
            body: bodyPdf,
            })
            
            doc.save('table.pdf')

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
                            }
                        }     
                    }
                }
            }
        },

        reporteIngresosUltimosMeses(){
            let mesActual = new Date().getMonth();
            let totalVenta = []
            for(let i = 0; i<mesActual+1;i++){
            totalVenta[i] = 0;
            }
        

            for(let i = 0; i<this.pedido.length;i++){               
                if(this.pedido[i].estado_pedido = "Completado"){
                    let fecha = this.pedido[i].updated_at;
                    fecha = fecha.split('T',1).toString();
                    fecha = fecha.split('-',2); //año - mes, falta restar 1

                    for(let j = 0; j<mesActual+1;j++){
                        if(j == (fecha[1]-1)){
                            totalVenta[j] +=  this.pedido[i].precio;
                        }
                    } 
                }
            }
            return totalVenta            
        },


        //metodos modal
        addEgresos(button){
        this.$root.$emit('bv::show::modal', this.infoModal.id, button);
      },
      resetInfoModal() {
      this.infoModal.content = '';
      this.infoModal.egresos = [0,0,0,0,0,0,0,0,0,0,0,0];
      },



    }

    
}
</script>

<style scoped>


</style>