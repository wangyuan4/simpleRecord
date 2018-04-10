<template>
  <div>
    <x-header>好友列表</x-header>
		<search
      @on-change="getResult"
      position="absolute"
      auto-scroll-to-top top="46px"
      @on-submit="getResult"
      ref="search">
    </search>
    <swipeout style="margin-top:6px">
      <swipeout-item transition-mode="follow" v-for="(item,index) in list" :key="index">
        <div slot="right-menu" >
          <swipeout-button type="warn" background-color="#35485d"><div @click="show=true;currentIndex=index">删除</div></swipeout-button>
        </div>
        <div slot="content" class="list">   
            <cell class="list-style">{{item.name}}</cell>
        </div>
      </swipeout-item>
    </swipeout>
    <confirm v-model="show"
      title=""
      theme="android"
      @on-cancel="show=false"
      @on-confirm="dele"
      @on-show="show=true"
      @on-hide="show=false">
      <p style="text-align:center;">确定删除该好友吗？</p>
    </confirm>
  </div>
</template>


<script>
import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton, Search, Cell, Confirm } from 'vux'
import axios from 'axios'
import { userInfoTran } from '../../utils/dataTran'
export default {
  components: {
    XHeader,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Search,
    Cell,
    Confirm
  },
  data () {
    return {
      results: [],
      value: '',
      list: [],
      show: false,
      currentIndex: 0
    }
  },
  methods: {
    getResult (val) {
      axios
      .get(`/api/getfriendslist`, {
        params: {
          userId: global.user.id,
          val: val || ''
        }
      })
      .then((res) => {
        this.list = res.data.status && userInfoTran(res.data.list, false)
      }).catch((error) => {
        console.log(error)
      })
    },
    dele () {
      const body = {
        userId: global.user.id,
        friendId: this.list[this.currentIndex].id
      }
      axios.post(`/api/deletefriend`, body)
      .then((res) => {
        res.data && this.getResult()
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getResult()
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