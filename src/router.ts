import Vue from 'vue'
import VueRouter from 'vue-router'

import Server from './components/Server.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', component: Server },
        { path: '/servers/{serverId}', component: Server },
    ]
});