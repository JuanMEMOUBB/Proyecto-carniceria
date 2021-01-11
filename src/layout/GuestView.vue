<template>
  <div class="wrapper">
    <!-- admin-->
    <side-bar v-if="$auth.isAuthenticated && !$auth.loading && $auth.user['https://hasura.io/jwt/claims']['x-hasura-default-role']=='admin'">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/home">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>Tienda</p>
      </sidebar-link>
      <!--<sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>Perfil usuario</p>
      </sidebar-link>-->
      <sidebar-link to="/admin/clientes">
        <i class="nc-icon nc-notes"></i>
        <p>Clientes</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <i class="nc-icon nc-paper-2"></i>
        <p>Productos</p>
      </sidebar-link>
      
      <sidebar-link to="/admin/upgrade">
        <i class="nc-icon nc-cart-simple"></i>
        <p>Pedidos</p>
      </sidebar-link>
      
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>

      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-paper-2"></i>
        <p>Cuentas</p>
      </sidebar-link>

      
      <sidebar-link to="/admin/tienda">
        <i class="nc-icon nc-bell-55"></i>
        <p>Sobre Nosotros</p>
      </sidebar-link>

      <!--<sidebar-link to="/admin/prueba">
        <i class="nc-icon nc-bell-55"></i>
        <p>Contáctanos</p>
      </sidebar-link>-->



    </side-bar>




    <!-- usuario-->

    <side-bar v-else-if="$auth.isAuthenticated && !$auth.loading && $auth.user['https://hasura.io/jwt/claims']['x-hasura-default-role']=='user'">
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

      <!--<sidebar-link to="/cliente/icons">
        <i class="nc-icon nc-bell-55"></i>
        <p>Contáctanos</p>
      </sidebar-link>-->

      

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




    <!-- invitado-->
    <side-bar v-else-if="!$auth.isAuthenticated && !$auth.loading">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/home">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>Tienda</p>
      </sidebar-link>      
      <sidebar-link to="/tienda">
        <i class="nc-icon nc-bell-55"></i>
        <p>Sobre Nosotros</p>
      </sidebar-link>

      <!--<sidebar-link to="/icons">
        <i class="nc-icon nc-bell-55"></i>
        <p>Contáctanos</p>
      </sidebar-link>-->

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