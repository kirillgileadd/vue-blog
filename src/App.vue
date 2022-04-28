<template>
  <div class="app-container container">
    <blog-header
        v-model:show="modalVisible"
    />
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
            v-model="selectionSort"
            :options="selectOptions"
        />
      </div>
    </div>
    <blog-list
        v-if="!postsLoading"
        @removePost="removePost"
        :posts="filteredAndSortedPosts"
    />
    <styled-pagination
        v-model:page="page"
        :total-pages="totalPages"
    />
    <styled-modal
        v-model:show="modalVisible"
    >
      <blog-form @cratePost="createPost"/>
    </styled-modal>
  </div>
</template>

<script>
import BlogHeader from "@/components/BlogHeader";
import BlogItem from "@/components/BlogItem";
import BlogList from "@/components/BlogList";
import BlogForm from "@/components/BlogForm";
import axios from "axios";


export default {
  components: {BlogForm, BlogList, BlogItem, BlogHeader},
  data() {
    return {
      posts: [],
      modalVisible: false,
      postsLoading: false,
      selectionSort: '',
      searchValue: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      selectOptions: [
        {title: 'Title', value: 'title'},
        {title: 'Description', value: 'body'},
      ]
    }
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.postsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        console.log(e);
      } finally {
        this.postsLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    changeSortValue() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectionSort]?.localeCompare(post2[this.selectionSort])
      })
    },
    filteredAndSortedPosts() {
      return this.changeSortValue.filter(post => post.title.toLowerCase().includes(this.searchValue.toLowerCase()))
    }
  },
  watch: {
    page() {
      this.fetchPosts()
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

body {
  overflow-x: hidden;
}

.container {
  max-width: 1130px;
  padding: 0 15px;
  margin: 0 auto;
}

.app-container {
  padding: 15px;
  min-height: 100vh;
}


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