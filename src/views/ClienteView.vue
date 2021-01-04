<template>
  <div class="clienteView">
    <cliente-list/>
    <button class="button-nuevo-cliente" value="Nuevo" @click="nuevoCliente()" >Agregar Cliente</button>
  </div>
</template>

<script>
import ClienteList from '../components/ClienteList.vue'
import router from '../router'

export default {
  name: 'clienteView',
  components: {
    ClienteList
    
  },
  methods: {
      nuevoCliente() {
           router.push({ name: 'AddCliente'})

         }
  }
}
</script>