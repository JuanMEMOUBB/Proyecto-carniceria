<template>
  <div class="list-of-pedidos">
    <pedido-item v-for="pedido in pedido" :key="pedido.id" :pedido="pedido" class="pedido-item" v-on:ver-pedido="$emit('ver-pedido',pedido.id)"></pedido-item>
  </div>
</template>

<script>
import PedidoItem from "./PedidoItem";
import gql from "graphql-tag";
export const GET_PEDIDOS = gql`
  query getPedidos {
    pedido {
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
      pedido: []
    };
  },
  apollo: {
    pedido: {
      query: GET_PEDIDOS
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
