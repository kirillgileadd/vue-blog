<template>
  <div v-if="posts.length > 0" class="blog-list">
    <transition-group class="post-list" name="post-list" tag="p">
    <blog-item
        class="blog-item"
        v-for="post in posts"
        :img="post.img"
        :key="post.id"
        :title="post.title"
        :body="post.body"
        :id="post.id"
        @removePost="$emit('removePost', post)"
    />
    </transition-group>
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
.blog-item {
  transition: all 0.4s;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px
}

.post-list-enter, .post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
/*.post-list-leave-active {*/
/*  position: absolute;*/
/*}*/
</style>