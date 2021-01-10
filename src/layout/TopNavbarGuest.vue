<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Carnicería Benjamín</a>
      <button
        type="button"
        class="navbar-toggler navbar-toggler-right"
        :class="{ toggled: $sidebar.showSidebar }"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <!--
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a>

            
            ->


          </li>
          <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-planet"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </base-dropdown>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li>
        </ul>

        -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <sidebar-link class="nav-link" to="/login">
              <i class="nc-icon nc-cart-simple"></i>
            </sidebar-link>
          </li>
          <!--
          <base-dropdown title="Dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </base-dropdown>
          -->
          <li v-if="!$auth.isAuthenticated && !$auth.loading" class="nav-item">
            <button
              id="qsLoginBtn"
              class="btn btn-primary btn-margin"
              @click.prevent="login"
            >
              Login
            </button>
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
                @click="prueba"
              />
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <div class="dropdown-header">{{ $auth.user.name }}</div>

              <a
                id="qsLogoutBtn"
                href="#"
                class="dropdown-item"
                @click.prevent="logout"
              >
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
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  methods: {
    prueba(){
      window.console.log(this.$auth.user["https://hasura.io/jwt/claims"]["x-hasura-default-role"]);
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
};
</script>
<style></style>
