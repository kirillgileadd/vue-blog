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
  <div style="min-height: 100vh">
    <div>
      <blog-list
          v-if="!postsLoading"
          @removePost="removePost"
          :posts="posts"
          :postLoading="postLoading"
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

<script lang="ts">
import BlogHeader from "@/components/BlogHeader.vue";
import BlogItem from "@/components/BlogItem.vue";
import BlogList from "@/components/BlogList.vue";
import BlogForm from "@/components/BlogForm.vue";
import {useFetchPosts} from "@/composed/useFetchPosts";
import StyledLoader from "@/components/UI/StyledLoader.vue";
import {useUpdatePost} from "@/composed/useUpdatePost";
import useDebouncedRef from "@/composed/useDebounce";
import {defineComponent} from "vue";
import {IPost} from "@/models";

export default defineComponent({
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
    const searchValue = useDebouncedRef('', 400, false)
    const {posts, totalPages, postsLoading, selectionSort, loadMorePosts } = useFetchPosts(searchValue);
    const { createPost, deletePost, postLoading } = useUpdatePost(posts);

    return {
      loadMorePosts,
      createPost,
      deletePost,
      selectionSort,
      postLoading,
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
    addPost(post: IPost) {
      this.createPost(post)
      this.modalVisible = false
    },
    removePost(post: IPost) {
      this.deletePost(post)
    }
  },
})
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