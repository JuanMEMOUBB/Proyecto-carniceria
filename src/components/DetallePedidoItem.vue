<template>
<div>
 <table class="table table-striped" style="width:100%">
     <thead>
         <tr>
            <th style="width:33%">Producto</th>
            <th style="width:33%">Al vacio</th>
            <th style="width:33%">Peso</th>
         </tr>
     </thead>

     <tbody>
        <tr :key="pedido_y_detalle.id_producto">
            <td>{{ pedido_y_detalle.nombre }}</td>
            <td v-if="pedido_y_detalle.al_vacio">Si</td>
            <td v-else>No</td>
            <td>{{ pedido_y_detalle.peso }}kg </td>
        </tr>
     </tbody>
 </table>

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