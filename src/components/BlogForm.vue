<template>
  <div class="form__wrapper" @submit.prevent>
    <h3>Add new post</h3>
    <form class="form" action="">
      <styled-input placeholder="title..." v-model="post.title"/>
      <styled-input placeholder="body..." v-model="post.body"/>
      <styled-button @click="addPost">Add post</styled-button>
    </form>
  </div>
</template>

<script>
import StyledInput from "@/components/UI/StyledInput";
import StyledButton from "@/components/UI/StyledButton";

export default {
  name: "blog-form",
  components: {StyledInput, StyledButton},
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    addPost() {
      this.post.id = Date.now()
      this.$emit('cratePost', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 400px;
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 15px;
  }
  &__wrapper {
    h3 {
      margin-bottom: 20px;
    }
  }
}
</style>