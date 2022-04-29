<template>
  <div id="loading"></div>
</template>

<script>
export default {
  name: "styled-loader"
}
</script>

<style scoped>
#loading {
  display: block;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 3px solid teal;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

</style>