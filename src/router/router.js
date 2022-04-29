import PostsPage from "@/components/pages/PostsPage";
import {createRouter, createWebHistory} from "vue-router";
import About from "@/components/pages/About";
import PostDetail from "@/components/pages/PostDetail";

const routes = [
    {
        path: '/',
        component: PostsPage
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