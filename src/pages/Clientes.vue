<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" >
          <card 
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Tabla Clientes con Hover</h4>
              <p class="card-category">Los clientes hasta el momento</p>
            </template>
            <l-table v-if="cliente.length"
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="table1.data"
            >
            </l-table>
          </card>
        </div>
        <button @click="download">Download PDF</button>
        <div class="col-12" ref="content">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Tabla Clientes con fondo plano</h4>
              <p class="card-category">Los clientes hasta el momento</p>
            </template>
            <div class="table-responsive">
              <l-table
                class="table-hover"
                :columns="table2.columns"
                :data="table2.data"
              >
              </l-table>
            </div>
          </card>
        </div>

        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Tabla Clientes pequeña</h4>
              <p class="card-category">Los clientes hasta el momento</p>
            </template>
            <l-table
              class="table-hover table-striped table-sm"
              :columns="table1.columns"
              :data="table1.data"
            >
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
const tableColumns = ["Id", "Nombre", "Direccion", "Email", "Ciudad","6","7","8"];

import gql from "graphql-tag";
const GET_CLIENTES = gql`
  query getClientes {
    cliente {
    id
    email
    nombre
    apellido_paterno
    apellido_materno
    direccion
    telefono_celular
    telefono_fijo
  }
  }
`;

export default {
  components: {
    LTable,
    Card
  },
  data() {
    return {
      
      cliente: [],
      table1: {
        columns: [...tableColumns],
        data: []
      },
      table2: {
        columns: [...tableColumns],
        data: []
      }
      
    };
  },

  watch: {
    cliente(value){
      this.table1.data = value;
      console.log(value);
    }

  },

  apollo: {
    cliente: {
      query: GET_CLIENTES
    }
  },
  
  methods: {
    download() {
      const doc = new jsPDF('portrait', 'pt', 'a4');
      const contentHtml = this.$refs.content.innerHTML;
      doc.html(contentHtml, {
        callback: function(doc) {
          doc.save("archivo.pdf");
        },
        x: 10,
        y: 10
      });
    }
  }
};
</script>
<style></style>
