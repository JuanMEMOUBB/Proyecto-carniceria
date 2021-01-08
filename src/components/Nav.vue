<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand class="text-white">Categorías</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <a class="nav-link active" aria-current="page" href="#">Todas</a>
        <a class="nav-link " href="#">Cerdo</a>
        <a class="nav-link " href="#">Cordero</a>
        <a class="nav-link " href="#">Pollo</a>
        <a class="nav-link " href="#">Vacuno</a>
        <b-nav-item class="" href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items 
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>-->
      <!--</b-navbar-nav>-->
    </b-collapse>
  </b-navbar>
</div>
</template>