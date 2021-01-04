<template>
  <div class="hero is-medium is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Carnicería Benjamín
        </h1>
        <h2 class="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </h2>
      </div>
    </div>

    
    <div class="list-of-productos">
      <producto-item v-for="producto in producto" :key="producto.id" :producto="producto" class="producto-item"></producto-item>
    </div>
  </div>
 


</template>

<script>
import ProductoItem from "./ProductoItem";
import gql from "graphql-tag";
const GET_PRODUCTOS = gql`
  query getProductos {
    producto {
    id
    nombre
    precio
  }
  }
`;
export default {
  name: "ProductoList",
  components: { ProductoItem,
  },

  data() {
    return {
      producto: []
    };
  },
  computed:{
    filteredList() {
      return this.producto.filter(productoItem => {
        return ProductoItem.nombre.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  apollo: {
    producto: {
      query: GET_PRODUCTOS
    }
  }
};
</script>

<style>
.list-of-productos {
  display: flex;
  justify-content: center;
}
.producto-item {
  margin: 0 10px;
}
</style>

<style lang="scss" scoped>
    .hero {
      background: rgb(81, 186, 252);
    }
    h1, h2 {
      color: #fff;
    }
</style>
