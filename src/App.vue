<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- keep-alive这个是防止重复请求，第二次之后从缓存中获取 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>