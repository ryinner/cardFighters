import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '../config/routes.config';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

router.onError((error) => {
    console.log(error);
});

export default router;