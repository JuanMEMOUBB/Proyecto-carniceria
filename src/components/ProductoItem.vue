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

  <div :key="producto.id">
    <div class="card">
      <img
        class="card-img-top"
        src="https://picsum.photos/200/150/?random"
      />
      <div class="card-block">
        <figure class="profile" v-if="producto.id_categoria == 1">
          <img
            src="data:image/png;base64,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"
            class="profile-avatar"
            alt=""
          />
        </figure>
        <figure class="profile" v-if="producto.id_categoria == 4">
          <img
            src="https://image.flaticon.com/icons/png/512/47/47125.png"
            class="profile-avatar"
            alt=""
          />
        </figure>
        <figure class="profile" v-if="producto.id_categoria == 5">
          <img
            src="https://image.flaticon.com/icons/png/512/47/47054.png"
            class="profile-avatar"
            alt=""
          />
        </figure>
        <figure class="profile" v-if="producto.id_categoria == 3">
          <img
            src="data:image/png;base64,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"
            class="profile-avatar"
            alt=""
          />
        </figure>
        <figure class="profile" v-if="producto.id_categoria == 2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhicqmXG4iVRUducyVSPnGlHK2UQMb4CNZJQ&usqp=CAU"
            class="profile-avatar"
            alt=""
          />
        </figure>
        <h4 class="card-title mt-3">{{ producto.nombre }}</h4>
        <div class="meta" v-if="producto.id_categoria == 1">
          <a>Cerdo</a>
        </div>
        <div class="meta" v-if="producto.id_categoria == 4">
          <a>Cordero</a>
        </div>
        <div class="meta" v-if="producto.id_categoria == 5">
          <a>Pavo</a>
        </div>
        <div class="meta" v-if="producto.id_categoria == 3">
          <a>Pollo</a>
        </div>
        <div class="meta" v-if="producto.id_categoria == 2">
          <a>Vacuno</a>
        </div>
        <div class="card-text">
          <b>Precio: ${{ producto.precio }}</b>
        </div>
      </div>
      <div class="card-footer">
        
        <b-button v-b-modal="modalId(producto.id)">Ver Producto</b-button>

        <b-modal :id="'modal' + producto.id" title="Detalle Producto">
          <div :key="producto.id">
            
            <img
        class="card-img-top"
        src="https://picsum.photos/200/150/?random
"
      />
      <h3>{{ producto.nombre }}</h3>
            <p>Al Vacio: {{ producto.precio }}</p>
            <p>peso: {{ producto.id_categoria }}kg</p>
          </div>
          <button @click="updateCantidad('resta')" class="cart_button">-</button>
        <span class="cart_quantity">{{ cantidad }}</span>
        <button @click="updateCantidad('suma')" class="cart_button">+</button>
        <button @click="agregarCarrito(cantidad)" class="agregarCarrito">
          Añadir al carrito
        </button>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductoItem",
  props: ["producto"],

  data() {
    return {
      cantidad: 0
    };
  },

  methods: {
    updateCantidad(operacion) {
      if (operacion === "resta") {
        if (this.cantidad !== 0) {
          this.cantidad--;
        }
      } else {
        this.cantidad++;
      }
    },
    modalId(i) {
      return "modal" + i;
    },
    agregarCarrito(cantidad) {
      if (cantidad !== 0) {
        this.producto = { ...this.producto, cant: cantidad };
        this.$store.commit("setCurrentProducto", this.producto);

        this.$store.dispatch("setCartTotalWeight", cantidad);

        let precioTotal = cantidad * this.producto.precio;
        this.$store.dispatch("setCartTotalPrice", precioTotal);

        this.cantidad = 0;
      }
    }
  }
};
</script>

<style scoped>
html {
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
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
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card-block {
  font-size: 1em;
  position: relative;
  margin: 0;
  padding: 1em;
  border: none;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
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
  margin-top: 0.5em;
  color: rgba(0, 0, 0, 0.68);
}

.card-footer {
  font-size: 1em;
  position: static;
  top: 0;
  left: 0;
  max-width: 100%;
  padding: 0.75em 1em;
  color: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  background: #fff;
}

.card-inverse .btn {
  border: 1px solid rgba(0, 0, 0, 0.05);
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
  color: rgba(0, 0, 0, 0.4);
}

.meta a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.4);
}

.meta a:hover {
  color: rgba(0, 0, 0, 0.87);
}
</style>
