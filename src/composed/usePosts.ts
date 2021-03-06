import {onMounted, Ref, ref, watch} from "vue";
import {IPost} from "@/models";
import PostsService from "@/api/PostsService";

export function usePosts(searchValue: Ref<string>) {
    const posts = ref<IPost[]>([])
    const postsLoading = ref<boolean>(false)
    const totalPages = ref<number>(0)
    const selectionSort = ref<string>('')
    const page = ref<number>(1)
    const limit = ref<number>(10)
    const fetching = async () => {
        try {
            postsLoading.value = true
            page.value = 1
            const response = await PostsService.getPosts(limit.value, page.value, searchValue.value, selectionSort.value)
            totalPages.value = Math.ceil(Number(response.headers['x-total-count']) / limit.value)
            posts.value = response.data.map(post => ({
                ...post,
                postLoading: false,
                isFavourite: false,
            }))
        } catch (e) {
            console.log(e);
        } finally {
            postsLoading.value = false
        }
    }
    const loadMorePosts = async () => {
        try {
            page.value += 1
            const response = await PostsService.getPosts(limit.value, page.value, searchValue.value, selectionSort.value)
            totalPages.value = Math.ceil(Number(response.headers['x-total-count']) / limit.value)
            posts.value = [...posts.value, ...response.data]
        } catch (e) {
            console.log(e);
        }
    }
    const createPost  = async (post: IPost) => {
        try {
            const response = await PostsService.postPost(post)
            posts.value = [response.data, ...posts.value]
        } catch (e) {
            console.log(e);
        }
    }
    const deletePost = async (post: IPost) => {
        try {
            const response = await PostsService.deletePost(post)
            if(response.status === 200) {
                posts.value = posts.value.filter(item => item?.id !== post.id)
            }
        } catch (e) {
            console.log(e);
        }
    }

    onMounted(fetching)
    watch([selectionSort, searchValue], fetching)

    return {
        posts,
        postsLoading,
        totalPages,
        limit,
        page,
        selectionSort,
        loadMorePosts,
        deletePost,
        createPost,
    }
}