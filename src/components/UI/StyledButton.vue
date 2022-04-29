<template>
  <button class="button" :class="[variant]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "styled-button",
  props: {
    variant: {
      type: String,
      validators: value =>
          ['primary', 'secondary'].includes(value),
    },
  }
}
</script>

<style scoped lang="scss">
  .button {
    border: 1px solid teal;
    background-color: transparent;
    padding: 10px 15px;
    color: teal;
    border-radius: 3px;
    cursor: pointer;
    &.primary {
      color: #fff;
      background-color: teal;
    }
    &.secondary {
      background-color: #ffffff;
    }
  }
</style>