<template>
  <header class="header">
    <h3>Vue Blog</h3>
    <styled-button
        variant="primary"
        @click="$emit('update:show', true)"
    >New Post</styled-button>
  </header>
</template>

<script>
import StyledButton from "@/components/UI/StyledButton";
export default {
  name: "blog-header",
  components: {StyledButton},
  props: {
    show: Boolean
  }
}
</script>

<style scoped>
.header {
  display: flex;
  padding: 15px 0;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
}
</style>