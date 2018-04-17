<template>
  <div>
    <x-header>二维码扫描</x-header>    
    <qrcode-reader
      @decode="onDecode"
      :paused="paused"
    >
    </qrcode-reader>
    <x-dialog v-model="show" class="dialog-demo">
      <div>
			  <i class='fa fa-user' style="font-size:80px;color:#35495e"></i>
      </div>
      <group style="margin-top:20px">
        <cell title="用户名" class="list-style" value-align="left"><span style="float:right">{{userInfo.name}}</span></cell>
        <cell title="账号ID" class="list-style" value-align="left"><span style="float:right">{{userInfo.id}}</span></cell>
        <cell title="状态" class="list-style" v-if="userInfo.status !== '同意' && userInfo.status !== '加好友'" value-align="left"><span style="float:right">{{userInfo.status}}</span></cell>
        <x-button plain type="primary" class="btn" @click.native="addFriend" v-if="userInfo.status === '同意' || userInfo.status === '加好友'">{{userInfo.status}}</x-button>
      </group>
      <div @click="show=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import 'font-awesome/css/font-awesome.min.css'
import { Group, Cell, CellBox, XHeader, XButton, XDialog, AlertModule } from 'vux'
import axios from 'axios'
import { friendInfoTran } from '../../utils/dataTran'
import { getItem } from '../../utils/storage'
export default {
  data () {
    return {
      value: '',
      show: false,
      paused: false,
      userInfo: {},
      userId: getItem('user').id
    }
  },
  components: {
    QrcodeReader,
    Group,
    Cell,
    CellBox,
    XHeader,
    XButton,
    XDialog
  },
  methods: {
    async onDecode (content) {
      if (content) {
        this.paused = true
        axios.get(`/api/getuserinfo`, {
          params: {
            userId: this.userId,
            friendId: content
          }
        })
        .then((res) => {
          this.userInfo = res.data.status && friendInfoTran(res.data.list)[0]
          switch (this.userInfo.friendStatus) {
            case 0: this.userInfo.status = '已发送'
              break
            case 1: this.userInfo.status = '同意'
              break
            case 2: this.userInfo.status = '已是好友'
              break
            case 3: this.userInfo.status = '已被拒绝'
              break
            case undefined: this.userInfo.status = '加好友'
              break
            default: this.userInfo.status = '加好友'
              break
          }
          console.log(this.userInfo)
          this.show = true
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    addFriend () {
      this.userInfo.status === '加好友'
      ? this.add()
      : this.updateFriend()
    },
    add () {
      const body = {
        userId: this.userId,
        friendId: this.userInfo.id
      }
      const _this = this
      axios
      .post(`/api/addfriend`, body)
      .then((res) => {
        if (res.data) {
          AlertModule.show({
            title: '请求已发送！',
            onHide () {
              _this.$router.push({
                path: '/mine/newfriend'
              })
            }
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    updateFriend () {
      const body = {
        userId: this.userId,
        friendId: this.userInfo.id,
        status: 2
      }
      axios
      .post(`/api/updatefriend`, body)
      .then((res) => {
        if (res.data) {
          this.$router.push('/mine/newfriend')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang='less'>
@import '~vux/src/styles/close';
.mine-head{
  margin:15% 35% 10px 35%;
  text-align: center;
}
.btn{
  border-radius:99px;
  width:80%;
  margin: 20px 10%;
  color: #494949;
  border: 1px #494949 solid
}
</style>