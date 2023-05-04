import { RouteRecordRaw } from 'vue-router';

const theMainMenu = async () => await import('../components/TheMainMenu.vue');
const theChooseCard = async () => await import('../components/TheChooseCards.vue');

const routes: RouteRecordRaw[] = [
    { path: '', alias: '/', name: 'index', component: theMainMenu },
    { path: '/choose-cards', name: 'choose-cards', component: theChooseCard }
];

export default routes;