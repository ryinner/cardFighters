import { createApp } from 'vue';
import App from './App.vue';
import router from './plugins/router.plugin';
import store from './plugins/store.plugin';
import './style.scss';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');

console.log(router.currentRoute.value, router.getRoutes());