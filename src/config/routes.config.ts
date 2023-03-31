import { RouteRecordRaw } from 'vue-router';

const theMainMenu = import('../components/TheMainMenu.vue');

const routes: RouteRecordRaw[] = [
    { path: '', name: 'index', component: theMainMenu }
];

export default routes;