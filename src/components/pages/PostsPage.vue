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
          v-model="selectionSort"
          :options="selectOptions"
      />
    </div>
  </div>
  <div style="min-height: calc(100vh - 260px)">
    <blog-list
        v-if="!postsLoading"
        @removePost="removePost"
        :posts="filteredAndSortedPosts"
    />
    <div v-intersection="loadMorePosts" v-show="filteredAndSortedPosts.length > 0" ref="observer" class="observer">
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
import axios from "axios";


export default {
  name: 'posts-page',
  components: {BlogForm, BlogList, BlogItem, BlogHeader,},
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
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.fetchPosts()
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     console.log('done');
    //     this.loadMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)
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
  watch: {}
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