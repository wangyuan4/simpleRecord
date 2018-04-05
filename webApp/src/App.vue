<template>
  <div id="app">
    <!-- <x-header></x-header> -->
    <router-view></router-view>
    <tabbar>
      <tabbar-item selected link="/note/add">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_article.png"> -->
        <span slot="label">添加笔记</span>
      </tabbar-item>
      <tabbar-item link="/note/list">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <span slot="label">笔记列表</span>
      </tabbar-item>
      <tabbar-item link="/me">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    XHeader,
    Tabbar,
    TabbarItem
  },
  beforeCreate () {
    this.$router.push({path: '/note/add'})
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
