<template>
  <div :key="cliente.id">
    <h3>{{ cliente.email }}</h3>
    <p>{{ cliente.nombre }} {{ cliente.apellido_paterno }} {{ cliente.apellido_materno }}</p>
    <p>Direccion: {{ cliente.direccion }}</p>
    <p>telefono_celular: {{ cliente.telefono_celular }}</p>
    <p>telefono_fijo: {{ cliente.telefono_fijo }}</p>
    
  </div>
</template>

<script>
export default {
  name: "ClienteItem",
  props: ["cliente"]
};
</script>