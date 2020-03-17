import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/views/Hello'
import Application from '@/views/Application'
import Main from '@/views/Main'
import Starred from '@/views/Starred'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Hello',
        component: Hello
    },
    {
        path: '/app',
        component: Application,
        children: [
            {
                path: '/',
                name: 'Main',
                component: Main
            },
            {
                path: 'starred',
                name: 'Starred',
                component: Starred
            }
        ]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
