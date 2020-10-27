import Vue from 'vue';

Vue.prototype.$bus = new Vue();

//Message
//this.$bus.$emit('message:push', message, status);
//message(String): 訊息內容
//status(String): Alert的樣式