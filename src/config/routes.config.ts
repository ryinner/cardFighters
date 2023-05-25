import { RouteRecordRaw } from 'vue-router';
import redirectIfHasntCardsFunctional from '../functional/redirectIfHasntCards.functional';

const theMainMenu = async () => await import('../components/TheMainMenu.vue');
const theChooseCard = async () => await import('../components/TheChooseCards.vue');
const theFightField = async () => await import('../components/TheFightField.vue');

const routes: RouteRecordRaw[] = [
    { path: '', alias: '/', name: 'index', component: theMainMenu },
    { path: '/choose-cards', name: 'choose-cards', component: theChooseCard },
    { path: '/fight', name: 'fight', component: theFightField, beforeEnter: [redirectIfHasntCardsFunctional] }
];

export default routes;