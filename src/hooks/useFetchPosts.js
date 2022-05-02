import {onMounted, ref, watch} from "vue";
import axios from "axios";

export function useFetchPosts() {
    const posts = ref([])
    const postsLoading = ref(false)
    const totalPages = ref(0)
    const selectionSort = ref('')
    const searchValue = ref('')
    const page = ref(1)
    const limit = (10)
    const fetching = async () => {
        try {
            postsLoading.value = true
            page.value = 1
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit.value,
                    _page: page.value,
                    q: searchValue.value,
                    _sort: selectionSort.value,
                    _order: 'asc'
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
            posts.value = response.data
        } catch (e) {
            console.log(e);
        } finally {
            postsLoading.value = false
        }
    }
    const loadMorePosts = async () => {
        try {
            page.value += 1
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit.value,
                    _page: page.value,
                    q: searchValue.value,
                    _sort: selectionSort.value,
                    _order: 'asc'
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
            posts.value = [...posts.value, ...response.data]
        } catch (e) {
            console.log(e);
        }
    }
    // const createPost = async (post) => {
    //     try {
    //         const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {...post})
    //         posts.value = [response.data, ...posts.value]
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // const deletePost = async (post) => {
    //     try {
    //         const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
    //         if(response.status === 200) {
    //             posts.value = posts.value.filter(item => item?.id !== post.id)
    //         }
    //     } catch (e) {
    //
    //     }
    // }

    onMounted(fetching)
    watch([selectionSort, searchValue], fetching)

    return {
        posts,
        postsLoading,
        totalPages,
        limit,
        page,
        selectionSort,
        searchValue,
        loadMorePosts
    }
}