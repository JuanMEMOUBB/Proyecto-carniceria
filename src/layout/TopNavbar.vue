<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">25 Carnicería Benjamín</a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
     
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <sidebar-link class="nav-link" to="/admin/carritoCompra">
              Perfil
            </sidebar-link>
          </li>
          <li class="nav-item">
            <sidebar-link class="nav-link" to="/admin/carrito">
            <i class="nc-icon nc-cart-simple"></i>
            <a> ${{ cartTotalPrice }}</a>
            </sidebar-link>
          </li>
      
          <li v-if="!$auth.isAuthenticated && !$auth.loading" class="nav-item">
              <button
                id="qsLoginBtn"
                class="btn btn-primary btn-margin"
                @click.prevent="login"
              >Login</button>
            </li>

            <li class="nav-item dropdown" v-if="$auth.isAuthenticated">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="profileDropDown"
                data-toggle="dropdown"
              >
                <img
                  :src="$auth.user.picture"
                  alt="User's profile picture"
                  class="nav-user-profile rounded-circle"
                  width="50"
                />
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="dropdown-header">{{ $auth.user.name }}</div>
                
                <a id="qsLogoutBtn" href="#" class="dropdown-item" @click.prevent="logout">
                  <b-icon class="mr-3" icon="power-off" />Log out
                </a>
              </div>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
      cartTotalPrice(){
            return this.$store.getters.getCartTotalPrice
        }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>

</style>
