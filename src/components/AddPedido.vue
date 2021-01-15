<template>
  <div>
    <form class="submit-form" @submit.prevent="submit">
      
      <input class="btn btn-success pull-right" type="submit" value="Solicitar stock">
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";
//import { GET_PEDIDOS } from './PedidosList.vue';

const GET_CLIENTE = gql`
query getIdCliente($id_user: String!) {
  cliente(where: {user: {id: {_eq: $id_user}}}) {
    id,
    direccion
  }
}
`;

const ADD_PEDIDO = gql`
  mutation addPedido($direccion: String!, $peso: Int!, $precio: Int!, $id_cliente: Int!) {
  insert_pedido(objects: {
    direccion: $direccion,  
    peso: $peso, 
    precio: $precio, 
    id_cliente: $id_cliente
    }
  ) {
      returning {
        id
      }
    }
  }
`;

const ADD_DETALLE_PEDIDO = gql`
mutation addDetallePedido($id_pedido: Int!, $id_producto: Int, $pesoIndividual: Int, $al_vacio: Boolean = false) {
  insert_detallepedido(objects: {
    id_pedido: $id_pedido, 
    id_producto: $id_producto, 
    peso: $pesoIndividual, 
    al_vacio: $al_vacio,
    }
  ) {
    returning {
        id_pedido
      }
  }
}
`;

export default {
  name: "AddPedido",
  components: {  },
  data() {
    return {
      direccion: "",
      peso: "",
      precio: "",
      id_pedido: "",
      cliente: []
    };
  },

  computed:{
         cart(){
        return this.$store.getters.getShoppingCart
        },
        cartTotalPrice(){
            return this.$store.getters.getCartTotalPrice
        },
        cartTotalWeight(){
          return this.$store.getters.getTotalQuantity
        },

        getIdPedido(){
        // if(this.id_pedido !== undefined ){
          return this.id_pedido
         //}
        },
        idUser: function() {
          let id;
          if (this.$auth && this.$auth.isAuthenticated && !this.$auth.loading) {
            id = this.$auth.user["https://hasura.io/jwt/claims"][
              "x-hasura-user-id"
            ];
          } else {
            id = null;
          }
          window.console.log(id);
          return id;
        }
     },

     watch:{

       id_pedido() {
         if(this.id_pedido !== undefined){
         this.insertarDetalle(this.id_pedido);
         this.$store.dispatch('clearCart');
         }
       },
       cliente: function(val){
         if (val){
         this.cliente = val
         console.log(this.cliente = val)
      } 
      else if(this.$auth && this.$auth.isAuthenticated && !this.$auth.loading){
        this.clienteUpdate.email = this.$auth.user.email
      }

       }


     },
     
  apollo: {
    cliente:{
      query : GET_CLIENTE,
      variables(){
        return{
          id_user: this.idUser
        }
      }
    }
    
  },
  methods: {
    submit() {
      
      const direccion = this.cliente[0].direccion;
       const  precio  = this.cartTotalPrice;
       const  peso  = this.cartTotalWeight;
       this.$apollo.mutate({
        mutation: ADD_PEDIDO,
        variables: {
          direccion,
          peso,
          precio,
          id_cliente : this.cliente[0].id

        },
        refetchQueries: ["getPedidos"],

        update: (cache, {data: { insert_pedido } }) => {
           this.id_pedido = insert_pedido.returning[0].id;

          console.log("id: "+ this.id_pedido);
        }

      });
      this.direccion = "";
      this.peso = "";
      this.precio = "";

    //  let pesoIndividual;
    //  let id_producto;
      //const id_pedido = id;

      //console.log("espera mi id: "+ this.getIdPedido);
      //const pedidoID = await this.getIdPedido;
      

      

      //crear metodo que contenga la mutacion
     // this.$store.dispatch('clearCart');
    },

    insertarDetalle(pedidoId){
      for(let i=0;i<this.cart.length;i++){
        console.log("entro for id: "+ pedidoId);
        //id_producto = this.cart[i].id;
        //pesoIndividual = this.cart[i].cant;

        this.$apollo.mutate({
        mutation: ADD_DETALLE_PEDIDO,
        variables: {
          "id_pedido" : pedidoId,
          "id_producto" : this.cart[i].id,
          "pesoIndividual" : this.cart[i].cant
        },
      });
      }

      
    },

    async insertPedido(){

      const direccion = this.cliente[0].direccion;
       const  precio  = this.cartTotalPrice;
       const  peso  = this.cartTotalWeight;

       let pedidoID
       this.$apollo.mutate({
        mutation: ADD_PEDIDO,
        variables: {
          direccion,
          peso,
          precio
        },
        refetchQueries: ["getPedidos"],

        update: (cache, {data: { insert_pedido } }) => {
           /*this.id_pedido*/ pedidoID = insert_pedido.returning[0].id;

          console.log("id: "+ this.id_pedido);
        },

      });

      let idPedido = await pedidoID;

      return idPedido

    }

  }
};
</script>

<style>
form {
  width: 50%;
}
.submit-form {
  display: flex;
  justify-content: center;
}
</style>