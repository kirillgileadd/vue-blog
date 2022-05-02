import {createStore} from "vuex";
import {postModule} from "@/store/blogModule";

export const store = createStore({
    state: {

    },
    modules: {
        post: postModule
    }
})