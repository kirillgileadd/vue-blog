<template>
  <input :value="modelValue" @input="onInput" class="input" type="text" />
</template>

<script>
export default {
  name: "styled-input",
  props: {
    modelValue: [Number, String]
  },
  methods: {
    onInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
 .input {
   border: 1px solid lightgray;
   border-radius: 3px;
   padding: 15px;
   outline-color: teal;
 }
</style>s