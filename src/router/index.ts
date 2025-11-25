import { createRouter, createWebHistory } from 'vue-router';
import homePage from '@/pages/home-page.vue';
import todoApp from '@/pages/todo-app.vue';


const routes = [
{ path: '/', name: 'Home', component: homePage },
{ path: '/app', name: 'App', component: todoApp }
];


export const router = createRouter({
history: createWebHistory(),
routes
});