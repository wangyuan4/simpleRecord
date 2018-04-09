<template>
  <div>
    <x-header>好友列表</x-header>
		<search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top top="46px"
      @on-submit="onSubmit"
      ref="search">
    </search>
    <swipeout style="margin-top:6px">
      <swipeout-item transition-mode="follow" v-for="(item,index) in list" :key="index">
        <div slot="right-menu" >
          <swipeout-button type="warn" background-color="#35485d" >删除</swipeout-button>
        </div>
        <div slot="content" class="list">   
            <cell class="list-style">{{item.name}}</cell>
        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>


<script>
import { Group, Cell, CellBox, XHeader, Swipeout, SwipeoutItem, SwipeoutButton, Search } from 'vux'
export default {
  components: {
    Group,
    Cell,
    CellBox,
    XHeader,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Search
  },
  data () {
    return {
      results: [],
      value: '',
      list: [{
        name: '王俊凯'
      }, {
        name: '王源'
      }, {
        name: '易烊千玺'
      }, {
        name: '毛不易'
      }, {
        name: '廖峻涛'
      }, {
        name: '钟易轩'
      }]
    }
  }
}
</script>

<style scoped>
.list{
  display: flex;
  flex-direction: row;
  margin: 6px 6px;
  background-color: white;
}
.list-style{
  height:40px;
  font-size:18px
}
</style>