import Vue from 'vue';
import VueRouter from 'vue-router';
import luckDrawManagement from './luckDrawManagement';


const appMain = (resolve) => {
    require(['../page/home.vue'], resolve);
};
const routes = [{
        path: '/',
        component: appMain,
        meta: {
            title: '首页',
        },
    },
].concat(
    luckDrawManagement,
);

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    routes,
});
