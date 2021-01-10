<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand class="text-white">Estados</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <a class="nav-link " href="#estd" @click="estado='%'">Todas</a>
        <a class="nav-link " href="#estd" @click="estado='esperando confirmación de stock%'">Esperando confirmación de stock</a>
        <a class="nav-link " href="#estd" @click="estado='pedido confirmado%'">Pedido Confirmado</a>
        <a class="nav-link " href="#estd" @click="estado='enviado%'">Enviado</a>
        <a class="nav-link " href="#estd" @click="estado='completado%'">Completado</a>
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
    <b-container fluid="sm" id="prod">
            <b-row class="container-fluid justify-content-md-center">
              <pedido-item 
              v-for="pedido in pedido" 
              :key="pedido.id" 
              :pedido="pedido" 
              class="pedido-item" 
              v-on:ver-pedido="$emit('ver-pedido',pedido.id)"
              ></pedido-item>
            </b-row>
    </b-container>
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
    id_cliente
  }
  }
`;
export default {
  name: "PedidosList",
  components: { PedidoItem },
  data() {
    return {
      pedido: [],
      estado: '%'
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
  }
};
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
