<template>
  <div class="list-of-clientes">
    <cliente-item v-for="cliente in cliente" :key="cliente.id" :cliente="cliente" class="cliente-item"></cliente-item>
  </div>
</template>

<script>
import ClienteItem from "./ClienteItem";
import gql from "graphql-tag";
const GET_CLIENTES = gql`
  query getClientes {
    cliente {
    id
    email
    nombre
    apellido_paterno
    apellido_materno
    direccion
    telefono_celular
    telefono_fijo
  }
  }
`;
export default {
  name: "ClienteList",
  components: { ClienteItem },
  data() {
    return {
      cliente: []
    };
  },
  apollo: {
    cliente: {
      query: GET_CLIENTES
    }
  }
};
</script>

<style>
.list-of-clientes {
  display: flex;
  justify-content: center;
}
.cliente-item {
  margin: 0 10px;
}
</style>
