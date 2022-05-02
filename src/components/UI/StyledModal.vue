<template>
  <div v-if="show" class="modal" @click="hideModal">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/components/mixins/toggleMixin";

export default {
  name: "styled-modal",
  mixins: [toggleMixin]
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