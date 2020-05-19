import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthService from '@/services/auth-service';
import Layout from '@/components/layout.vue';
import SignIn from '@/components/sign-in.vue';
import Concerts from '@/components/concerts.vue';
import Users from '@/components/user.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Layout,
        children: [
            {
                path: '',
                redirect: 'koncerty'
            },
            {
                path: 'koncerty',
                name: 'concerts',
                component: Concerts
            },
            {
                path: 'uzytkownicy',
                name: 'users',
                component: Users
            }
        ]
    },
    {
        path: '/logowanie',
        name: 'sign-in',
        component: SignIn
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const toSignIn = to.name === 'sign-in';

    AuthService
        .authorize()
        .then(() => !toSignIn ? next(): next({ name: 'home' }))
        .catch(() => toSignIn ? next() : next({ name: 'sign-in' }));
});

export default router;
