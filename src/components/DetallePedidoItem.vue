<template>
<div>
 <div :key="pedido_y_detalle.id_producto">
    <h3> {{ pedido_y_detalle.nombre }}</h3>
    <p> Al Vacio: {{ pedido_y_detalle.al_vacio }}</p>
    <p> peso: {{ pedido_y_detalle.peso }}kg </p>


 </div>

</div>
    
</template>

<script>
export default {
    name: "DetallePedidoItem",
    props: ["pedido_y_detalle"]
    
}
</script>
<style scoped>

</style>