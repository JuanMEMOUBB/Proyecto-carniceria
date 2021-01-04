<template>
  <div :key="pedido.id">
    <h3>{{ pedido.estado_pedido }}</h3>
    <p>Direccion: {{ pedido.direccion }}</p>
    <p>Peso: {{ pedido.peso }}kg</p>
    <p>cliente: {{ pedido.id_cliente }}</p>
    <button @click="$emit('ver-pedido',pedido.id)" class="boton-ver"  >Ver</button>

  </div>
</template>

<script>
export default {
  name: "PedidoItem",
  props: ["pedido"]
};
</script>