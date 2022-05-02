import axios from "axios";

export function useUpdatePost(posts, postsLoading) {

    const createPost = async (post) => {
        try {
            postsLoading.value = true
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {...post})
            posts.value = [response.data, ...posts.value]
        } catch (e) {
            console.log(e);
        } finally {
            postsLoading.value = false
        }
    }
    const deletePost = async (post) => {
        try {
            postsLoading.value = true
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
            if(response.status === 200) {
                posts.value = posts.value.filter(item => item?.id !== post.id)
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            postsLoading.value = false
        }
    }

    return {
        createPost,
        deletePost
    }
}