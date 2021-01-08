<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="387"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image 
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://www.americaeconomia.com/sites/7.americaeconomia.com/files/styles/ae_main/public/field/image/2020-05-12t121539z_1_lynxmpeg4b0ya_rtroptp_4_salud-coronavirus-argentina-restoranes.jpg?itok=-228hI2v"
        
      ></b-carousel-slide>-->

      <b-carousel-slide img-src="https://www.americaeconomia.com/sites/7.americaeconomia.com/files/styles/ae_main/public/field/image/2020-05-12t121539z_1_lynxmpeg4b0ya_rtroptp_4_salud-coronavirus-argentina-restoranes.jpg?itok=-228hI2v">
        
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://i.ibb.co/jZYsj6G/3.png">
        
      </b-carousel-slide>

      <!-- Slides with image only
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

       Slides with img slot
       Note the classes .d-block and .img-fluid to prevent browser default image alignment
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

       Slide with blank fluid image to maintain slide aspect ratio
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
      -->
    </b-carousel>

    <!--<p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>-->
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