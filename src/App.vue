<template>
  <div class="app-container container">
    <blog-header v-model:show="modalVisible"/>
    <styled-select v-model="selectionSort" :options="selectOptions"/>
    <blog-list v-if="!postsLoading" @removePost="removePost" :posts="changeSortValue"/>
    <styled-modal v-model:show="modalVisible">
      <blog-form @cratePost="createPost"/>
    </styled-modal>
    <div class="pagination">
      <div
          class="page"
          :class="{'active': pageNumber === page}"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="changeCurrentPage(pageNumber)"
      >
        {{pageNumber}}
      </div>
    </div>
  </div>
</template>

<script>
import BlogHeader from "@/components/BlogHeader";
import BlogItem from "@/components/BlogItem";
import BlogList from "@/components/BlogList";
import BlogForm from "@/components/BlogForm";
import StyledModal from "@/components/UI/StyledModal";
import axios from "axios";
import StyledSelect from "@/components/UI/StyledSelect";

export default {
  components: {StyledSelect, BlogForm, BlogList, BlogItem, BlogHeader, StyledModal},
  data() {
    return {
      posts: [],
      modalVisible: false,
      postsLoading: false,
      selectionSort: '',
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
      this.posts.push(post)
      this.modalVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    },
    changeCurrentPage (number) {
      this.page = number
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
  padding: 15px 0;
  min-height: 100vh;
}

.pagination {
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