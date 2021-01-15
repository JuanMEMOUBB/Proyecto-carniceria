<template>
    <div>
      <b-container>
        <b-button class="mr-1" onClick="history.go(-1);">Volver</b-button>
        <h1>Detalle del pedido</h1>
        <h2>Estado: {{estado_pedido}}</h2>         
        <detalle-pedido-item v-for="pedido_y_detalle in pedido_y_detalle" :key="pedido_y_detalle.id_producto" :pedido_y_detalle="pedido_y_detalle" class="detalle-pedido-item" />
        <div>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default"><b>Empresa de Despacho:</b> {{nombre_empresa_despacho}} </label>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="2">
              <label for="input-default"><b>Numero de Seguimiento:</b> {{numero_seguimiento}}</label>
            </b-col>
          </b-row>
          <div> <b>Comentarios:</b>  {{comentarios}}
          </div>
          <b-row  align-v="end" class="-align-right">
          <b-button align="right" variant="danger"  v-if="estado_pedido == 'Esperando confirmación de stock'" @click="cancelarPedido">Cancelar</b-button>
          </b-row>

        </div>
      </b-container>
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
    nombre_empresa_despacho
    numero_seguimiento
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

const GET_PEDIDO_COMENTARIO = gql`
query getPedido($_eq: Int!) {
  pedido(where: {id: {_eq: $_eq}}) {
    comentarios
  }
}
`;



export default {
    name: "DetallePedidoClient",
    props: [
        'id'
    ],
  components: { DetallePedidoItem },
  data(){
      return{
          pedido_y_detalle: [],
          pedido: [],
          estado_pedido: "",
          numero_seguimiento: "",
          nombre_empresa_despacho: "",
          comentarios: "",

          
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
    pedido:{
      query: GET_PEDIDO_COMENTARIO,
      variables() {
        return {
          "_eq": this.id
        }
      }
    },
    
  },

  computed:{  
    misVariables(){
      this.estado_pedido = this.pedido_y_detalle[0].estado_pedido;
      this.numero_seguimiento = this.pedido_y_detalle[0].numero_seguimiento;
      this.nombre_empresa_despacho = this.pedido_y_detalle[0].nombre_empresa_despacho;
      this.comentarios = this.pedido[0].comentarios;
    }
  },
  async created(){
    await this.misVariables
  },

  methods:{
    cancelarPedido(){
      if(confirm("¿Esta seguro que desea cancelar?")){
        this.estado_pedido = "Cancelado"
        this.$apollo.mutate({
          mutation: UPDATE_ESTADO_PEDIDO,
          variables: {
            "_eq" : this.id,
            "estado_pedido" : this.estado_pedido,
          }
        })
      }
    },
  }
    
};
</script>

<style scoped>

</style>