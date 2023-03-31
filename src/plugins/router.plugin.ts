import { createRouter, createWebHistory } from 'vue-router';
import routes from '../config/routes.config';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;