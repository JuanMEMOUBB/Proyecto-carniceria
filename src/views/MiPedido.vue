<template>
  
  <!--
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
-->



<div class="container">
   <div class="card shopping-cart">
            <div class="card-header bg-dark text-light">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                Carrito de compra
                
                <div class="clearfix"></div>
            </div>
            <div class="card-body" v-for="producto in cart" :key="producto.id">
                    <!-- PRODUCT -->
                    <div class="row">
                        <div class="col-12 col-sm-12 col-md-2 text-center">
                                <img class="img-responsive" src="http://placehold.it/120x80" alt="prewiew" width="120" height="80">
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                            <h4 class="product-name"><strong>{{ producto.nombre }}</strong></h4>
                            <h4>
                                <small>Descripción producto</small>
                            </h4>
                        </div>
                        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                            <div class="col-3 col-sm-3 col-md-4 text-md-right" style="padding-top: 5px">
                                <strong>{{ producto.cant }} x ${{ producto.precio }} <span class="text-muted"></span></strong>
                            </div>
                            <!--<div class="col-4 col-sm-4 col-md-4">
                                <div class="quantity">
                                    <input type="button" value="+" class="plus">
                                    <input type="number" step="1" max="99" min="1" value="1" title="Qty" class="qty"
                                           size="4">
                                    <input type="button" value="-" class="minus">
                                </div>
                            </div>-->
                            <div class="col-2 col-sm-2 col-md-2 text-right">
                                <button type="button" class="btn btn-outline-danger btn-xs">
                                    <i 
                                    href="#"
            
            @click.prevent="removeProductFromCart(producto)"

                                    class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <!-- END PRODUCT -->
                
            </div>
            <div class="card-footer">
                <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                    <div class="row">
                        
                        <b-button to="/admin/home">Seguir comprando</b-button>
                    </div>
                </div>
                <div class="pull-right" style="margin: 10px">
                    <a href="" class="btn btn-success pull-right">Solicitar Stock</a>
                    <div class="pull-right" style="margin: 5px">
                        Precio Total: <b>{{ cartTotalPrice }}</b>
                    </div>
                </div>
            </div>
        </div>
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
