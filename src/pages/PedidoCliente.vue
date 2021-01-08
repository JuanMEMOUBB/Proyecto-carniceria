<template>
  <div class="list-of-pedidos">
    <pedido-item v-for="pedido in pedido" :key="pedido.id" :pedido="pedido" class="pedido-item" v-on:ver-pedido="$emit('ver-pedido',pedido.id)"></pedido-item>
  </div>
</template>

<script>
import PedidoItem from "src/components/PedidoItem.vue";
import gql from "graphql-tag";
export const GET_PEDIDOS = gql`
  query getPedidos($_eq: Int!) {
  pedido(where: {id_cliente: {_eq: $_eq}}) {
    estado_pedido
    peso
    precio
    nombre_empresa_despacho
    numero_seguimiento
  }
}

`;
export default {
  name: "PedidoCliente",
  components: { PedidoItem },
  data() {
    return {
      pedido: [],
      idCliente: 1
    };
  },
  apollo: {
    pedido: {
      query: GET_PEDIDOS,
      variables(){
        return{
          "_eq": this.idCliente
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