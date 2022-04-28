<template>
  <div v-if="show" class="modal" @click="$emit('update:show', false)">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "styled-modal",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .modal {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    &__content {
      margin: auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 20px;
    }
  }
</style>