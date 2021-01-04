<template>
<div>
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
