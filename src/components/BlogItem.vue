<template>
  <div class="blog-item">
    <img class="blog-item__img" :src="img" alt="">
    <div class="blog-item__content">
      <div class="blog-item__info">
        <h4 class="blog-item__title">{{title}}</h4>
        <p class="blog-item__text"> {{body}}</p>
      </div>
      <div class="blog-item__btns">
        <styled-button style="margin-bottom: 10px" @click="$router.push(`/${id}`)">
          Open
        </styled-button>
        <styled-button @click="$emit('removePost', id)">
          Delete
        </styled-button>
      </div>
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
      default: 'https://source.unsplash.com/random/400*400'
    },
    id: Number,
    title: String,
    body: String,
  }
}
</script>

<style scoped lang="scss">
  .blog-item {
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
    border-radius: 20px;
    overflow: hidden;
    &__content {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &__img {
      height: 280px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
    &__info {
      margin-right: 15px;
    }
    &__btns {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__title {
      text-overflow: ellipsis; /* Добавляем многоточие */
    }
    &__text {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      line-height: 1.3em;
      height: 3.9em;
    }
  }
</style>