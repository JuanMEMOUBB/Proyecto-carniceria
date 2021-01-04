<template>
  <div :key="producto.id">
    <h3>Nombre: {{ producto.nombre }}</h3>
    <p>${{ producto.precio }}</p>
    <button @click="updateCantidad('resta')" class="cart_button">-</button>
    <span class="cart_quantity">{{cantidad}}</span>
    <button @click="updateCantidad('suma')" class="cart_button">+</button>
    <button @click="agregarCarrito(cantidad)" class="agregarCarrito">Añadir al carrito</button>
  </div>
</template>

<script>
export default {
  name: "ProductoItem",
  props: ["producto"],

  data() {
    return{
      cantidad: 0,
            
    }
  },

  methods: {
    updateCantidad(operacion){
      if(operacion === 'resta'){
        if(this.cantidad !== 0){
          this.cantidad--;
        }
      }else{
        this.cantidad++;
      }
    },

    agregarCarrito(cantidad){
      if(cantidad !== 0){
        this.producto = {...this.producto, cant: cantidad};
        this.$store.commit('setCurrentProducto',this.producto);

        this.$store.dispatch('setCartTotalWeight',cantidad);
        
        let precioTotal = cantidad * this.producto.precio;        
        this.$store.dispatch('setCartTotalPrice',precioTotal);


        this.cantidad = 0;
      }
    }

  }

  
};
</script>