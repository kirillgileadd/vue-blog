
//
// setLoading(state: any, loading: any) {
//     state.postsLoading = loading
// },
// setSelectionSort(state: any, sort: any) {
//     state.selectionSort = sort
// },
// setPage(state: any, page: any) {
//     state.page = page
// },
// setTotalPages(state: any, pages: any) {
//     state.totalPages = pages
// },

export enum PostMutationType {
    setPosts = "SET_POSTS",
    setSelectionSort = "SET_SELECTION_SORT",
    setPage = "SET_PAGE",
    setTotalPages = "SET_TOTAL_PAGES"
}
