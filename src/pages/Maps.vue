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
      <div class="row">
        <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Pedidos</h4>
              <p class="card-category">Pedidos en las últimas 24 horas</p>
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

        <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Pedidos</h4>
              <p class="card-category">Pedidos en la última semana</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Pedidos completos
                <i class="fa fa-circle text-danger"></i> Pedidos cancelados
                <i class="fa fa-circle text-warning"></i> Pedidos pendientes por confirmar
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Los últimos 7 días
                <b-button @click="update">Actualizar</b-button>
              </div>
            </template>
          </chart-card>
        </div>
      </div>

      <div class="row">
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
                <i class="fa fa-check"></i> Información certificada
              </div>
            </template>
          </chart-card>
        </div>
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

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pedido: [],
        pieChart: {
          data: {
            labels: ['60%', '20%', '40%'],
            series: [0,0,0]
          }
        },
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
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
      }

    },

    created(){

      this.pieChartDatos();
      this.barChartDatos();

    },
    
    methods:{
      pieChartDatos(){
        for(let i= 0;i<this.pedido.length;i++){
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
        //calculo de porcentajes para el pieChart
        let porcentajeTotal = this.pieChart.data.series[0] + this.pieChart.data.series[1] + this.pieChart.data.series[2];
        this.pieChart.data.labels[0] = ((this.pieChart.data.series[0] *100)/porcentajeTotal).toFixed(1) + '%';
        this.pieChart.data.labels[1] = ((this.pieChart.data.series[1] *100)/porcentajeTotal).toFixed(1) + '%';
        this.pieChart.data.labels[2] = ((this.pieChart.data.series[2] *100)/porcentajeTotal).toFixed(1) + '%';
      },

      lineChartDatos(){

        for(let i= 0;i<this.pedido.length;i++){
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
      },

      barChartDatos(){
        for(let j = 0; j< 12; j++){
          for(let i = 0; i<this.pedido.length;i++){
            let mes = this.pedido[i].updated_at.split('-',2).slice('1');
            if(this.pedido[i].estado_pedido == "Completado" &&  mes[0] == j+1){
              console.log(this.pedido[i].updated_at.split('-',2).slice('1'))
              this.barChart.data.series[0][j] +=  this.pedido[i].precio; 
            }          
          }
        }
      },
    },
    computed:{
      update(){
        return this.updateData;
      }
    }
  }
</script>
<style>

</style>
