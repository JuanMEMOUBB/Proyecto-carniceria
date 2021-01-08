<template>
<div class="container">
  <div class="col-md-12">
    <div v-if="isProductLoading" class="text-center">
      <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize" class="d-inline-block" />
    </div>
    <div v-else class="card">
      <div class="row">
        <div class="col-12 col-md-4 offset-md-4">
          <div class="intrinsic">
            <img class="img-fluid intrinsic-item" :src="item.thumbnail_url" alt="">
          </div>
        </div>
      </div>

      <div class="caption-full">
        <h4 class="pull-right">$ {{ item.price }}</h4>
        <h4> {{ item.title }}</h4>
        <p> {{ item.description }} </p>
      </div>
      <div class="ratings">
        <span>{{ item.quantity }} left in stock</span>
        <p class="pull-right">
          <button @click="addItem" :disabled="item.quantity === 0" class="btn btn-success">
                            Add to cart
                        </button>
        </p>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>
</template>