<template>
  <div class="list-of-pedidos">
    <pedido-item v-for="pedido in pedido" :key="pedido.id" :pedido="pedido" class="pedido-item" v-on:ver-pedido="$emit('ver-pedido',pedido.id)"></pedido-item>
  </div>
</template>

<script>
import PedidoItem from "src/components/PedidoItem.vue";
import gql from "graphql-tag";
export const GET_PEDIDOS = gql`
query getPedidos($id_user: String!) {
  pedido(where: {cliente: {user: {id: {_eq: $id_user}}}}) {
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
    };
  },
  computed:{
    idUser: function(){
      let id
      if (this.$auth && this.$auth.isAuthenticated && !this.$auth.loading){
        id=this.$auth.user['https://hasura.io/jwt/claims']['x-hasura-user-id']
      }else{
        id=1
      }      
      window.console.log(id)
      return id;
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