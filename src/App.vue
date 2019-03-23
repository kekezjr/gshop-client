<!--应用根组件-->
<template>
  <div id="app">
    <!--在此显示当前路由组件-->
    <router-view />

    <FooterGuide v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
//  import {reqAddress} from './api'
  export default {
    mounted () {
      // 异步获取当前地址信息
      this.$store.dispatch('getAddress')
       // console.log(this.$store)
      // const result = await reqAddress('116.36867', '40.10038')
      // console.log('result', result)
      // 异步获取用户信息
      this.$store.dispatch('getUser')
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
