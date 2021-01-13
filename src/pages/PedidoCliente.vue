<template>
<div>
<!--
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand class="text-white">Estado</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <a class="nav-link " href="#estd" @click="estado='%'">Todos</a>
        <a class="nav-link " href="#estd" @click="estado='esperando confirmación de stock%'">Esperando confirmación de stock</a>
        <a class="nav-link " href="#estd" @click="estado='pedido confirmado%'">Pedido Confirmados</a>
        <a class="nav-link " href="#estd" @click="estado='enviado%'">Enviados</a>
        <a class="nav-link " href="#estd" @click="estado='completado%'">Completados</a>
        <a class="nav-link " href="#estd" @click="estado='cancelado%'">Cancelados</a>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  -->
  <carrusel/>
  <b-navbar toggleable="md" type="dark" variant="dark"/>

  <div class="list-of-pedidos">
    <table fluid="sm" id="prod" class="table table-striped">
      <thead>
          <tr>
            <th class="sortRow" style="width: 20%" @click="sort('estado_pedido')">Estado</th>
            <th class="sortRow" style="width: 20%" @click="sort('created_at')">Fecha</th>
            <th class="sortRow" style="width: 20%" @click="sort('direccion')">Dirección</th>
            <th class="sortRow" style="width: 20%" @click="sort('peso')">Peso Total</th>
            <th class="sortRow" style="width: 20%" @click="sort('precio')">Precio Total</th>
          </tr>
        </thead>
            
      <tbody>
        <tr v-for="pedido in pedido" :key="pedido.key" :pedido="sortPedidos" class="pedido-item">
          <td>{{ pedido.estado_pedido }}</td>
          <td>{{ pedido.created_at.split('T',1).toString() }}</td>
          <td>{{ pedido.direccion }}</td>
          <td>{{ pedido.peso }}kg</td>
          <td>${{ pedido.precio }}</td>
          <td><b-button variant="info" @click="verPedido(pedido.id)" class="boton-ver"  >Ver</b-button></td>
        </tr>
              
        </tbody>
    </table>
  </div>

</div>
</template>

<script>
import gql from "graphql-tag";
import router from '../router';
import Carrusel from '../components/Carrusel.vue'

export const GET_PEDIDOS = gql`
query getPedidos($id_user: String!) {
  pedido(where: {cliente: {user: {id: {_eq: $id_user}}}}, order_by: {created_at: desc}) {
    id
    estado_pedido
    peso
    precio
    nombre_empresa_despacho
    numero_seguimiento
    created_at
  }
}
`;
export default {
  name: "PedidoCliente",
  components: { Carrusel },
  data() {
    return {
      pedido: [],
      estado: 'esperando confirmación de stock%',
      currentSort:'pedido.estado_pedido',
      currentSortDir:'asc',
    };
  },
  computed:{
    idUser: function(){
      let id
      if (this.$auth && this.$auth.isAuthenticated && !this.$auth.loading){
        id=this.$auth.user['https://hasura.io/jwt/claims']['x-hasura-user-id']
      }else{
        id= null
      }      
      window.console.log(id)
      return id;
    },
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
  apollo: {
    pedido: {
      query: GET_PEDIDOS,
      variables(){
        return{
          "id_user": this.idUser
        };
      }
    }
  },
  methods: {
    verPedido(id) {
      router.push({  path: `/cliente/detallePedido/${id}` })
      },
      sort:function(sortColumn) {
      //if s == current sort, reverse
      if(sortColumn === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = sortColumn;
    },

  },  
};
</script>

<style lang="scss" scoped>
.sortRow {
  cursor: pointer;
  color: rgb(29, 207, 239);
}
.list-of-pedidos {
  display: flex;
  justify-content: center;
}
.pedido-item {
  margin: 0 10px;
}

</style>