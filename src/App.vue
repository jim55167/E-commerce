<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  // created(){
  //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; //'https://vue-course-api.hexschool.io/api/jim55167/products'
  //   // API 伺服器路徑
  //   //所申請的 APIPath
  //   this.$http.get(api).then((response) => {
  //      console.log(response.data)
  //   });
  // }
};
</script>

<style lang="scss">
@import "./assets/all.scss";

</style>
