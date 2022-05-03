import PostsPage from "@/components/pages/PostsPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import About from "@/components/pages/About.vue";
import PostDetail from "@/components/pages/PostDetail.vue";
import {defineComponent} from "vue";

export interface IRoute {
    path: string,
    component: ReturnType<typeof defineComponent>
}

const routes: IRoute[] = [
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