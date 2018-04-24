<template>
  <div style="height:520px">
    <x-header>二维码扫描</x-header>    
    <qrcode-reader
      class="qrscan"
      @decode="onDecode"
      :paused="paused"
    >
    </qrcode-reader>
    <div class="qrbody">
      <div class="qrbox">
        <span class="sp row row1"></span>
        <span class="sp row row2"></span>
        <span class="sp col col1"></span>
        <span class="sp col col2"></span>
        <div class="line"></div>
      </div>
    </div>
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

.btn{
  border-radius:99px;
  width:80%;
  margin: 20px 10%;
  color: #494949;
  border: 1px #494949 solid
}
.qrscan{
  z-index: 1;
}
.qrbody{
  position: absolute;
  background-color: #494949;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 46px;
  opacity: 0.7;
}
.qrbox {
  position: absolute;
  z-index: 150; 
  top: 30%;
  bottom: 30%;
  left: 30%;
  right: 30%;
  width:150px;
  height:150px;
  background-color: white;
}
.sp {
  position:absolute;
  padding:5px;
  border-style: solid;
  border-color: rgb(11, 196, 20);
}
.row1 {
  border-width: 3px 0 0 3px;
  top:-5px;
  left:-5px;
}
.row2 {
  border-width: 3px 3px 0 0;
  top:-5px;
  right:-5px;
}
.col1 {
  border-width: 0 0 3px 3px;
  bottom:-5px;
  left:-5px;
}
.col2 {
  border-width: 0 3px 3px 0;
  bottom:-5px;
  right:-5px;
}

.line{ 
    position: absolute; 
    top: 0px;
    z-index: 101; 
    height: 1px; 
    width: 150px;
    background-color: rgb(3, 110, 8);
    animation: myScan 1s infinite alternate; 
    -webkit-animation: myScan 1s infinite alternate; 
}
@keyframes  myScan{
    from { top:5px; }
    to { top: 150px; }
}

</style>