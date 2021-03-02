<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <h4 slot="header" class="card-title">Editar perfil</h4>
            <form v-if="clienteUpdate">
              <div class="row">
                <div class="col-md-6">
                  <label for="input-live">Nombre:</label>
                  <b-form-input
                    id="input-nombre"
                    :state="validacionNombre"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Nombre"
                    v-model="clienteUpdate.nombre"
                    trim
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Ingrese más de 3 letras
                  </b-form-invalid-feedback>
                </div>
                <div class="col-md-3">
                  <label for="input-live">Apellido paterno:</label>
                  <b-form-input
                    id="input-apellido-paterno"
                    :state="validacionApellidoPaterno"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Apellido Paterno"
                    v-model="clienteUpdate.apellido_paterno"
                    trim
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Ingrese más de 3 letras
                  </b-form-invalid-feedback>
                </div>
                <div class="col-md-3">
                  <label for="input-live">Apellido materno:</label>
                  <b-form-input
                    id="input-apellido-materno"
                    :state="validacionApellidoMaterno"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Apellido Materno"
                    v-model="clienteUpdate.apellido_materno"
                    trim
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Ingrese más de 3 letras
                  </b-form-invalid-feedback>
                  
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <base-input
                    type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="clienteUpdate.email"
                    disabled="true"
                  >
                  </base-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label for="input-live">Dirección:</label>
                  <b-form-input
                    id="input-direccion"
                    :state="validacionDireccion"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Dirección"
                    v-model="clienteUpdate.direccion"
                    trim
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Ingrese más de 3 letras
                  </b-form-invalid-feedback>
                  
                </div>

                <div class="col-md-6">
                  <label for="input-live">Ciudad:</label>
                  <b-form-input
                    id="input-ciudad"
                    :state="validacionCiudad"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Ciudad"
                    v-model="clienteUpdate.ciudad"
                    trim
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Ingrese más de 3 letras
                  </b-form-invalid-feedback>
                  
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label for="input-live">Teléfono Fijo:</label>
                  <b-form-input
                    id="input-fijo"
                    type= "number"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Teléfono fijo"
                    v-model="clienteUpdate.telefono_fijo"
                    trim
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Ingrese más de 3 dígitos
                  </b-form-invalid-feedback>

                  
                </div>
                <div class="col-md-6">
                  <label for="input-live">Teléfono Celular:</label>
                  <b-form-input
                    id="input-celular"
                    type= "number"
                    :state="validacionCelular"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Teléfono celular"
                    v-model="clienteUpdate.telefono_celular"
                    trim
                  >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    Ingrese más de 3 dígitos
                  </b-form-invalid-feedback>
                  
                </div>
              </div>
              <!--
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>About Me</label>
            <textarea rows="5" class="form-control border-input"
                      placeholder="Here can be your description"
                      v-model="cliente.aboutMe">
              </textarea>
          </div>
        </div>
      </div>
      -->
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-info btn-fill float-right"
                  @click.prevent="updateProfile"
                  :disabled="!todasValidaciones"
                >
                  Actualizar perfil
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
          </card>
        </div>
        <div class="col-md-4">
          <!--
          <user-card> </user-card>
          -->
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

import Card from "src/components/Cards/Card.vue";
import gql from "graphql-tag";
const GET_CLIENTE = gql`
  query getPedidos($id_user: String!) {
    cliente(where: { user: { id: { _eq: $id_user } } }) {
      apellido_materno
      apellido_paterno
      direccion
      email
      nombre
      telefono_celular
      telefono_fijo
      ciudad
    }
  }
`;
const ADD_CLIENTE = gql`
  mutation addCliente(
    $nombre: String
    $email: String
    $apellido_paterno: String
    $apellido_materno: String
    $telefono_celular: String
    $telefono_fijo: String
    $direccion: String
    $ciudad: String
  ) {
    insert_cliente(
      objects: [
        {
          nombre: $nombre
          email: $email
          apellido_paterno: $apellido_paterno
          apellido_materno: $apellido_materno
          telefono_celular: $telefono_celular
          telefono_fijo: $telefono_fijo
          direccion: $direccion
          ciudad: $ciudad
        }
      ]
      on_conflict: {
        constraint: cliente_email_key
        update_columns: [nombre, direccion, apellido_paterno, apellido_materno, ciudad, telefono_fijo, telefono_celular]
      }
    ) {
      returning {
        id
        nombre
        email
        direccion
        apellido_paterno
        apellido_materno
        ciudad
      }
    }
  }
`;
export default {
  components: {
    Card
  },
  data() {
    return {
      clienteUpdate: {
        nombre: null,
        email: null,
        apellido_paterno: null,
        apellido_materno: null,
        telefono_celular: null,
        telefono_fijo: null,
        direccion: null,
        ciudad:null
      },
      cliente: null
    };
  },
  watch: {
    cliente: function(val) {
      if (val) {
        this.clienteUpdate = val;
      } else if (
        this.$auth &&
        this.$auth.isAuthenticated &&
        !this.$auth.loading
      ) {
        this.clienteUpdate.email = this.$auth.user.email;
      }
    }
  },
  methods: {
    updateProfile() {
      this.$apollo.mutate({
        mutation: ADD_CLIENTE,
        variables: {
          nombre: this.clienteUpdate.nombre,
          email: this.clienteUpdate.email,
          apellido_paterno: this.clienteUpdate.apellido_paterno,
          apellido_materno: this.clienteUpdate.apellido_materno,
          telefono_celular: this.clienteUpdate.telefono_celular,
          telefono_fijo: this.clienteUpdate.telefono_fijo,
          direccion: this.clienteUpdate.direccion,
          ciudad: this.clienteUpdate.ciudad
        },
        refetchQueries: ["getClientes"]
      });
      this.notifyVue()
    },
    notifyVue () {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            message: `<b>Cliente actualizado</b>`,
            icon: 'nc-icon nc-app',
            horizontalAlign:'right',
            verticalAlign: 'bottom',
            type: 'success'
          })
      }
  },
  computed: {
    idUser: function() {
      let id;
      if (this.$auth && this.$auth.isAuthenticated && !this.$auth.loading) {
        id = this.$auth.user["https://hasura.io/jwt/claims"][
          "x-hasura-user-id"
        ];
      } else {
        id = null;
      }
      window.console.log(id);
      return id;
    },
    validacionNombre() {
      return this.clienteUpdate.nombre && this.clienteUpdate.nombre.length > 2 ? true : false;
    },
    validacionApellidoPaterno() {
      return this.clienteUpdate.apellido_paterno && this.clienteUpdate.apellido_paterno.length > 2 ? true : false;
    },
     validacionApellidoMaterno() {
      return this.clienteUpdate.apellido_materno && this.clienteUpdate.apellido_materno.length > 2 ? true : false;
    },
    validacionDireccion() {
      return this.clienteUpdate.direccion && this.clienteUpdate.direccion.length > 2 ? true : false;
    },
    validacionCiudad() {
      return this.clienteUpdate.ciudad && this.clienteUpdate.ciudad.length > 2 ? true : false;
    },
    todasValidaciones(){
      return this.validacionNombre && this.validacionApellidoPaterno && this.validacionApellidoMaterno && this.validacionDireccion && this.validacionCiudad && this.validacionCelular;
    },
    validacionCelular(){
      return this.clienteUpdate.telefono_celular && this.clienteUpdate.telefono_celular.length > 2 ? true : false;
    }
  },

  apollo: {
    cliente: {
      query: GET_CLIENTE,
      variables() {
        return {
          id_user: this.idUser
        };
      },
      update: data => data.cliente[0]
    }
  }
};
</script>
<style></style>
