import axios from "axios";
import {ref} from "vue";

export function useUpdatePost(posts) {
    const postLoading = ref(false)

    const createPost = async (post) => {
        try {
            postLoading.value = true
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {...post})
            posts.value = [response.data, ...posts.value]
        } catch (e) {
            console.log(e);
        } finally {
            postLoading.value = false
        }
    }
    const deletePost = async (post) => {
        try {
            postLoading.value = true
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
            if(response.status === 200) {
                posts.value = posts.value.filter(item => item?.id !== post.id)
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            postLoading.value = false
        }
    }

    return {
        createPost,
        deletePost
    }
}