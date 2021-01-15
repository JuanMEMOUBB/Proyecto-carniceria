<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand class="text-white">Estados</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <a class="nav-link "  @click="estado='%'">Todas</a>
        <a class="nav-link "  @click="estado='esperando confirmación de stock%'">Esperando confirmación de stock</a>
        <a class="nav-link "  @click="estado='pedido confirmado%'">Pedido Confirmados</a>
        <a class="nav-link "  @click="estado='enviado%'">Enviados</a>
        <a class="nav-link "  @click="estado='completado%'">Completados</a>
        <a class="nav-link "  @click="estado='cancelado%'">Cancelados</a>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="list-of-pedidos">
    <table fluid="sm" id="prod" class="table table-striped">
      <thead>
          <tr>
            <th class="sortRow" style="width: 20%" @click="sort('estado_pedido')">Estado</th>
            <th class="sortRow" style="width: 20%" @click="sort('direccion')">Dirección</th>
            <th class="sortRow" style="width: 10%" @click="sort('peso')">Peso Total</th>
            <th class="sortRow" style="width: 10%" @click="sort('precio')">Precio Total</th>
            <th style="width: 20%" @click="sort('nombre')">Cliente</th>
            <th class="sortRow" style="width: 20%" @click="sort('created_at')">Fecha</th>
            
          </tr>
        </thead>
            
      <tbody>
        <tr v-for="pedido in pedido" :key="pedido.key" :pedido="sortPedidos" class="pedido-item">
          <td>{{ pedido.estado_pedido }}</td>
          <td>{{ pedido.direccion }}</td>
          <td>{{ pedido.peso }}kg</td>
          <td>${{ pedido.precio }}</td>
          <td>{{ pedido.cliente.nombre }} {{pedido.cliente.apellido_paterno}}</td>
          <td>{{ pedido.created_at.split('T',1).toString() }}</td>
          <td><b-button variant="info" @click="$emit('ver-pedido',pedido.id)" class="boton-ver"  >Ver</b-button></td>
        </tr>
              
        </tbody>
    </table>
  </div>

  </div>
</template>

<script>
import gql from "graphql-tag";

export const GET_PEDIDOS = gql`
  query getPedidos($estado_pedido: String!) {
    pedido(where: {estado_pedido: {_ilike: $estado_pedido}},  order_by: {created_at: desc}) {
    id
    estado_pedido
    direccion
    peso
    precio
    id_cliente
    created_at
    cliente {
      nombre
      apellido_paterno
    }
  }
  }
`;
export default {
  name: "PedidosList",
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
.sortRow {
  cursor: pointer;
  color: rgb(29, 207, 239);
}
</style>
