import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home';
import Clients from './components/clients/Clients';
import Steps from './components/steps/Steps';
import StepsAdd from './components/steps/Steps-add';
import Reports from './components/reports/Reports';
import Assets from './components/assets/Assets';
import AssetsAdd from './components/assets/Asset-add';
import Send from './components/send-to-bot/Send';
import Login from './components/login/Login';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path : '/', component : Home},
        { path: '/login', component: Login },
        {path : '/clients', component : Clients },
        {path : '/steps', component : Steps },
        {path : '/steps/add', component : StepsAdd },
        {path : '/reports', component: Reports },
        {path : '/assets', component: Assets},
        {path : '/assets/add', component: AssetsAdd },
        {path : '/send', component: Send },
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = sessionStorage.getItem('user');
  
    if (authRequired && !loggedIn) {
      return next('/login');
    }
  
    next();
  })