<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/cliente/home">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>Tienda</p>
      </sidebar-link>
      <sidebar-link to="/cliente/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>Perfil usuario</p>
      </sidebar-link>      
      <sidebar-link to="/cliente/upgrade">
        <i class="nc-icon nc-cart-simple"></i>
        <p>Pedidos</p>
      </sidebar-link>      
      <sidebar-link to="/cliente/tienda">
        <i class="nc-icon nc-bell-55"></i>
        <p>Sobre Nosotros</p>
      </sidebar-link>

      <sidebar-link to="/cliente/icons">
        <i class="nc-icon nc-bell-55"></i>
        <p>Contáctanos</p>
      </sidebar-link>

      

      <!--
      <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template>
      -->

    </side-bar>
    <div class="main-panel">
      <top-navbar-guest></top-navbar-guest>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import TopNavbarGuest from './TopNavbarGuest.vue'
  export default {
    components: {
      ContentFooter,
      DashboardContent,
      MobileMenu,
      TopNavbarGuest,
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>