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
                  <base-input
                    type="text"
                    label="Nombre"
                    placeholder="Nombre"
                    v-model="clienteUpdate.nombre"
                  >
                  </base-input>
                </div>
                <div class="col-md-3">
                  <base-input
                    type="text"
                    label="Apellido Paterno"
                    placeholder="Apellido Paterno"
                    v-model="clienteUpdate.apellido_paterno"
                  >
                  </base-input>
                </div>
                <div class="col-md-3">
                  <base-input
                    type="text"
                    label="Apellido Materno"
                    placeholder="Apellido Materno"
                    v-model="clienteUpdate.apellido_materno"
                  >
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <base-input
                    type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="clienteUpdate.email"
                    disabled=true
                  >
                  </base-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <base-input
                    type="text"
                    label="Dirección"
                    placeholder="Dirección"
                    v-model="clienteUpdate.direccion"
                  >
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <base-input
                    type="text"
                    label="Teléfono fijo"
                    placeholder="Teléfono fijo"
                    v-model="clienteUpdate.telefono_fijo"
                  >
                  </base-input>
                </div>
                <div class="col-md-4">
                  <base-input
                    type="text"
                    label="Teléfono celular"
                    placeholder="Teléfono celular"
                    v-model="clienteUpdate.telefono_celular"
                  >
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
  cliente(where: {user: {id: {_eq: $id_user}}}) {
    apellido_materno
    apellido_paterno
    direccion
    email
    nombre
    telefono_celular
    telefono_fijo
  }
}
`;
const ADD_CLIENTE = gql`
mutation addCliente($nombre: String, $email: String, $apellido_paterno: String, $apellido_materno: String, $telefono_celular: String, $telefono_fijo: String, $direccion: String) {
  insert_cliente(objects: [{nombre: $nombre, email: $email, apellido_paterno: $apellido_paterno, apellido_materno: $apellido_materno, telefono_celular: $telefono_celular, telefono_fijo: $telefono_fijo, direccion: $direccion}], on_conflict: {constraint: cliente_email_key, update_columns: [nombre,direccion,apellido_paterno,apellido_materno]}) {
    returning {
      id
      nombre
      email
      direccion
      apellido_paterno
      apellido_materno
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
          apellido_materno:null,
          telefono_celular:null,
          telefono_fijo:null,
          direccion:null
      },
      cliente:null
    };
  },
  watch: {
    cliente: function (val) {
      if (val){
         this.clienteUpdate = val
      } 
      else if(this.$auth && this.$auth.isAuthenticated && !this.$auth.loading){
        this.clienteUpdate.email = this.$auth.user.email
      }
     
    },
  },
  methods: {
    updateProfile() {
      this.$apollo.mutate({
        mutation: ADD_CLIENTE,
        variables: {
          nombre:this.clienteUpdate.nombre,
          email:this.clienteUpdate.email,
          apellido_paterno:this.clienteUpdate.apellido_paterno,
          apellido_materno:this.clienteUpdate.apellido_materno,
          telefono_celular:this.clienteUpdate.telefono_celular,
          telefono_fijo:this.clienteUpdate.telefono_fijo,
          direccion:this.clienteUpdate.direccion
        },
        refetchQueries: ["getClientes"]
      });
      alert(
        "Tu información: " + JSON.stringify(this.cliente) + " fue actualizada"
      );
    },
    
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
      update:data => data.cliente[0]
    }
  }
};
</script>
<style></style>
