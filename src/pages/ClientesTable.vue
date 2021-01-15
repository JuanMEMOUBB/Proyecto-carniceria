<template>
  <div class="container">
    <div id="vue-table" style="overflow-x:auto;">
      
      <input type="text" v-model="search" placeholder="Busqueda" class="form-control" />
      <input type="radio" id="1" value = 1 name="Categoria" v-model="value">
      <label for="1">Por Nombre </label>
        <input type="radio" id="2" value = 2 name="Categoria" v-model="value">
        <label for="2">Por Ciudad</label>
      <table class="table table-striped" style="width:100%">
        
        <thead>
          <tr>
            <th style="width: 17%"  @click="sort('nombre')">Nombre</th>
            <th style="width: 17%" @click="sort('apellido_paterno')">Apellidos</th>
            <th style="width: 17%" @click="sort('ciudad')">Ciudad</th>
            <th style="width: 17%" @click="sort('email')">Email</th>
            <th style="width: 17%">Telefono</th>
            <th style="width: 17%">Celular</th> 
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="people in  filterPeople" v-bind:key="people.id">
            <td>{{ people.nombre }}</td>
            <td>{{ people.apellido_paterno }}  {{people.apellido_materno }}</td>
            <td>{{ people.ciudad }}</td>
            <td>{{ people.email }}</td>
            <td>{{ people.telefono_celular }}</td>
            <td>{{ people.telefono_fijo }}</td>
            <td><b-button size="sm" @click="verPedidos(people.id, $event.target)" class="mr-1">
          Ver Pedidos
        </b-button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import gql from "graphql-tag";
import router from '../router';
const GET_CLIENTES = gql`
  query getClientes {
    cliente {
    id
    email
    nombre
    apellido_paterno
    apellido_materno
    ciudad
    telefono_celular
    telefono_fijo
  }
  }
`;

const GET_PEDIDOS_DE_CLIENTE = gql`
query getPedidosDeCliente($_eq: Int!) {
  pedido(where: {id_cliente: {_eq: $_eq}}) {
    direccion
    estado_pedido
    peso
    precio
    fecha_despacho
    nombre_empresa_despacho
    numero_seguimiento
    detallepedidos {
      producto {
        nombre
      }
      peso
      al_vacio
    }
  }
}
`;


export default {
  name: "Tienda2",

  data(){
    return {  
    
    value: "1",

    currentSort:'pedido.estado_pedido',
    currentSortDir:'asc',
    
    search: '',
    
    reverse: false,
    
    columns: ['nombre', 'apellido','ciudad','email','celular','telefono'],
    
    cliente: [],

    pedidoCliente: '',


    infoModal: {
      id: 'info-modal',
      content: '',
      id_cliente: ''
    }
  }
  },
  apollo: {
    cliente: {
      query: GET_CLIENTES
    }    
  },
  methods: {
    sort:function(sortColumn) {
    //if s == current sort, reverse
    if(sortColumn === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = sortColumn;
  },
    
    onlyCity: function(value){

      let ciudad = value.split(",")
      return ciudad[1];
    },

    //metodos modal
    verPedidos(clienteID){

      router.push({ name: 'ClientePedidoDetail', params: { id: clienteID } })
      
    },
  },
  

  computed:{
    filterPeople: function(){
      if(this.value === "1"){
      return this.cliente.filter((people) => {
        return ( people.nombre.toLowerCase().match(this.search.toLowerCase()) || people.apellido_paterno.toLowerCase().match(this.search.toLowerCase()) || people.apellido_materno.toLowerCase().match(this.search.toLowerCase()) );
      });
      }
      if(this.value === "2") {
      return this.cliente.filter((people) => {
        return  people.ciudad.toLowerCase().match(this.search.toLowerCase());
      });
      }

    },
  },


}
  

</script>

<style >


</style>

