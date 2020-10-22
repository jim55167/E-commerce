// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios'; //主要AJAX套件
import VueAxios from 'vue-axios'; //將它轉為Vue的套件
import 'bootstrap';

// 上面為載入的套件內容，下面是自定義的內容

import App from './App';
import router from './router';


Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);

  if (to.meta.requiresAuth) { //假如meta具有requiresAuth的話則不會直接放行
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => { //因目前執行環境是在router下，並不是在vue的元件內，所以他無法直接呼叫this.$http，因此直接替換成axios
    console.log(response.data);
    if(response.data.success){
        next(); //成功登入的話則直接放行
    }else{
     next({
       path: '/login', //要前往的路徑
     }) //如果不是登入的狀態時，則必須回到登入頁面
    }
  });
  }else{ //反之若沒有requiresAuth就直接放行
    next();
  }
});
