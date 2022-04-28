<template>
  <div class="pagination">
    <div
        class="page"
        :class="{'active': pageNumber === page}"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="$emit('update:page', pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: "styled-pagination",
  props: {
    page: Number,
    totalPages: Number
  }
}
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 15px;
  justify-content: center;
  display: flex;
}

.page {
  border-radius: 30px;
  border: 1px solid teal;
  text-align: center;
  margin-left: 5px;
  width: 35px;
  height: 35px;
  padding: 5px;
  font-size: 15px;
  cursor: pointer;

  &.active {
    background-color: teal;
    color: #ffffff;
  }
}
</style>