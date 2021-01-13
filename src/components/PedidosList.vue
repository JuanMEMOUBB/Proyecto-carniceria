<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand class="text-white">Estados</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <a class="nav-link " href="#estd" @click="estado='%'">Todas</a>
        <a class="nav-link " href="#estd" @click="estado='esperando confirmación de stock%'">Esperando confirmación de stock</a>
        <a class="nav-link " href="#estd" @click="estado='pedido confirmado%'">Pedido Confirmados</a>
        <a class="nav-link " href="#estd" @click="estado='enviado%'">Enviados</a>
        <a class="nav-link " href="#estd" @click="estado='completado%'">Completados</a>
        <a class="nav-link " href="#estd" @click="estado='cancelado%'">Cancelados</a>
      </b-navbar-nav>

      <!-- Right aligned nav items 
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>-->
      <!--</b-navbar-nav>-->
    </b-collapse>
  </b-navbar>

  <div class="list-of-pedidos">
    <table fluid="sm" id="prod" class="table table-striped">
      <thead>
          <tr>
            <th style="width: 20%" @click="sort('estado_pedido')">Estado</th>
            <th style="width: 20%" @click="sort('direccion')">Dirección</th>
            <th style="width: 20%" @click="sort('peso')">Peso Total</th>
            <th style="width: 20%" @click="sort('precio')">Precio Total</th>
            <th style="width: 20%" @click="sort('nombre')">Cliente</th>            
          </tr>
        </thead>
            
      <tbody>
        <tr v-for="pedido in pedido" :key="pedido.key" :pedido="sortPedidos" class="pedido-item">
          <td>{{ pedido.estado_pedido }}</td>
          <td>{{ pedido.direccion }}</td>
          <td>{{ pedido.peso }}kg</td>
          <td>${{ pedido.precio }}</td>
          <td>{{ pedido.cliente.nombre }} {{pedido.cliente.apellido_paterno}}</td>
          <td><b-button variant="info" @click="$emit('ver-pedido',pedido.id)" class="boton-ver"  >Ver</b-button></td>
        </tr>
              
        </tbody>
    </table>
  </div>

  </div>
</template>

<script>
import PedidoItem from "./PedidoItem";
import gql from "graphql-tag";

export const GET_PEDIDOS = gql`
  query getPedidos($estado_pedido: String!) {
    pedido(where: {estado_pedido: {_ilike: $estado_pedido}}) {
    id
    estado_pedido
    direccion
    peso
    precio
    id_cliente
    cliente {
      nombre
      apellido_paterno
    }
  }
  }
`;
export default {
  name: "PedidosList",
  components: { PedidoItem },
  data() {
    return {
      pedido: [],
      estado: 'esperando confirmación de stock%',
      currentSort:'pedido.estado_pedido',
      currentSortDir:'asc',
    };
  },
  apollo: {
    pedido: {
      query: GET_PEDIDOS,
      variables() {
        return{
          "estado_pedido": this.estado
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

<style>
.list-of-pedidos {
  display: flex;
  justify-content: center;
}
.pedido-item {
  margin: 0 10px;
}
</style>

<style lang="scss" scoped>
.hero {
  background: rgb(81, 186, 252);
}
h1,
h2 {
  color: #fff;
}
</style>
