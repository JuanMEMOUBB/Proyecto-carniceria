<!--
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Light Bootstrap Table Heading</h4>
              <p class="card-category">Created using Roboto Font Family</p>
            </template>
            <div class="typo-line">
              <h1><p class="category">Header 1</p>Light Bootstrap Table Heading </h1>
            </div>

            <div class="typo-line">
              <h2><p class="category">Header 2</p>Light Bootstrap Table Heading</h2>
            </div>
            <div class="typo-line">
              <h3><p class="category">Header 3</p>Light Bootstrap Table Heading</h3>
            </div>
            <div class="typo-line">
              <h4><p class="category">Header 4</p>Light Bootstrap Table Heading</h4>
            </div>
            <div class="typo-line">
              <h5><p class="category">Header 5</p>Light Bootstrap Table Heading</h5>
            </div>
            <div class="typo-line">
              <h6><p class="category">Header 6</p>Light Bootstrap Table Heading</h6>
            </div>
            <div class="typo-line">
              <p><span class="category">Paragraph</span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.
              </p>
            </div>
            <div class="typo-line">
              <p class="category">Quote</p>
              <blockquote>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.
                </p>
                <small>
                  Steve Jobs, CEO Apple
                </small>
              </blockquote>
            </div>

            <div class="typo-line">
              <p class="category">Muted Text</p>
              <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
              </p>
            </div>
            <div class="typo-line">
              <!--
               there are also "text-info", "text-success", "text-warning", "text-danger" clases for the text
               -->

               <!--
              <p class="category">Coloured Text</p>
              <p class="text-primary">
                Text Primary - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the internet.
              </p>
              <p class="text-info">
                Text Info - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the internet.
              </p>
              <p class="text-success">
                Text Success - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the internet.
              </p>
              <p class="text-warning">
                Text Warning - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the internet.
              </p>
              <p class="text-danger">
                Text Danger - Light Bootstrap Table Heading and complex bootstrap dashboard you've ever seen on the internet.
              </p>
            </div>

            <div class="typo-line">
              <h2><p class="category">Small Tag</p>Header with small subtitle <br>
                <small>".small" is a tag for the headers</small>
              </h2>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    }
  }

</script>
<style>

</style>
-->

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
const tableColumns = ["Id", "Nombre", "precio", "descripcion"];
const tableData = [
  {
    id: 1,
    nombre: "Chuleta",
    precio: "$2380",
    descripcion: "Carne de Cerdo"
  },
  {
    id: 2,
    nombre: "Longaniza",
    precio: "$2480",
    descripcion: "Embutido de carne de cerdo"
  },
  {
    id: 3,
    nombre: "Pollo",
    precio: "1590",
    descripcion: "Carne de pollo"
  },
  {
    id: 4,
    nombre: "Queso",
    precio: "$1290",
    descripcion: "Producto derivado de la leche"
  },
  {
    id: 5,
    nombre: "Costilla de cerdo",
    precio: "1780",
    descripcion: "Carne de cerdo"
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