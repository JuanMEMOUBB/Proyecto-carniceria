<template>
    <div>
      <b-container>
        <h1>Detalle del Pedido</h1>
         <b-button class="mr-1" onClick="history.go(-1);">Volver</b-button>
        <detalle-pedido-item v-for="pedido_y_detalle in pedido_y_detalle" :key="pedido_y_detalle.id_producto" :pedido_y_detalle="pedido_y_detalle" class="detalle-pedido-item" />
        <div>

          <b-row class="my-1">
            <b-col sm="2">
              <label for="input-default">Empresa de Despacho: </label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="input-default" placeholder="Cambiar" v-model="nombre_empresa_despacho"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="2">
              <label for="input-default">Numero de Seguimiento: </label>
            </b-col>
            <b-col sm="10">
              <b-form-input id="input-default" placeholder="Cambiar" v-model="numero_seguimiento"></b-form-input>
            </b-col>
          </b-row>
          <label for="comentarios">Comentarios:</label>
          <textarea id="comentarios" name="comentarios" rows="4" cols="135" style="max-width:100%;" v-model="comentarios">
          
          </textarea>
          <br><br>

        </div>
        <form @submit.prevent="submit">
          <input type="radio" id="Pedido Confirmado" value = "Pedido Confirmado" name="Estado" v-model="estado_pedido">
          <label for="Pedido Confirmado">Pedido Confirmado</label>

          <input type="radio" id="En Proceso" value = "En Proceso" name="Estado" v-model="estado_pedido">
          <label for="En Proceso">En Proceso</label>

          <input type="radio" id="Enviado" value = "Enviado" name="Estado" v-model="estado_pedido">
          <label for="Enviado">Enviado</label>

          <input type="radio" id="Completado" value = "Completado" name="Estado" v-model="estado_pedido">
          <label for="Completado">Completado</label>
          <br>
          <b-button variant="success" class="mr-1" type="submit" value="actualizar">Actualizar</b-button>

        </form>
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
mutation updateEstadoPedido($_eq: Int!, $estado_pedido: String!, $nombre_empresa_despacho: String!, $numero_seguimiento: String!, $comentarios: String) {
  update_pedido(where: {id: {_eq: $_eq}}, _set: {estado_pedido: $estado_pedido, nombre_empresa_despacho: $nombre_empresa_despacho, numero_seguimiento: $numero_seguimiento, comentarios: $comentarios}) {
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
    name: "DetallePedido",
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
          comentarios: ""
          
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
    submit(){
      if(!this.nombre_empresa_despacho){
        this.nombre_empresa_despacho = "N/A"
      }
      if(!this.numero_seguimiento){
        this.numero_seguimiento = "N/A"
      }
      this.$apollo.mutate({
        mutation: UPDATE_ESTADO_PEDIDO,
        variables: {
          "_eq" : this.id,
          "estado_pedido" : this.estado_pedido,
          "nombre_empresa_despacho": this.nombre_empresa_despacho,
          "numero_seguimiento": this.numero_seguimiento,
          "comentarios": this.comentarios
        }
      })


      alert("Pedido Modificado!")
    }
  }
    
};
</script>

<style scoped>

</style>