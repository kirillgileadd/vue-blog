import {Ref, ref} from "vue";
import {IPost} from "@/models";
import PostsService from "@/api/PostsService";

export function useUpdatePost(posts: IPost[]) {
    const postLoading = ref<boolean>(false)

    const createPost = async (post: IPost) => {
        try {
            postLoading.value = true
            const response = await PostsService.postPost(post)
            posts = [response.data, ...posts]
        } catch (e) {
            console.log(e);
        } finally {
            postLoading.value = false
        }
    }
    const deletePost = async (post: IPost) => {
        try {
            postLoading.value = true
            const response = await PostsService.deletePost(post)
            if(response.status === 200) {
                posts = posts.filter(item => item?.id !== post.id)
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
        deletePost,
        postLoading
    }
}