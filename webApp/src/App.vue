<template>
  <div id="app">
    <view-box ref="viewBox" class="content"><router-view></router-view></view-box>
    <div  class="tab">
      <tabbar slot="bottom">
      <tabbar-item selected link="/note/add">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_article.png"> -->
        <span slot="label">添加笔记</span>
      </tabbar-item>
      <!-- <tabbar-item link="/note/list" @on-item-click="handler"> -->
      <tabbar-item link="/note/list">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <span slot="label">笔记列表</span>
      </tabbar-item>
      <tabbar-item link="/mine">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <span slot="label">个人中心</span>
      </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { XHeader, Tabbar, TabbarItem, ViewBox } from 'vux'
export default {
  name: 'app',
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    ViewBox
  },
  methods: {
    handler () {
      console.log(111)
    }
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
.content{
  height: 100%;
  overflow: hidden;
}
.tab{
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
</style>
