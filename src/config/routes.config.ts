import { RouteRecordRaw } from 'vue-router';

const theMainMenu = import('../components/TheMainMenu.vue');
const theChooseCard = import('../components/TheChooseCards.vue');

const routes: RouteRecordRaw[] = [
    { path: '', alias: '/', name: 'index', component: theMainMenu },
    { path: '/choose-cards', name: 'choose-cards', component: theChooseCard }
];

export default routes;