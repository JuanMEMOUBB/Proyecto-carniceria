<template>
  <ul class="nav nav-mobile-menu">
    

    <li
            v-if="
              $auth.isAuthenticated &&
                !$auth.loading &&
                $auth.user['https://hasura.io/jwt/claims'][
                  'x-hasura-default-role'
                ] == 'user'
            "
            class="nav-item"
          >
            <sidebar-link class="nav-link" to="/cliente/carrito">
              <i class="nc-icon nc-cart-simple"></i>
              <a> ${{ cartTotalPrice }}</a>
            </sidebar-link>
          </li>

          <li v-if="!$auth.isAuthenticated && !$auth.loading" class="nav-item">
            <button
              id="qsLoginBtn"
              class="btn btn-primary btn-margin"
              @click.prevent="login"
            >
              Login
            </button>
          </li>

          <li v-if="$auth.isAuthenticated">
            <div>
              <b-nav-item-dropdown :text="$auth.user.name">
                <b-dropdown-item href="#" @click.prevent="logout"
                  ><b-icon-power></b-icon-power> Salir</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </div>
          </li>
  </ul>
</template>
<script>
  export default {
    name: 'mobile-menu',


    computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    cartTotalPrice() {
      return this.$store.getters.getCartTotalPrice;
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    prueba() {
      window.console.log(
        this.$auth.user["https://hasura.io/jwt/claims"]["x-hasura-default-role"]
      );
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    login() {
      this.$auth.loginWithRedirect();
      window.console.log(this.$auth.user);
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    }
  }
  }
</script>
<style>
</style>
