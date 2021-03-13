<template>
  <div class="content">
    <div class="container-fluid">
      <!--
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Capacity</p>
              <h4 class="card-title">105GB</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Revenue</p>
              <h4 class="card-title">$1,345</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Errors</p>
              <h4 class="card-title">23</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Followers</p>
              <h4 class="card-title">+45</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

      </div>
      -->
      <!--
      <div class="row">
        <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Pedidos</h4>
              <p class="card-category">Pedidos en la última semana</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Pedidos completos
                <i class="fa fa-circle text-danger"></i> Pedidos en proceso
                <i class="fa fa-circle text-warning"></i> Pedidos pendientes por confirmar
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>

        -->

        <div class="col-md-8">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Pedidos</h4>
              <p class="card-category">Pedidos del día</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Pedidos completos : {{pieChart.data.series[0]}}
                <i class="fa fa-circle text-danger"></i> Pedidos cancelados : {{pieChart.data.series[1]}}
                <i class="fa fa-circle text-warning"></i> Pedidos pendientes por confirmar : {{pieChart.data.series[2]}}
                Total de pedidos : {{pieChart.data.series[0] + pieChart.data.series[1] + pieChart.data.series[2]}}
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i>
              </div>
            </template>
          </chart-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-10">
          <chart-card
            :chart-data="barChartProductos.data"
            :chart-options="barChartProductos.options"
            :chart-responsive-options="barChartProductos.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">Venta de Productos</h4>
              <p class="card-category">Del día</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Kilos vendidos
                <i class="fa fa-circle text-danger"></i> Kilos cancelados
                <i class="fa fa-circle text-warning"></i> Kilos por confirmar
              </div>
              <hr>
              <div class="stats">
              </div>
            </template>
          </chart-card>
        </div>

        
<!--
        <div class="col-md-6">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">Ingresos y egresos 2020</h4>
              <p class="card-category">Todos los pedidos</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Ingresos
                <i class="fa fa-circle text-danger"></i> Egresos
              </div>
              <hr>
              <div class="stats">
                <b-button @click="addEgresos($event.target)" >Añadir Egresos</b-button>
              </div>
            </template>
          </chart-card>
          <b-modal  :id="infoModal.id" title="Egresos" ok-only @hide="updateBarData">
            <b-container>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-number-1">Enero</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input  id="input-number-1" v-model.number="infoModal.barChart[0]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-2">Febrero</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-2" v-model.number="infoModal.barChart[1]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-3">Marzo</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-3" v-model.number="infoModal.barChart[2]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-4">Abril</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-4" v-model.number="infoModal.barChart[3]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-5">Mayo </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-5" v-model.number="infoModal.barChart[4]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-6">Junio </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-6" v-model.number="infoModal.barChart[5]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-7">Julio </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-7" v-model.number="infoModal.barChart[6]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-8">Agosto </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-8" v-model.number="infoModal.barChart[7]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-9">Septiembre </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-9" v-model.number="infoModal.barChart[8]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-10">Octubre </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-10" v-model.number="infoModal.barChart[9]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-11">Noviembre</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-11" v-model.number="infoModal.barChart[10]"></b-form-input>
                </b-col>
                <b-col sm="2">
                  <label for="input-default-12">Diciembre</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-default-12" v-model.number="infoModal.barChart[11]"></b-form-input>
                </b-col>
              </b-row>
              <pre>{{ infoModal.content }}</pre>
            </b-container>
          </b-modal>
        </div>
        -->
        <!--
        <div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title">Tasks</h5>
              <p class="category">Backend development</p>
            </template>
            <l-table :data="tableData.data"
                     :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card>

        </div>
        -->
      </div>
    </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import gql from "graphql-tag"

  export const GET_PEDIDOS = gql`
  query getPedidos {
    pedido {
    id
    estado_pedido
    direccion
    peso
    id_cliente
    created_at
    updated_at
    precio
  }
  }
`;
export const GET_PRODUCTO_VENDIDO = gql`
query getProductoVendido {
  pedido_y_detalle {
    id
    id_producto
    peso
    estado_pedido
    updated_at
  }
}
`;

export const GET_PRODUCTO = gql`
query getProducto {
  producto (order_by: {id: asc}){
    id
    nombre
  }
}
`;



  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        infoModal: {
          id: 'info-modal',
          content: '',
          barChart: [],
        },
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pedido: [],
        pedido_y_detalle: [],
        producto: [],
        pieChart: {
          data: {
            labels: ['60%', '20%', '40%'],
            series: [0,0,0]
          }
        },
        lineChart: {
          data: {
            labels: ['7:00', '9:00', '11:00', '13:00', '15:00', '16:00', '18:00'],
            series: [
              [0, 0, 0,0,0,0,0],
              [0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [0,0,0,0,0,0,0,0,0,0,0,0],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        //datos del gráfico
        barChartProductos: {
          data: {
            labels: [],
            series: [
              [30,20,10],
              [5,5,3],
              [0,5,10]
            ]
            },
          
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            {title: 'Read "Following makes Medium better"', checked: false},
            {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        }
      }
    },
    apollo: {
      pedido: {
       query: GET_PEDIDOS
      },
      pedido_y_detalle: {
       query: GET_PRODUCTO_VENDIDO
      },
      producto:{
        query: GET_PRODUCTO
      },
    },

    created(){

      this.pieChartDatos();
      this.barChartDatosProductos();
      this.barChartDatos();
      //this.lineChartDatos();
      

    },
    
    methods:{
      pieChartDatos(){
       /* let  d = new Date();
        let diaHoy = d.toString().split(' ',4).slice('1','5');
        diaHoy = diaHoy.toString();
        diaHoy = Date.parse(diaHoy);*/
        var timeStamp = Math.round(new Date().getTime() / 1000);
        var timeStampYesterday = timeStamp - (24 * 3600); 

        for(let i= 0;i< this.pedido.length;i++){
          let pedidoDia = this.pedido[i].created_at.split('T',1);
          pedidoDia = Date.parse(pedidoDia);
          if(pedidoDia >= new Date(timeStampYesterday*1000).getTime()){
                   
            if(this.pedido[i].estado_pedido == "Completado"){
            this.pieChart.data.series[0]++;
            }
            if(this.pedido[i].estado_pedido == "Cancelado"){
            this.pieChart.data.series[1]++;
            }
            if(this.pedido[i].estado_pedido == "Esperando confirmación de stock"){
            this.pieChart.data.series[2]++;
            }
          }
          
        }
        //calculo de porcentajes para el pieChart
        let porcentajeTotal = this.pieChart.data.series[0] + this.pieChart.data.series[1] + this.pieChart.data.series[2];
        this.pieChart.data.labels[0] = ((this.pieChart.data.series[0] *100)/porcentajeTotal).toFixed(1) + '%';
        this.pieChart.data.labels[1] = ((this.pieChart.data.series[1] *100)/porcentajeTotal).toFixed(1) + '%';
        this.pieChart.data.labels[2] = ((this.pieChart.data.series[2] *100)/porcentajeTotal).toFixed(1) + '%';
      },

      lineChartDatos(){
       
       
       let timeStamp = Math.round(new Date().getTime() / 1000);
        let timeStampLastWeek = timeStamp - (7 * 24 * 3600);

        for(let j=6; j>=0;j--){
          for(let i= 0;i<this.pedido.length;i++){
            let pedidoDia = this.pedido[i].created_at.split('T',1);
            pedidoDia = Date.parse(pedidoDia);
            let timeStampYesterday = timeStamp - ( j *24 * 3600);
            console.log(pedidoDia >= new Date(timeStampLastWeek*1000).getTime() && pedidoDia == new Date(timeStampYesterday *1000).getTime())

           // if(pedidoDia >= new Date(timeStampLastWeek*1000).getTime() && pedidoDia <= new Date(timeStampYesterday*1000)){
              if(this.pedido[i].estado_pedido == "Completado"){
              this.lineChart.data.series[0][j]++;
              }
              if(this.pedido[i].estado_pedido == "Cancelado"){
              this.lineChart.data.series[1][j]++;
              }
              if(this.pedido[i].estado_pedido == "Esperando confirmación de stock"){
              this.lineChart.data.series[2][j]++;
              }
            }
         // }
        }
      },

      barChartDatos(){
        for(let j = 0; j< 12; j++){
          for(let i = 0; i<this.pedido.length;i++){
            let mes = this.pedido[i].updated_at.split('-',2).slice('1');
            if(this.pedido[i].estado_pedido == "Completado" &&  mes[0] == j+1){
              this.barChart.data.series[0][j] +=  this.pedido[i].precio; 
            }          
          }
        }
      },

      barChartDatosProductos(){
       for(let i = 0; i<this.producto.length;i++){
         this.barChartProductos.data.labels[i] = this.producto[i].nombre;
       }
          this.barChartProductos.data.series.splice(this.producto.length);

          console.log("largo:" + this.barChartProductos.data.series[0].length)
        
          for(let p = 0 ; p< this.producto.length; p++){
            for(let i = 0; i< this.pedido_y_detalle.length;i++){
              let mes = this.pedido_y_detalle[i].updated_at.split('-',2).slice('1');
              console.log(mes)

              if(this.pedido_y_detalle[i].estado_pedido == "Completado" && this.pedido_y_detalle[i].id_producto === this.producto[p].id){

                //this.barChartProductos.data.series[p][j] = this.pedido_y_detalle[i].peso;
                this.barChartProductos[p].push(this.pedido_y_detalle[i].peso)

              }
            }
          }
        

      },

      //modal metodos
      addEgresos(button){
        this.$root.$emit('bv::show::modal', this.infoModal.id, button);
      },
      resetInfoModal() {
      this.infoModal.content = '';
      },
      updateBarData(){
        for(let index = 0;index<12;index++){
        this.barChart.data.series[1].splice(index, 1, this.infoModal.barChart[index])
        }
        this.resetInfoModal();

      }
    },

    computed:{
      
    }
  }
</script>
<style>

</style>
