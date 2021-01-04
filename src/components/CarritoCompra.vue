<template>
 <div
    class="dropdown-menu p-2"
    style="min-width:320px; right:0; left:auto"
    aria-labelledby="triggerId"
  >
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
      <a href="#" @click.prevent="clearCartItems()">Limpiar carro</a>
    </div>

    <div class="d-flex justify-content-between">
      <button @click.prevent="acceptCart()">Realizar Pedido</button>
    </div>

  </div>
    
</template>

<script>
import router from '../router';
export default {
    name: "CarritoCompra",

    data(){
        return{
            /*item:{
                id: '',
                nombre: '',
                cantidad: 0,
                precio: 0
            },
            shoppingCart: []
            */
        }
    },

    computed: {
        cart(){
        return this.$store.getters.getShoppingCart
        },
        cartTotalPrice(){
            return this.$store.getters.getCartTotalPrice
        }
    },

    methods:{
        removeProductFromCart(product){
            this.$store.dispatch('removeProductFromCart',product); 
        },

        clearCartItems(){
            this.$store.dispatch('clearCart');
        },

        acceptCart(){
            router.push({ name: 'MiPedido'}) 

        }
    }




};
</script>

<style scoped>

</style>