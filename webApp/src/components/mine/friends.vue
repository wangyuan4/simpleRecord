<template>
  <div>
    <x-header>好友列表</x-header>
		<search
      @on-change="getResult"
      @on-submit="getResult"
      ref="search">
    </search>
    <swipeout>
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
import { getItem } from '../../utils/storage'
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
      userId: getItem('user').id,
      results: [],
      value: '',
      list: [],
      show: false,
      currentIndex: 0
    }
  },
  mounted () {
    this.getResult()
  },
  methods: {
    getResult (val) {
      axios
      .get(`/api/getfriendslist`, {
        params: {
          userId: this.userId,
          val: val || '',
          status: 2
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
        userId: this.userId,
        friendId: this.list[this.currentIndex].id
      }
      axios.post(`/api/deletefriend`, body)
      .then((res) => {
        res.data && this.getResult()
      }).catch((error) => {
        console.log(error)
      })
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