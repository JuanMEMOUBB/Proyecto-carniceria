<template>
  <div class="container">
    <div id="vue-table" style="overflow-x:auto;">

      <div>
       <b-button @click="agregar($event.target)">Agregar Producto</b-button> 
      </div>
      
      <input type="text" v-model="search" placeholder="Busqueda" class="form-control" />
      <input type="radio" id="1" value = 1 name="Categoria" v-model="value">
      <label for="1">Por Producto </label>
        <input type="radio" id="2" value = 2 name="Categoria" v-model="value">
        <label for="2">Por Categoría</label>
      <table class="table table-striped" style="width:100%">
        
        <thead>
          <tr>
            <th style="width:40%" v-for="column in columns" v-bind:key="column" >
              <a href="#" 
                v-on:click= "sortBy(column)"
                v-bind:class="{active: sortKey == column}"
                >
                {{ column }}
              </a>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="product in  filterProduct" v-bind:key="product.id">
            <td>{{ product.nombre }}</td>
            <td>${{ product.precio }}</td>
            <td>{{ categoria(product.id_categoria) }}</td>
            <td><b-button size="sm" @click="info(product, $event.target)" class="mr-1">
          Editar
        </b-button></td>          
          </tr>
        </tbody>
      </table>

      <!-- Info modal-->
      <b-modal :id="infoModal.id" title="Editar Producto"  ok-only @hide="resetInfoModal">
          <fieldset>
          Nombre: <input type="text" v-model="infoModal.nombre"> <br>
            Precio: $<input type="text" v-model="infoModal.precio"> <br>
            Descripción: <input type="text" v-model="infoModal.descripcion"> <br>
            <form @submit.prevent="submit">
          <input type="radio" id="1" value = 1 name="Categoria" v-model="infoModal.id_categoria">
        <label for="1">Cerdo</label>

        <input type="radio" id="2" value = 2 name="Categoria" v-model="infoModal.id_categoria">
        <label for="2">Vacuno</label>

        <input type="radio" id="3" value = 3 name="Categoria" v-model="infoModal.id_categoria">
        <label for="3">Pollo</label>

        <input type="radio" id="4" value = 4 name="Categoria" v-model="infoModal.id_categoria">
        <label for="4">Cordero</label>

        <input type="radio" id="5" value = 5 name="Categoria" v-model="infoModal.id_categoria">
        <label for="5">Pavo</label>
        </form>
            <b-button size="sm" @click="editarInfo()" class="mr-1">Confirmar</b-button>
          </fieldset>
    </b-modal>  
    </div>
  </div>
</template>

<script>

import gql from "graphql-tag";
const GET_PRODUCTOS = gql`
  query getProductos {
    producto {
    id
    nombre
    precio
    id_categoria
    descripcion
  }
  }
`;

const EDIT_PRODUCTO = gql`
mutation MyMutation($_eq: Int!, $nombre: String!, $precio: Int!, $descripcion: String!, $id_categoria: Int!) {
  update_producto(where: {id: {_eq: $_eq}}, _set: {nombre: $nombre, precio: $precio, descripcion: $descripcion, id_categoria: $id_categoria}) {
    affected_rows
  }
}
`;
const INSERT_PRODUCTO = gql`
mutation InsertProducto($nombre: String!, $precio: Int!, $id_categoria: Int!, $descripcion: String!) {
  insert_producto(objects: {nombre: $nombre, precio: $precio, id_categoria: $id_categoria, descripcion: $descripcion}) {
    affected_rows
  }
}
`;


export default {
  name: "Tienda2",

  data(){
    return {  
    
    value: "1",

    sortKey: '',
    
    search: '',
    
    reverse: false,
    
    columns: ['nombre', 'precio', 'categoria'],
    
    producto: [],

    infoModal: {
          id: 'info-modal',
          id_producto: '',
          nombre: '',
          precio: '',
          id_categoria: '',
          descripcion: ''
        },
    type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
  }
  },
  apollo: {
    producto: {
      query: GET_PRODUCTOS
    }
  },
  methods: {
    sortBy: function(sortKey) {
      this.reverse = (this.sortKey === sortKey) ? ! this.reverse : false;
      this.sortKey = sortKey;
    },

    categoria: function(id){
        if(id === 1){
            return "Cerdo";
        }
        if(id === 2){
            return "Vacuno";
        }
        if(id === 3){
            return "Pollo";
        }
        if(id === 4){
            return "Cordero";
        }
        if(id === 5){
            return "Pavo";
        }
    },

    //metodos Modal
    info(product, button) {
        this.infoModal.nombre = product.nombre;
        this.infoModal.precio = product.precio;
        this.infoModal.descripcion = product.descripcion;
        this.infoModal.id_producto = product.id;
        this.infoModal.id_categoria = product.id_categoria;
        this.infoModal.content = JSON.stringify(product, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.nombre = ''
        this.infoModal.precio = ''
        this.infoModal.descripcion = ''
        this.infoModal.id_categoria = ''
        this.$apollo.queries.producto.refetch()
      },
      editarInfo(){
        if(this.infoModal.id_producto == ''){
          this.$apollo.mutate({
            mutation: INSERT_PRODUCTO,
            variables:{
              "nombre" : this.infoModal.nombre,
            "precio" : this.infoModal.precio,
            "descripcion": this.infoModal.descripcion,
            "id_categoria": this.infoModal.id_categoria
            },
            refetchQueries: GET_PRODUCTOS
          })
          this.notifyVue('top','center');

        } else {
            this.$apollo.mutate({
          mutation: EDIT_PRODUCTO,
          variables: {
            "_eq" : this.infoModal.id_producto,
            "nombre" : this.infoModal.nombre,
            "precio" : this.infoModal.precio,
            "descripcion": this.infoModal.descripcion,
            "id_categoria": this.infoModal.id_categoria

          },
          refetchQueries: GET_PRODUCTOS
        })
          this.notifyVue('top','center');
        }
      },

      agregar(button){
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)


      },

      notifyVue (verticalAlign, horizontalAlign) {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            message: `<span>Producto <b>Actualizado.</span>`,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      }

  },

  computed:{
    filterProduct: function(){
      if(this.value === "1"){
            return this.producto.filter((product) => {
            return product.nombre.toLowerCase().match(this.search.toLowerCase());
            });
        }
        if(this.value === "2"){
            return this.producto.filter((product) => {
            return this.categoria(product.id_categoria).toLowerCase().match(this.search.toLowerCase());
            });
        }
    }
  }

}
  

</script>

<style >


</style>

