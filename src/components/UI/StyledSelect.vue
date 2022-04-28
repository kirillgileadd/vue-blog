<template>
  <select class="select" :value="modelValue" @change="onChangeSelect">
    <option disabled value="">Choose</option>
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
    >
      {{option.title}}
    </option>
  </select>
</template>

<script>
export default {
  name: "styled-select",
  props: {
    modelValue: String,
    options: Array
  },
  methods: {
    onChangeSelect (event) {
      console.log(this.options);
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.select {
  border: 1px solid lightgray;
  outline-color: teal;
  color: gray;
  padding: 10px;
  border-radius: 3px;
}
</style>