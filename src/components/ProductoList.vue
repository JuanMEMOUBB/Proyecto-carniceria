<template>
  <!--
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

    
    
  </div>
  -->

  <div>

    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand class="text-white">Categorías</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <a class="nav-link active" href="#prod" @click="categoria='%'">Todas</a>
        <a class="nav-link " href="#prod" @click="categoria='cerdo%'">Cerdo</a>
        <a class="nav-link " href="#prod" @click="categoria='cordero%'">Cordero</a>
        <a class="nav-link " href="#prod" @click="categoria='pavo%'">Pavo</a>
        <a class="nav-link " href="#prod" @click="categoria='pollo%'">Pollo</a>
        <a class="nav-link " href="#prod" @click="categoria='vacuno%'">Vacuno</a>
      </b-navbar-nav>
      

      <!-- Right aligned nav items 
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>-->
      <!--</b-navbar-nav>-->
    </b-collapse>
  </b-navbar>

  <br><br>
  <div class="list-of-productos">
 <b-container fluid="sm" id="prod">
      <b-row class="container-fluid justify-content-md-center">
        <producto-item v-if="!producto.deleted_at"
          v-for="producto in producto"
          :key="producto.id"
          :producto="producto"
          class="producto-item"
        ></producto-item>
      </b-row>
    </b-container>
  </div>
  </div>
</template>

<script>
import ProductoItem from "./ProductoItem";
import gql from "graphql-tag";
const GET_PRODUCTOS = gql`
  query getProductos($categoria: String!) {
  producto(where: {categoria: {nombre: {_ilike: $categoria}}}) {
    id
    nombre
    precio
    id_categoria
    imagen
    descripcion
    deleted_at
  }
}
`;
export default {
  name: "ProductoList",
  components: { ProductoItem },

  data() {
    return {
      producto: [],
      categoria: '%'
    };
  },
  computed: {
    filteredList() {
      return this.producto.filter(productoItem => {
        return ProductoItem.nombre
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    }
  },
  apollo: {
    producto: {
      query: GET_PRODUCTOS,
      variables() {
        return {
          "categoria": this.categoria
        }
      }
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
h1,
h2 {
  color: #fff;
}
</style>
