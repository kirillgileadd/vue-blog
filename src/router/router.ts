import PostsPage from "@/components/pages/PostsPage.vue";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import About from "@/components/pages/About.vue";
import PostDetail from "@/components/pages/PostDetail.vue";

const routes: Array<RouteRecordRaw> = [
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