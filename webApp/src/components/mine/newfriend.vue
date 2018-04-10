<template>
  <div>
		<x-header>新朋友<span slot="right" @click="scan">扫二维码</span></x-header>
    <search
      @on-change="getResult"
      position="absolute"
      auto-scroll-to-top top="46px"
      @on-submit="getResult"
      ref="search">
    </search>
		<div class="title">好友通知</div>
		<group style="margin-top:30px" >
			<cell :title="item.name" class="list-style"  v-for="(item,index) in list" :key="index">
        <i class='fa fa-plus' style="color:#494949;margin-right:10px" @click="() => add(index)"></i>
      </cell>
    </group>
  </div>
</template>


<script>
import Icon from 'vue-awesome/components/Icon'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import { Group, Cell, CellBox, Search, XDialog, XHeader, AlertModule } from 'vux'
import { userInfoTran } from '../../utils/dataTran'

// const ws = new WebSocket('ws://localhost:3320')

// ws.onopen = (evt) => {
//   console.log('Connection open ...')
//   ws.send('Hello WebSockets!')
// }
// ws.onmessage = (evt) => {
//   console.log('Received Message: ' + evt.data)
//   ws.close()
// }

// ws.onclose = (evt) => {
//   console.log('Connection closed.')
// }
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
  methods: {
    add (index) {
      const body = {
        userId: global.user.id,
        friendId: this.list[index].id
      }
      const _this = this
      axios
      .post(`/api/addfriend`, body)
      .then((res) => {
        if (res.data) {
          AlertModule.show({
            title: '添加成功！',
            onHide () {
              _this.$router.push({path: '/mine/friends'})
            }
          })
        }
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
          userId: global.user.id,
          val: val || ''
        }
      })
      .then((res) => {
        this.list = res.data.status && userInfoTran(res.data.list, false)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  data () {
    return {
      list: []
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
</style>
    