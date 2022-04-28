<template>
  <header class="header">
    <h3>Vue Blog</h3>
  </header>
</template>

<script>
import StyledButton from "@/components/UI/StyledButton";
import StyledInput from "@/components/UI/StyledInput";

export default {
  name: "blog-header",
  components: {StyledInput, StyledButton},
}
</script>

<style scoped>
.header {
  display: flex;
  padding: 15px 0;
  justify-content: space-between;
  align-items: center;
}
</style>