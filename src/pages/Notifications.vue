<template> 


<div class="container" id="contenedor">
<br><br>
        

        <!-- Portfolio Item Row -->
        <div class="row">

            <div class="col-md-8">
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                    </ol>
                    


<b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
     

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://www.municipalidadchillan.cl/mercadochillan/img/locales/local25-1.jpg"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://www.municipalidadchillan.cl/mercadochillan/img/locales/local25-2.jpg"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://www.municipalidadchillan.cl/mercadochillan/img/locales/local25-3.jpg"></b-carousel-slide>

      
    </b-carousel>

            

                    <!-- Controls -->
                    <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>
            </div>

            <div class="col-md-4">
                <h3>Descripción</h3>
                <p>Rotisería y Carnicería.</p>
                <h3>Productos</h3>
                <ul>
                    <p> - Carnes Cerdo</p>
                    <p> - Carnes Pollo</p>
                    <p> - Longanizas</p>
                    <p> - Marca: Cecinas Benjamín de Chillán</p>
                </ul>
                <h3>Contacto</h3>
                <p>
                    NOMBRE : Mariana Osorio Sandoval
                    <br>TELEFONO : 42-2262299 - 986576227
                    <br>CORREO : marina_72@hotmail.com
                </p>
                
            </div>

        </div>
        <!-- /.row -->

        <!-- Sector Ubicación -->
        <br>
        <div class="row">
        <center><h1>Ubicación del Local</h1></center>
        <br>

        <div>
  <b-img src="https://www.municipalidadchillan.cl/mercadochillan/img/ubicaciones/ubicacion25.jpg" fluid alt="Responsive image"></b-img>
</div>
            <!--<img class="img-responsive sombra" src="https://www.municipalidadchillan.cl/mercadochillan/img/ubicaciones/ubicacion25.jpg">-->

        </div>
        <!-- / Fin Sector Ubicación-->

       



</div>

</template>
<script>

export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
<style lang="scss"></style>
