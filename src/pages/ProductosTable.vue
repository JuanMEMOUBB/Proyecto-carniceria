<template>
  <div class="container">
    <div id="vue-table" style="overflow-x:auto;">
      <div>
        <b-button @click="agregar($event.target)" variant="success">Agregar Producto</b-button>
      </div>

      <input
        type="text"
        v-model="search"
        placeholder="Busqueda"
        class="form-control"
      />
      <input type="radio" id="1" value="1" name="Categoria" v-model="value" />
      <label for="1">Por Producto </label>
      <input type="radio" id="2" value="2" name="Categoria" v-model="value" />
      <label for="2">Por Categoría</label>
      <div ref="content">
        <table class="table" style="width:100%">
          <thead>
            <tr>
              <th
                style="width:40%"
                v-for="column in columns"
                v-bind:key="column"
              >
                <a
                  href="#"
                  v-on:click="sortBy(column)"
                  v-bind:class="{ active: sortKey == column }"
                >
                  {{ column }}
                </a>
              </th>
            </tr>
          </thead>
        
        <tbody>
          <tr v-for="product in  filterProduct" v-bind:key="product.id">
            <td v-if="!product.deleted_at">{{ product.nombre }}</td>
            <td v-if="!product.deleted_at">${{ product.precio }}</td>
            <td v-if="!product.deleted_at">{{ categoria(product.id_categoria) }}</td>
            <td v-if="!product.deleted_at"><b-button size="sm" @click="info(product, $event.target)" class="mr-1">
          Editar
        </b-button></td>
        <td v-if="!product.deleted_at"><b-button variant="danger" size="sm" @click="borrarProducto(product.id)" class="mr-1">
          Eliminar
        </b-button></td>          
          </tr>
        </tbody>
      </table>
      </div>

      <!-- Info modal-->
      <b-modal
        :id="infoModal.id"
        title="Producto"
        ok-only
        @hide="resetInfoModal"
      >
        <fieldset>
          <div class="row">
            <div class="col-md-6">
              <label for="input-live">Nombre:</label>
              <b-form-input
                id="input-nombre"
                :state="validacionNombre"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Nombre"
                v-model="infoModal.nombre"
                trim
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Ingrese más de 3 letras
              </b-form-invalid-feedback>
            </div>
            <div class="col-md-6">
              <label for="input-live">Precio:</label>
              <b-form-input
                id="input-nombre"
                :state="validacionPrecio"
                type="number"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Precio"
                v-model="infoModal.precio"
                trim
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Ingrese más de 1 dígito
              </b-form-invalid-feedback>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <label for="input-live">Descripción:</label>
              <b-form-input
                id="input-nombre"
                :state="validacionDescripcion"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Descripción"
                v-model="infoModal.descripcion"
                trim
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Ingrese más de 3 letras
              </b-form-invalid-feedback>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <label for="input-live">Imagen:</label>
              <b-form-input
                id="input-imagen"
                :state="validacionImagen"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Link Imagen"
                v-model="infoModal.imagen"
                trim
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Ingrese un link de imagen
              </b-form-invalid-feedback>
            </div>
          </div>

          <div class="row">
            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-md-12">
                  <input
                    type="radio"
                    id="1"
                    value="1"
                    name="Categoria"
                    v-model="infoModal.id_categoria"
                  />
                  <label for="1">Cerdo</label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <input
                    type="radio"
                    id="2"
                    value="2"
                    name="Categoria"
                    v-model="infoModal.id_categoria"
                  />
                  <label for="2">Vacuno</label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <input
                    type="radio"
                    id="3"
                    value="3"
                    name="Categoria"
                    v-model="infoModal.id_categoria"
                  />
                  <label for="3">Pollo</label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <input
                    type="radio"
                    id="4"
                    value="4"
                    name="Categoria"
                    v-model="infoModal.id_categoria"
                  />
                  <label for="4">Cordero</label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <input
                    type="radio"
                    id="5"
                    value="5"
                    name="Categoria"
                    v-model="infoModal.id_categoria"
                  />
                  <label for="5">Pavo</label>
                </div>
              </div>
            </form>
          </div>

          <b-button
            size="sm"
            @click="editarInfo()"
            class="mr-1"
            :disabled="!todasValidaciones"
            >Confirmar</b-button
          >
        </fieldset>
      </b-modal>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jsPDF from "jspdf";
const GET_PRODUCTOS = gql`
  query getProductos {
    producto {
    id
    nombre
    precio
    id_categoria
    descripcion
    deleted_at
    imagen
  }

  }
`;

const EDIT_PRODUCTO = gql`
  mutation MyMutation(
    $_eq: Int!
    $nombre: String!
    $precio: Int!
    $descripcion: String!
    $id_categoria: Int!
    $imagen: String!
  ) {
    update_producto(
      where: { id: { _eq: $_eq } }
      _set: {
        nombre: $nombre
        precio: $precio
        descripcion: $descripcion
        id_categoria: $id_categoria
        imagen: $imagen
      }
    ) {
      affected_rows
    }
  }
`;
const INSERT_PRODUCTO = gql`
  mutation InsertProducto(
    $nombre: String!
    $precio: Int!
    $id_categoria: Int!
    $descripcion: String!
    $imagen: String!
  ) {
    insert_producto(
      objects: {
        nombre: $nombre
        precio: $precio
        id_categoria: $id_categoria
        descripcion: $descripcion
        imagen: $imagen
      }
    ) {
      affected_rows
    }
  }
`;
const DELETE_LOGIC_PRODUCTO = gql`
mutation deleteProducto($_eq: Int!, $deleted_at: timestamptz!) {
  update_producto(where: {id: {_eq: $_eq}}, _set: {deleted_at: $deleted_at}) {
    affected_rows
  }
}
`;

export default {
  name: "Tienda2",

  data() {
    return {
      value: "1",

      sortKey: "",

      search: "",

      reverse: false,

      columns: ["nombre", "precio", "categoria"],

      producto: [],

      infoModal: {
        id: "info-modal",
        id_producto: "",
        nombre: "",
        precio: "",
        id_categoria: "",
        descripcion: "",
        imagen: "",
      },
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      }
    };
  },
  apollo: {
    producto: {
      query: GET_PRODUCTOS
    }
  },
  methods: {
    
    sortBy: function(sortKey) {
      this.reverse = this.sortKey === sortKey ? !this.reverse : false;
      this.sortKey = sortKey;
    },

    categoria: function(id) {
      if (id === 1) {
        return "Cerdo";
      }
      if (id === 2) {
        return "Vacuno";
      }
      if (id === 3) {
        return "Pollo";
      }
      if (id === 4) {
        return "Cordero";
      }
      if (id === 5) {
        return "Pavo";
      }
    },

    borrarProducto(idProducto){
      if(confirm("¿Esta seguro que desea borrar el producto? ¡Este proceso es irrevertible!")){
        this.$apollo.mutate({
          mutation: DELETE_LOGIC_PRODUCTO,
          variables:{
            "_eq": idProducto,
            "deleted_at": new Date()
          },
          refetchQueries: GET_PRODUCTOS
        })      

      }
      this.$apollo.queries.producto.refetch()

    },

    //metodos Modal
    info(product, button) {
      this.infoModal.nombre = product.nombre;
      this.infoModal.precio = product.precio;
      this.infoModal.descripcion = product.descripcion;
      this.infoModal.id_producto = product.id;
      this.infoModal.id_categoria = product.id_categoria;
      this.infoModal.imagen = product.imagen;
      this.infoModal.content = JSON.stringify(product, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.nombre = "";
      this.infoModal.precio = "";
      this.infoModal.descripcion = "";
      this.infoModal.id_categoria = "";
      this.infoModal.imagen = "";
      this.$apollo.queries.producto.refetch();
    },
    editarInfo() {
      if (this.infoModal.id_producto == "") {
        this.$apollo.mutate({
          mutation: INSERT_PRODUCTO,
          variables: {
            nombre: this.infoModal.nombre,
            precio: this.infoModal.precio,
            descripcion: this.infoModal.descripcion,
            id_categoria: this.infoModal.id_categoria,
            imagen: this.infoModal.imagen,
          },
          refetchQueries: GET_PRODUCTOS
        });
        this.notifyVue("top", "center");
      } else {
        this.$apollo.mutate({
          mutation: EDIT_PRODUCTO,
          variables: {
            _eq: this.infoModal.id_producto,
            nombre: this.infoModal.nombre,
            precio: this.infoModal.precio,
            descripcion: this.infoModal.descripcion,
            id_categoria: this.infoModal.id_categoria,
            imagen: this.infoModal.imagen,
          },
          refetchQueries: GET_PRODUCTOS
        });
        this.notifyVue("top", "center");
      }
    },

    agregar(button) {
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notifications.notify({
        message: `<span>Producto <b>Registrado.</span>`,
        icon: "nc-icon nc-app",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      });
    }
  },

  computed: {
    filterProduct: function() {
      if (this.value === "1") {
        return this.producto.filter(product => {
          return product.nombre.toLowerCase().match(this.search.toLowerCase());
        });
      }
      if (this.value === "2") {
        return this.producto.filter(product => {
          return this.categoria(product.id_categoria)
            .toLowerCase()
            .match(this.search.toLowerCase());
        });
      }
    },
    validacionNombre() {
      return this.infoModal.nombre && this.infoModal.nombre.length > 2
        ? true
        : false;
    },
    validacionPrecio() {
      return this.infoModal.precio && this.infoModal.precio.length > 1
        ? true
        : false;
    },
    validacionDescripcion() {
      return this.infoModal.descripcion && this.infoModal.descripcion.length > 2
        ? true
        : false;
    },
    todasValidaciones() {
      return (
        this.validacionDescripcion &&
        this.validacionPrecio &&
        this.validacionNombre &&
        this.validacionImagen
      );
    },
    validacionImagen() {
      return this.infoModal.imagen && this.infoModal.imagen.length > 10
        ? true
        : false;
    },
  }
};
</script>

<style></style>
