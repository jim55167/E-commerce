//官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import CustomerOrder from '@/components/pages/CustomerOrders';



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
                },
                // {
                //     path: 'coupons',
                //     name: 'Coupons',
                //     component: Coupons,
                //     meta: { requiresAuth: true },
                // },
                // {
                //     path: 'orders',
                //     name: 'Orders',
                //     component: Orders,
                //     meta: { requiresAuth: true },
                // }
            ]
        },
        {
            name: 'Dashboard',
            path: '/',
            component: Dashboard,
            children: [
                {
                    path: 'customer_order',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                },
            ]
        },
    ]
});