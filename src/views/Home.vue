<template>
  <div class="home">
    <img alt="Vue logo">
    <carrito-compra/>
    <producto-list/>
  </div>
</template>

<script>
import CarritoCompra from '../components/CarritoCompra.vue'
import ProductoList from '../components/ProductoList.vue'

export default {
  name: 'home',
  components: {
    ProductoList,
    CarritoCompra
    
  }
}
</script>
