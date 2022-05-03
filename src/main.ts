import {createApp} from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from "@/router/router";
import directives from "@/directives";
import {key, store} from "@/store";

const app = createApp(App)

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

components.forEach(component => {
    app.component(component.name, component)
})


app.use(router).use(store, key).mount('#app')
