<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <h3 class="header__title" @click="$router.push('/')">Vue Blog</h3>
        <div class="header__btns">
          <styled-button @click="$router.push('/about')" variant="secondary">About</styled-button>
          <styled-button @click="$router.push('/composition')" variant="secondary">Composition API</styled-button>
        </div>
      </div>
    </div>
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

<style scoped lang="scss">
.header {
  box-shadow: 0 3px 16px 0 rgba(34, 60, 80, 0.4);
  background-color: teal;
  display: flex;
  position: fixed;
  width: 100%;
  padding: 15px 0;
  height: 65px;
  justify-content: space-between;
  align-items: center;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    color: #fff;
    cursor: pointer;
  }
}
</style>