import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        changeSortValue(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectionSort]?.localeCompare(post2[state.selectionSort])
            })
        },
        filteredAndSortedPosts(state, getters) {
            return getters.changeSortValue.filter(post => post.title.toLowerCase().includes(state.searchValue.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, loading) {
            state.postsLoading = loading
        },
        setSelectionSort(state, sort) {
            state.selectionSort = sort
        },
        setSearchValue(state, search) {
            state.searchValue = search
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, pages) {
            state.totalPages = pages
        },
    },
    actions: {
        async fetchPosts(prop) {
            console.log(prop);
            const {state, commit} = prop
            try {
                commit('setLoading', true)
                commit('setPage', 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page,
                        q: state.searchValue,
                        _sort: state.selectionSort,
                        _order: 'asc'
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                console.log(e);
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page += 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page,
                        q: state.searchValue,
                        _sort: state.selectionSort,
                        _order: 'asc'
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit( 'setPosts', [...state.posts, ...response.data])
            } catch (e) {
                console.log(e);
            }
        }
    },
    namespaced: true
}