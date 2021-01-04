<template>
  <div class="mi-pedido">
      <div v-for="producto in cart" :key="producto.id">
      <div class="px-2 d-flex justify-content-between">
        <div>
          <strong>{{ producto.nombre }}</strong>
          <br />
          {{ producto.cant }} x ${{ producto.precio }}
        </div>
        <div>
          <a
            href="#"
            class="badge badge-secondary"
            @click.prevent="removeProductFromCart(producto)"
          >Remover</a>
        </div>
      </div>
      <hr />
    </div>
    <div class="d-flex justify-content-between">
      <span>Total: ${{ cartTotalPrice }}</span>
    </div>

    <add-pedido/>

  </div>
</template>

<script>
import AddPedido from '../components/AddPedido.vue'

export default {
  name: 'MiPedido',
  components: {
    AddPedido 
     },
     data() {
       return {
         

       }
     },

     computed:{
         cart(){
        return this.$store.getters.getShoppingCart
        },
        cartTotalPrice(){
            return this.$store.getters.getCartTotalPrice
        }
     },
     methods: {
         removeProductFromCart(product){
            this.$store.dispatch('removeProductFromCart',product); 
        },
     }  
}
</script>
