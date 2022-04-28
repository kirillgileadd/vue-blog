<template>
  <div class="blog-item">
    <img class="blog-item__img" :src="img" alt="">
    <div class="blog-item__content">
      <div>
        <h4 class="blog-item__title">{{title}}</h4>
        <p>{{body}}</p>
      </div>
      <styled-button @click="$emit('removePost', id)">
        Delete
      </styled-button>
    </div>
  </div>
</template>

<script>
import StyledButton from "@/components/UI/StyledButton";
export default {
  name: "blog-item",
  components: {StyledButton},
  props: {
    img: {
      type: String,
      default: 'https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg'
    },
    id: Number,
    title: String,
    body: String,
  }
}
</script>

<style scoped lang="scss">
  .blog-item {
    border: 1px solid lightgray;
    border-radius: 20px;
    overflow: hidden;
    &__content {
      height: 30%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &__img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 70%;
    }
  }
</style>