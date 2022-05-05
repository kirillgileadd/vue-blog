import axios from "axios";
import {IPost} from "@/models";
import PostsService from "@/api/PostsService";

export interface PostModuleState {
    posts: IPost[];
    postsLoading: boolean;
    selectionSort: string;
    page: number;
    limit: number;
    totalPages: number;
}

export const postModule = {
    state: (): PostModuleState => ({
        posts: [],
        postsLoading: false,
        selectionSort: '',
        page: 1,
        limit: 10,
        totalPages: 0,
    }),
    mutations: {
        setPosts(state: any, posts: any) {
            state.posts = posts
        },
        setLoading(state: any, loading: any) {
            state.postsLoading = loading
        },
        setSelectionSort(state: any, sort: any) {
            state.selectionSort = sort
        },
        setPage(state: any, page: any) {
            state.page = page
        },
        setTotalPages(state: any, pages: any) {
            state.totalPages = pages
        },
    },
    actions: {
        async fetchPosts({state, commit}: any) {
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
                commit('setTotalPages', Math.ceil(Number(response.headers['x-total-count']) / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                console.log(e);
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}: any) {
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
                commit('setTotalPages', Math.ceil(Number(response.headers['x-total-count']) / state.limit))
                commit( 'setPosts', [...state.posts, ...response.data])
            } catch (e) {
                console.log(e);
            }
        },
        async createPost  ({state, commit}: any,post: IPost)  {
            try {
                const response = await PostsService.postPost(post)
                commit('setPosts', [response.data, ...state.posts])
            } catch (e) {
                console.log(e);
            }
        },
        async deletePost ({state, commit}: any, post: IPost)  {
            try {
                const response = await PostsService.deletePost(post)
                if(response.status === 200) {
                    commit('setPosts', state.posts.filter((item: any) => item?.id !== post.id))
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    namespaced: true
}