<template>
  <div class="app-container container">
    <blog-header v-model:show="modalVisible"/>
    <blog-list @removePost="removePost" :posts="posts"/>
    <styled-modal v-model:show="modalVisible">
      <blog-form @cratePost="createPost"/>
    </styled-modal>
  </div>
</template>

<script>
import BlogHeader from "@/components/BlogHeader";
import BlogItem from "@/components/BlogItem";
import BlogList from "@/components/BlogList";
import BlogForm from "@/components/BlogForm";
import StyledModal from "@/components/UI/StyledModal";

export default {
  components: {BlogForm, BlogList, BlogItem, BlogHeader, StyledModal},
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'javascript',
          body: 'about javascript1',
          img: 'https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg'
        },
        {
          id: 2,
          title: 'javascript',
          body: 'about javascript2',
          img: 'https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg'
        },
        {
          id: 3,
          title: 'javascript',
          body: 'about javascript3',
          img: 'https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg'
        },
        {id: 4, title: 'javascript', body: 'about javascript4'}
      ],
      modalVisible: false
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.modalVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1130px;
  padding: 0 15px;
  margin: 0 auto;
}

.app-container {
  padding: 15px 0;
  min-height: 100vh;
}

</style>