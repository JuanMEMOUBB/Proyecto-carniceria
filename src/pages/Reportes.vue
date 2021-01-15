<template>
<div>
    <div class="row">
        <div class= "col-md-6">
            <b-card
                title="Productos Vendidos"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                Cantidad de productos vendidos en el ultimo mes.
                </b-card-text>    
                <b-button @click="downloadVentaProductoXMes">Descargar</b-button>
            </b-card>
        </div>

        <div class= "col-md-6">
            <b-card
                title="Ingresos"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                Ganancias mensuales con respecto a las ventas de pedidos.
                </b-card-text>    
                <b-button @click="addEgresos">Descargar</b-button>
            </b-card>
        </div>
    </div>


    <b-modal  :id="infoModal.id" title="Egresos" ok-only @hide="downloadIngresosXMes">
            <b-container>
              <h4>Anotar los egresos en los meses que le gustaría comparar</h4>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-number-1">Enero</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input  id="input-number-1" v-model.number="infoModal.egresos[0]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-2">Febrero</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-2" v-model.number="infoModal.egresos[1]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-3">Marzo</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-3" v-model.number="infoModal.egresos[2]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-4">Abril</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-4" v-model.number="infoModal.egresos[3]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-5">Mayo </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-5" v-model.number="infoModal.egresos[4]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-6">Junio </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-6" v-model.number="infoModal.egresos[5]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-7">Julio </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-7" v-model.number="infoModal.egresos[6]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-8">Agosto </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-8" v-model.number="infoModal.egresos[7]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-9">Septiembre </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-9" v-model.number="infoModal.egresos[8]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-10">Octubre </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-10" v-model.number="infoModal.egresos[9]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-11">Noviembre</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-11" v-model.number="infoModal.egresos[10]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-12">Diciembre</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-12" v-model.number="infoModal.egresos[11]"></b-form-input>
                </b-col>
              </b-row>
              <pre>{{ infoModal.content }}</pre>
            </b-container>
          </b-modal>

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
               ['Enero','$' + ingresos[0], '$' + this.infoModal.egresos[0], '$' + (ingresos[0] - this.infoModal.egresos[0]) ],
               ['Febrero',ingresos[1], '$' + this.infoModal.egresos[1], '$' + (ingresos[1] - this.infoModal.egresos[1]) ],
               ['Marzo','$' +ingresos[2], '$' + this.infoModal.egresos[2], '$' + (ingresos[2] - this.infoModal.egresos[2]) ],
               ['Abril','$' +ingresos[3], '$' +this.infoModal.egresos[3], '$' + (ingresos[3] - this.infoModal.egresos[3])],
               ['Mayo','$' +ingresos[4], '$' + this.infoModal.egresos[4], '$' + (ingresos[4] - this.infoModal.egresos[4])],
               ['Junio','$' +ingresos[5], '$' + this.infoModal.egresos[5], '$' + (ingresos[5] - this.infoModal.egresos[5])],
               ['Julio','$' +ingresos[6], '$' + this.infoModal.egresos[6], '$' + (ingresos[6] - this.infoModal.egresos[6])],
               ['Agosto','$' +ingresos[7], '$' + this.infoModal.egresos[7], '$' + (ingresos[7] - this.infoModal.egresos[7])],
               ['Septiembre','$' +ingresos[8], '$' +this.infoModal.egresos[8], '$' + (ingresos[8] - this.infoModal.egresos[8])],
               ['Octubre','$' +ingresos[9], '$' + this.infoModal.egresos[9], '$' + (ingresos[9] - this.infoModal.egresos[9])],
               ['Noviembre','$' +ingresos[10], '$' + this.infoModal.egresos[10], '$' + (ingresos[10] - this.infoModal.egresos[10])],
               ['Diciembre','$' +ingresos[11], '$' + this.infoModal.egresos[11], '$' + (ingresos[11] - this.infoModal.egresos[11])]
               ]
           
 
            // Or use javascript directly:
            doc.autoTable({
            head: [['Mes', 'Ingreso','Egreso','Total']],
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