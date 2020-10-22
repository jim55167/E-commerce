import Vue from 'vue';
import VueRouter from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';

//官方的元件


//自訂的分頁元件

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        { //再路由下隨意輸入網址會跳到空白頁，因此需要此段程式碼
            path: '*',
            redirect: 'login',
        },
        // {
        //     name: 'HelloWorld',
        //     path: '/',
        //     component: HelloWorld,
        //     meta: { requiresAuth: true }, //路由訊息
        // },
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: 'Dashboard',
            path: '/admin',
            component: Dashboard,
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true }, //路由訊息
                }
            ]
        },
    ]
});