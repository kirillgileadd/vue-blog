<template>
  <div class="blog-btns">
    <styled-button
        variant="primary"
        @click="showModal"
    >New Post
    </styled-button>
    <div class="blog-filter">
      <styled-input
          placeholder="Search..."
          class="blog-filter__input"
          v-model="searchValue"
      />
      <styled-select
          :model-value="selectionSort"
          v-model="selectionSort"
          :options="selectOptions"
      />
    </div>
  </div>
  <div style="min-height: calc(100vh - 260px)">
    <div>
      <blog-list
          v-if="!postsLoading"
          @removePost="removePost"
          :posts="posts"
      />
        <styled-loader  v-if="postsLoading" />
    </div>
    <div v-if="posts.length > 0" v-intersection="loadMorePosts" ref="observer" class="observer"></div>
  </div>
  <styled-modal
      v-model:show="modalVisible"
  >
    <blog-form @cratePost="addPost"/>
  </styled-modal>
</template>

<script>
import BlogHeader from "@/components/BlogHeader";
import BlogItem from "@/components/BlogItem";
import BlogList from "@/components/BlogList";
import BlogForm from "@/components/BlogForm";
import {useFetchPosts} from "@/hooks/useFetchPosts";
import StyledLoader from "@/components/UI/StyledLoader";
import {useUpdatePost} from "@/hooks/useUpdatePost";


export default {
  name: 'posts-page-capi',
  components: {StyledLoader, BlogForm, BlogList, BlogItem, BlogHeader,},
  data() {
    return {
      modalVisible: false,
      selectOptions: [
        {title: 'Title', value: 'title'},
        {title: 'Description', value: 'body'},
      ]
    }
  },
  setup(props) {
    const {posts, totalPages, postsLoading, selectionSort, searchValue, loadMorePosts } = useFetchPosts();
    const { createPost, deletePost } = useUpdatePost(posts, postsLoading);
    return {
      loadMorePosts,
      createPost,
      deletePost,
      selectionSort,
      searchValue,
      posts,
      totalPages,
      postsLoading,
    }
  },
  methods: {
    showModal() {
      this.modalVisible = true
    },
    addPost(post) {
      this.createPost(post)
      this.modalVisible = false
    },
    removePost(id) {
      this.deletePost(id)
    }
  },
}
</script>


<style lang="scss">


.blog-btns {
  button {
    margin-bottom: 15px;
  }
}

.blog-filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  &__input {
    width: 100%;
    margin-right: 10px;
  }
}


</style>