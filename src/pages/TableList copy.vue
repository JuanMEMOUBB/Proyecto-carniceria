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
            <l-table 
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
const tableColumns = ["Id", "Nombre", "Direccion", "Pais", "Ciudad"];
const tableData = [
  {
    id: 1,
    nombre: "Dakota Rice",
    direccion: "Alameda 579",
    pais: "Chile",
    ciudad: "Santiago"
  },
  {
    id: 2,
    nombre: "Minerva Hooper",
    direccion: "Las Lilas 123",
    pais: "Chile",
    ciudad: "Talca"
  },
  {
    id: 3,
    nombre: "Sage Rodriguez",
    direccion: "Arturo Prat 58",
    pais: "Chile",
    ciudad: "Valparaíso"
  },
  {
    id: 4,
    nombre: "Philip Chaney",
    direccion: "Carrera 1892",
    pais: "Chile",
    ciudad: "Rancagua"
  },
  {
    id: 5,
    nombre: "Doris Greene",
    direccion: "Lautaro 445",
    pais: "Chile",
    ciudad: "San Carlos"
  }
];
export default {
  components: {
    LTable,
    Card
  },
  data() {
    return {
      table1: {
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
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
