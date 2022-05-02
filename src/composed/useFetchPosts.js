import {onMounted, ref, watch} from "vue";
import axios from "axios";

export function useFetchPosts(debounceValue) {
    const posts = ref([])
    const postsLoading = ref(false)
    const totalPages = ref(0)
    const selectionSort = ref('')
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
                    q: debounceValue.value.trim(),
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
                    q: debounceValue.value.trim(),
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

    onMounted(fetching)
    watch([selectionSort, debounceValue], fetching)

    return {
        posts,
        postsLoading,
        totalPages,
        limit,
        page,
        selectionSort,
        loadMorePosts
    }
}