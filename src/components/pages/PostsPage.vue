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
          :model-value="searchValue"
          @update:model-value="setSearchValue"
      />
      <styled-select
          :model-value="selectionSort"
          @update:model-value="setSelectionSort"
          :options="selectOptions"
      />
    </div>
  </div>
  <div style="min-height: calc(100vh - 260px)">
    <blog-list
        v-if="!postsLoading"
        @removePost="removePost"
        :posts="posts"
    />
    <div v-intersection="loadMorePosts" ref="observer" class="observer">
      <styled-loader/>
    </div>
  </div>
  <styled-modal
      v-model:show="modalVisible"
  >
    <blog-form @cratePost="createPost"/>
  </styled-modal>
</template>

<script>
import BlogHeader from "@/components/BlogHeader";
import BlogItem from "@/components/BlogItem";
import BlogList from "@/components/BlogList";
import BlogForm from "@/components/BlogForm";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'


export default {
  name: 'posts-page',
  components: {BlogForm, BlogList, BlogItem, BlogHeader,},
  data() {
    return {
      modalVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setSearchValue: 'post/setSearchValue',
      setSelectionSort: 'post/setSelectionSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts'
    }),
    createPost(post) {
      this.posts.unshift(post)
      this.modalVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    },
    showModal() {
      this.modalVisible = true
    },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      postsLoading: state => state.post.postsLoading,
      selectionSort: state => state.post.selectionSort,
      searchValue: state => state.post.searchValue,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      selectOptions: state => state.post.selectOptions
    }),
  },
  watch: {
    selectionSort() {
      this.fetchPosts()
    },
    searchValue() {
      this.fetchPosts()
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