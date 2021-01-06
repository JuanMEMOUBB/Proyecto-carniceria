<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          
  <card>
    <h4 slot="header" class="card-title">Editar perfil</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Carnicería"
                    :disabled="true"
                    placeholder="Light dashboard"
                    v-model="user.carniceria">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="text"
                    label="Usuario"
                    placeholder="Usuario"
                    v-model="user.usuario">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="user.email">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="Nombre"
                    placeholder="Nombre"
                    v-model="user.nombre">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text"
                    label="Apellido"
                    placeholder="Apellido"
                    v-model="user.apellido">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input type="text"
                    label="Dirección"
                    placeholder="Dirección"
                    v-model="user.direccion">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input type="text"
                    label="Ciudad"
                    placeholder="Ciudad"
                    v-model="user.ciudad">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="País"
                    placeholder="País"
                    v-model="user.pais">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="number"
                    label="Código Postal"
                    placeholder="Código Postal"
                    v-model="user.codigoPostal">
          </base-input>
        </div>
      </div>
      <!--
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>About Me</label>
            <textarea rows="5" class="form-control border-input"
                      placeholder="Here can be your description"
                      v-model="user.aboutMe">
              </textarea>
          </div>
        </div>
      </div>
      -->
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Actualizar perfil
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
  </div>
        <div class="col-md-4">
          <user-card>
          </user-card>
        </div>
      </div>
    </div>
  </div>
</template>
        
<script>
  //import EditProfileForm from './UserProfile/EditProfileForm.vue'
  // import UserCard from './UserProfile/UserCard.vue'

  /*export default {
    components: {
      EditProfileForm,
      // UserCard
    }
  }*/

  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        user: {
          carniceria: 'Carnicería 25',
          usuario: 'mariana99',
          email: 'mariana99@gmai.com',
          nombre: 'Mariana',
          apellido: 'Contreras',
          direccion: '18 de Septiembre',
          ciudad: 'Chillán',
          pais: 'Chile',
          codigoPostal: '',
        }
      }
    },
    methods: {
      updateProfile () {
        alert('Tu información: ' + JSON.stringify(this.user) + ' fue actualizada')
      }
    }
  }

</script>
<style>

</style>
