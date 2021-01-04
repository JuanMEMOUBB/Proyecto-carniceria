<template>
  <div class="submit-form">
    <form @submit.prevent="submit">
      <fieldset>
        <input type="text" placeholder="Nombre" v-model="nombre">
        <input type="text" placeholder="precio" v-model="precio">
        <input type="text" placeholder="descripcion" v-model="descripcion">

        <input type="radio" id="1" value = 1 name="Categoria" v-model="id_categoria">
        <label for="1">Cerdo</label>

        <input type="radio" id="2" value = 2 name="Categoria" v-model="id_categoria">
        <label for="2">Vacuno</label>

        <input type="radio" id="3" value = 3 name="Categoria" v-model="id_categoria">
        <label for="3">Pollo</label>

        <input type="radio" id="4" value = 4 name="Categoria" v-model="id_categoria">
        <label for="4">Cordero</label>

        <input type="radio" id="5" value = 5 name="Categoria" v-model="id_categoria">
        <label for="5">Pavo</label>
      </fieldset>
      <input class="button-primary" type="submit" value="Send">
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";

const ADD_PRODUCTO = gql`
  mutation addProducto(
    $nombre: String!
    $precio: Int!
    $descripcion: String!
    $id_categoria: Int!
  ) {
    insert_producto(
      objects: [
        {
          nombre: $nombre
          precio: $precio
          descripcion: $descripcion
          id_categoria: $id_categoria
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;
export default {
  name: "AddProducto",
  data() {
    return {
        nombre: "",
        precio: "",
        descripcion: "",
        id_categoria: ""
    };
  },
  apollo: {},
  methods: {
    submit() {
      const { nombre, precio, descripcion, id_categoria } = this.$data;
      this.$apollo.mutate({
        mutation: ADD_PRODUCTO,
        variables: {
          nombre,
          precio,
          descripcion,
          id_categoria,
        },
        refetchQueries: ["getProducto"]
      });
      this.nombre = "";
      this.precio = "";
      this.descripcion = "";
      this.id_categoria = "";

      alert("Producto agregado");
    }
  }
};
</script>
<style>
form {
  width: 50%;
}
.submit-form {
  display: flex;
  justify-content: center;
}
</style>