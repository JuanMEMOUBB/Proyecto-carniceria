<template>
  <div>
    <auth/>
    <MainContent />
  </div>
</template>
<script>
import Auth from '../components/Login.vue'
export default {
    name: 'main',
    components:{
        Auth
    },
    data(){

    }

}
</script>