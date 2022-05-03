<template>
  <div class="app">
    <blog-header/>
    <div class="app-container container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">

  import {defineComponent} from "vue";
  import BlogHeader from "@/components/BlogHeader.vue";

  export default defineComponent({
    components: {BlogHeader}
  })
</script>

<style>

#app {
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

.container {
  max-width: 1130px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

.app-container {
  padding: 15px;
  padding-top: 75px;
  overflow-x: hidden;
  min-height: 100vh;
}

</style>