<template>
  <div>
    <x-header>好友列表</x-header>
    <swipeout style="margin-top:20px">
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
import { Group, Cell, CellBox, XHeader, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
  components: {
    Group,
    Cell,
    CellBox,
    XHeader,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
	data () {
		return {
			results: [],
			value: '',
			list: [{
				name:'wang'
			},{
				name:'wang'
			}],
			index01: 0
		}
	},
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