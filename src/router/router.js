import PostsPage from "@/components/pages/PostsPage";
import {createRouter, createWebHistory} from "vue-router";
import About from "@/components/pages/About";
import PostDetail from "@/components/pages/PostDetail";
import PostsPageCompositionAPI from "@/components/pages/PostsPageCompositionAPI";

const routes = [
    {
        path: '/',
        component: PostsPage
    },
    {
        path: '/composition',
        component: PostsPageCompositionAPI
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/:id',
        component: PostDetail
    }
]
 const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router