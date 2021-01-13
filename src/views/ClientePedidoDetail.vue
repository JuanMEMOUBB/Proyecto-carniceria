<template>
  <div class="container">

    <b-button class="mr-1" onClick="history.go(-1);">Volver</b-button>



    <div id="vue-table" style="overflow-x:auto;">
      <table class="table table-striped" style="width:100%">        
        <thead>
          <tr>
            <th style="width: 16.6%" @click="sort('estado_pedido')">Estado</th>
            <th style="width: 16.6%" @click="sort('direccion')">Dirección</th>
            <th style="width: 16.6%" @click="sort('peso')">Peso Total</th>
            <th style="width: 16.6%" @click="sort('precio')">Precio Total</th>
            <th style="width: 16.6%" @click="sort('nombre_empresa_despacho')">Empresa de despacho</th>
            <th style="width: 16.6%">Numero de seguimiento</th>            
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="pedido in  sortPedidos" v-bind:key="pedido.id">
            <td>{{ pedido.estado_pedido }}</td>
            <td>{{ pedido.direccion }}</td>
            <td>{{ pedido.peso }}kg</td>
            <td>${{ pedido.precio }}</td>
            <td>{{ pedido.nombre_empresa_despacho }}</td>
            <td>{{ pedido.numero_seguimiento }}</td>
            <td><b-button size="sm" @click="infoProductos(pedido, $event.target)" class="mr-1">
          Ver Productos
        </b-button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Info modal-->
      <b-modal :id="infoModal.id" title="Productos del Pedido"  ok-only @hide="resetInfoModal">
        <table class="table table-striped" style="width:100%">        
        <thead>
          <tr>
            <th style="width:33%">Producto</th>
            <th style="width:33%">Peso</th>
            <th style="width:33%">Al vacio</th>          
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="detalle in  infoModal.detallepedidos" v-bind:key="detalle">
            <td>{{ detalle.producto.nombre }}</td>
            <td>{{ detalle.peso }}kg</td>
            <td v-if="detalle.al_vacio">Si</td><td v-else>No</td>
          </tr>
        </tbody>
      </table>
          
    </b-modal>
  </div>
</template>

<script>
import gql from "graphql-tag";

const GET_PEDIDOS_DE_CLIENTE = gql`
query getPedidosDeCliente($_id: Int!) {
  pedido(where: {id_cliente: {_eq: $_id}}) {
    direccion
    estado_pedido
    peso
    precio
    fecha_despacho
    nombre_empresa_despacho
    numero_seguimiento
    detallepedidos {
      producto {
        nombre
      }
      peso
      al_vacio
    }
  }
}
`;

export default {
  name: 'ClientePedidoDetail',
  props: [
        'id'
    ],
    data(){
        return{
        pedido: null,
        currentSort:'pedido.estado_pedido',
        currentSortDir:'asc',

        infoModal:{
          id: 'info-modal',
          detallepedidos: '',
        },

        }

    },

    apollo:{
        pedido:{
            query: GET_PEDIDOS_DE_CLIENTE,
            variables(){
                return{
                    "_id": this.id
                }
            }

        }
    },
    methods:{
  sort:function(sortColumn) {
    //if s == current sort, reverse
    if(sortColumn === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = sortColumn;
  },


  //metodos modal
  infoProductos(pedido, button){
   this.infoModal.detallepedidos = pedido.detallepedidos; 
    this.$root.$emit('bv::show::modal', this.infoModal.id, button)

  },
  resetInfoModal(){
          this.infoModal.detallepedidos = '';
  }

},


    computed:{
    sortPedidos:function() {
    return this.pedido.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });
  }
  },
    
}
</script>