import {createStore, Store} from "vuex";
import {postModule, PostModuleState} from "@/store/postModule/postModule";
import {InjectionKey} from "vue";

export interface State {
    isAuth: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        isAuth: false
    },
    modules: {
        post: postModule
    }
})