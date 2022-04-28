<template>
  <div v-if="posts.length > 0" class="blog-list">
    <blog-item
        v-for="post in posts"
        :img="post.img"
        :key="post.id"
        :title="post.title"
        :body="post.body"
        :id="post.id"
        @removePost="$emit('removePost', post)"
    />
  </div>
  <h3 v-else>There is no posts</h3>
</template>

<script>
import BlogItem from "@/components/BlogItem";

export default {
  components: {BlogItem},
  name: "blog-list",
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.blog-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px
}
</style>