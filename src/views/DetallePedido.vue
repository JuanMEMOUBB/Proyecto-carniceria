<template>
    <div>
        <h1>Detalle Pedido</h1>
        id del pedido: {{id}}
        <detalle-pedido-item v-for="pedido_y_detalle in pedido_y_detalle" :key="pedido_y_detalle.id_producto" :pedido_y_detalle="pedido_y_detalle" class="detalle-pedido-item" />
        <form @submit.prevent="submit">
          <input type="radio" id="Pedido Confirmado" value = "Pedido Confirmado" name="Estado" v-model="estado_pedido">
          <label for="Pedido Confirmado">Pedido Confirmado</label>

          <input type="radio" id="En Proceso" value = "En Proceso" name="Estado" v-model="estado_pedido">
          <label for="En Proceso">En Proceso</label>

          <input type="radio" id="Completado" value = "Completado" name="Estado" v-model="estado_pedido">
          <label for="Completado">Completado</label>

          <input class="button-primary" type="submit" value="actualizar">

        </form>
    </div>
</template>

<script>
import DetallePedidoItem from '../components/DetallePedidoItem.vue'
import gql from "graphql-tag";

const GET_DETALLE_POR_ID = gql`
query GetDetallePorId($_id: Int! ) {
  pedido_y_detalle(where: {id: {_eq: $_id}}) {
    precio
    estado_pedido
    id_producto
    nombre
    peso
    al_vacio
  }
}

`;

const UPDATE_ESTADO_PEDIDO = gql`
mutation updateEstadoPedido($_eq: Int!, $estado_pedido: String!) {
  update_pedido(where: {id: {_eq: $_eq}}, _set: {estado_pedido: $estado_pedido}) {
    affected_rows
  }
}
`;



export default {
    name: "DetallePedido",
    props: [
        'id'
    ],
  components: { DetallePedidoItem },
  data(){
      return{
          pedido_y_detalle: [],
          estado_pedido: ""
         
          
      };
  },
  apollo:{
    pedido_y_detalle: {
      query: GET_DETALLE_POR_ID,
      variables() {
        return {
          "_id" : this.id
        }
        } 
    },
    
  },

  methods:{
    submit(){
      const {estado_pedido} = this.$data;
      this.$apollo.mutate({
        mutation: UPDATE_ESTADO_PEDIDO,
        variables: {
          "_eq" : this.id,
          "estado_pedido" : estado_pedido
        }
      })

    }
  }
    
};
</script>

<style scoped>

</style>