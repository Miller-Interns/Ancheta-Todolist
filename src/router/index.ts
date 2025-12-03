import { createRouter, createWebHistory } from 'vue-router';
import homePage from '@/pages/home-page.vue';
import todoApp from '@/pages/todo-app.vue';

enum RouteName {
    HOME = 'Home',
    APP = 'App'
}

const routes = [
    { path: '/', name: RouteName.HOME, component: homePage },
    { path: '/app', name: RouteName.APP, component: todoApp }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
