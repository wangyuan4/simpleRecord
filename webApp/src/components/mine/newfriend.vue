<template>
  <div>
		<x-header>新朋友<span slot="right" @click="scan">扫二维码</span></x-header>
    <search
      @on-change="getResult"
      @on-submit="getResult"
      ref="search">
    </search>
    <div class="title" >好友通知</div>
    <group style="margin-top:10px" >
      <cell :title="item.name" class="list-style"  v-for="(item,index) in list" :key="index">
        <i v-if="item.friendStatus === undefined" class='fa fa-plus' style="color:#494949;margin-right:10px" @click="() => add(index)"></i>
        <span v-if="item.friendStatus === 0">已发送</span>
        <span v-if="item.friendStatus === 2">已同意</span>
        <span v-if="item.friendStatus === 3">已拒绝</span>
        <div class="updateOpt">
          <div v-if="item.friendStatus === 1" class="agree" @click="() => updateFriend(item.id,2)">同意</div>
          <div v-if="item.friendStatus === 1" class="agree" @click="() => updateFriend(item.id,3)">拒绝</div>
        </div>
      </cell>
    </group>
  </div>
</template>


<script>
import Icon from 'vue-awesome/components/Icon'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import { Group, Cell, CellBox, Search, XDialog, XHeader, AlertModule } from 'vux'
import { userInfoTran, friendInfoTran } from '../../utils/dataTran'
import { getItem } from '../../utils/storage'

export default {
  components: {
    Icon,
    Group,
    Cell,
    CellBox,
    Search,
    XDialog,
    XHeader
  },
  data () {
    return {
      list: [],
      userId: getItem('user').id
    }
  },
  mounted () {
    this.getAddedFriends()
  },
  methods: {
    add (index) {
      const body = {
        userId: this.userId,
        friendId: this.list[index].id
      }
      const _this = this
      axios
      .post(`/api/addfriend`, body)
      .then((res) => {
        if (res.data) {
          AlertModule.show({
            title: '请求已发送！',
            onHide () {
              _this.getAddedFriends()
            }
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    updateFriend (id, status) {
      const _this = this
      const body = {
        userId: this.userId,
        friendId: id,
        status
      }
      axios
      .post(`/api/updatefriend`, body)
      .then((res) => {
        if (res.data) {
          _this.getAddedFriends()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getAddedFriends (val) {
      axios
      .get(`/api/getfriendslist`, {
        params: {
          userId: this.userId,
          val: val || '',
          status: 0
        }
      })
      .then((res) => {
        this.list = res.data.status && friendInfoTran(res.data.list)
      }).catch((error) => {
        console.log(error)
      })
    },

    scan () {
      this.$router.push('/mine/qrcode/scanner')
    },
    getResult (val) {
      val !== '' && axios
      .get(`/api/getuserlist`, {
        params: {
          userId: this.userId,
          val: val || ''
        }
      })
      .then((res) => {
        this.list = res.data.status && userInfoTran(res.data.list, false)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.list-style{
  height:40px;
  font-size:18px;
}
.title{
	color: rgb(131, 130, 130);
	height: 10px;
	text-align: center;
	font-size: 14px;
	margin-top: 4px
}
.updateOpt{
  display: flex;
  flex-direction: row
}
.agree{
  background-color: #35485d;
  width: 40px;
  text-align: center;
  font-size: 16px;
  color: white;
  margin-left: 6px
}
</style>
    