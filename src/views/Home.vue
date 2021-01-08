<template>
  <div class="home">
    <!--<carrito-compra/>-->
    <carrusel/>
    <producto-list/>
    
  </div>
</template>

<script>
//import CarritoCompra from '../components/CarritoCompra.vue'
import ProductoList from '../components/ProductoList.vue'
import Carrusel from '../components/Carrusel.vue'

export default {
  name: 'home',
  components: {
    Carrusel,
    ProductoList
    
    //CarritoCompra
    
  }
}
</script>


