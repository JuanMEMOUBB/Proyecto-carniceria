<template>
  <ul class="nav nav-mobile-menu">
    

    <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="no-icon">Log out</span>
            </a>
          </li>
          <li class="nav-item">
            <span class="no-icon" to="/admin/carrito">
            <sidebar-link class="nav-link" to="/admin/carrito">
            <i class="nc-icon nc-cart-simple"></i>
            </sidebar-link>
            </span>
            
          </li>

    <li class="nav-item">
      <a class="nav-link" href="#pablo">
        <span class="no-icon">Log out</span>
      </a>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'mobile-menu'
  }
</script>
<style>
</style>
