<template>
  <div class="pedidos">
    <h1>Lista de Pedidos</h1>
    <pedidos-list v-bind="pedidos" v-on:ver-pedido="verPedido" />
    <add-pedido/>
  </div>
</template>

<script>
import AddPedido from '../components/AddPedido.vue'
import PedidosList from '../components/PedidosList.vue'
import router from '../router'
export default {
  name: 'pedidos',
  components: {
     PedidosList,
    AddPedido 
     },
     data() {
       return {
         

       }
     },
     methods: {
         verPedido(id) {
           router.push({ name: 'DetallePedido', params: { id } })

         }
     }  
}
</script>
