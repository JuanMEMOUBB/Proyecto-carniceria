<template>
  
  <!--
  <div :key="producto.id">
    <h3>Nombre: {{ producto.nombre }}</h3>
    <p>${{ producto.precio }}</p>
    <button @click="updateCantidad('resta')" class="cart_button">-</button>
    <span class="cart_quantity">{{cantidad}}</span>
    <button @click="updateCantidad('suma')" class="cart_button">+</button>
    <button @click="agregarCarrito(cantidad)" class="agregarCarrito">Añadir al carrito</button>
  </div>
  -->

  <div  :key="producto.id">
                <div class="card">
                    <img class="card-img-top" src="https://picsum.photos/200/150/?random
">
                    <div class="card-block">
                        <figure class="profile">
                            <img src="https://picsum.photos/200/150/?random" class="profile-avatar" alt="">
                        </figure>
                        <h4 class="card-title mt-3">{{ producto.nombre }}</h4>
                        <div class="meta">
                            <a>Categoría</a>
                        </div>
                        <div class="card-text">
                            <b>Precio: ${{ producto.precio }}</b>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button @click="updateCantidad('resta')" class="cart_button">-</button>
    <span class="cart_quantity">{{cantidad}}</span>
    <button @click="updateCantidad('suma')" class="cart_button">+</button>
    <button @click="agregarCarrito(cantidad)" class="agregarCarrito">Añadir al carrito</button>
                        <button class="btn btn-secondary float-right btn-sm">show</button>
                    </div>
                </div>
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

<style scoped>
    html {
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 14px;
}

h5 {
    font-size: 1.28571429em;
    font-weight: 700;
    line-height: 1.2857em;
    margin: 0;
}

.card {
    font-size: 1em;
    overflow: hidden;
    padding: 0;
    border: none;
    border-radius: .28571429rem;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card-block {
    font-size: 1em;
    position: relative;
    margin: 0;
    padding: 1em;
    border: none;
    border-top: 1px solid rgba(34, 36, 38, .1);
    box-shadow: none;
}

.card-img-top {
    display: block;
    width: 100%;
    height: auto;
}

.card-title {
    font-size: 1.28571429em;
    font-weight: 700;
    line-height: 1.2857em;
}

.card-text {
    clear: both;
    margin-top: .5em;
    color: rgba(0, 0, 0, .68);
}

.card-footer {
    font-size: 1em;
    position: static;
    top: 0;
    left: 0;
    max-width: 100%;
    padding: .75em 1em;
    color: rgba(0, 0, 0, .4);
    border-top: 1px solid rgba(0, 0, 0, .05) !important;
    background: #fff;
}

.card-inverse .btn {
    border: 1px solid rgba(0, 0, 0, .05);
}

.profile {
    position: absolute;
    top: -12px;
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    margin: 0;
    border: 1px solid #fff;
    border-radius: 50%;
}

.profile-avatar {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.profile-inline {
    position: relative;
    top: 0;
    display: inline-block;
}

.profile-inline ~ .card-title {
    display: inline-block;
    margin-left: 4px;
    vertical-align: top;
}

.text-bold {
    font-weight: 700;
}

.meta {
    font-size: 1em;
    color: rgba(0, 0, 0, .4);
}

.meta a {
    text-decoration: none;
    color: rgba(0, 0, 0, .4);
}

.meta a:hover {
    color: rgba(0, 0, 0, .87);
}
</style>

