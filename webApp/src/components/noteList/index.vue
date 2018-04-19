<template>
  <div>
    <div class="filelist-title">文件列表</div>
    <search
      @on-change="getResult"
      v-model="value"
      @on-submit="getResult"
      ref="search">
    </search>
    <sticky
      :check-sticky-support="false"
    >
      <tab>
        <tab-item selected @on-item-click="switchTabitem">工作文件</tab-item>
        <tab-item @on-item-click="switchTabitem">生活文件</tab-item>
        <tab-item @on-item-click="switchTabitem">好友分享</tab-item>
        <tab-item @on-item-click="switchTabitem">回收站</tab-item>
      </tab>
    </sticky>
      <swipeout style="margin-top:6px">
        <swipeout-item transition-mode="follow" v-for="(item,index) in list" :key="index">
          <div slot="right-menu" >
            <swipeout-button v-if="!item.isTrash&&!item.isShare" type="primary" background-color="rgb(73, 73, 73)"><div @click="show1=true;currentIndex=index">分享</div></swipeout-button>
            <swipeout-button v-if="item.isTrash" type="primary" background-color="rgb(73, 73, 73)"><div @click="() => revert(index)">还原</div></swipeout-button>
            <swipeout-button type="warn" background-color="rgb(73, 73, 73)" ><div @click="show=true;currentIndex=index;confirmCont=item.isTrash || item.friendName ?'确定永久删除？':'确定移进垃圾桶吗？'">删除</div></swipeout-button>
          </div>
          <div slot="content" class="list" @click="() => jumpToShow(index)">
            <div class="list-left">
              <div class="day">{{item.month}}</div>
              <div class="week">{{item.day}}日</div>
              <div class="time">{{item.time}}</div>
            </div>
            <div class="list-line"></div>
            <div class="list-right" >{{item.title}}.{{item.fileType}}</div>
            <div class="list-right" v-if="item.isShare">来自：{{item.friendName}}</div>
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
      <p style="text-align:center;">{{confirmCont}}</p>
      </confirm>
    <popup v-model="show1">
      <popup-header
      right-text="确定"
      title="分享至："
      :show-bottom-border="true"
      @on-click-left="show1 = false"
      @on-click-right="share">
      </popup-header>
      <group gutter="0">
        <radio fill-mode fill-label="邮箱：" fill-placeholder="请填写邮箱地址" :options="options" @on-change="change"></radio>
      </group>
    </popup>
  </div>
</template>

<script>
  import {AlertModule, Search, Tab, TabItem, Swipeout, SwipeoutItem, SwipeoutButton, Confirm, PopupHeader, Popup, Radio, Group, Sticky} from 'vux'
  import axios from 'axios'
  import { fileInfoTran } from '../../utils/dataTran'
  import { getItem } from '../../utils/storage'
  export default {
    components: {
      Search,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Tab,
      TabItem,
      Confirm,
      AlertModule,
      PopupHeader,
      Popup,
      Radio,
      Group,
      Sticky
    },
    data () {
      return {
        value: '',
        list: [],
        index01: 0,
        show: false,
        currentIndex: 0,
        confirmCont: '',
        currentTabIndex: 0,
        show1: false,
        options: [{
          key: 0,
          value: '我的好友'
        }],
        shareType: '',
        userId: getItem('user').id
      }
    },
    // 生命周期钩子函放在前面是个好习惯
    mounted () {
      this.getFileList(0, 0)
      try {
        window.URL = window.URL || window.webkitURL
      } catch (error) {
        alert('No web audio support in this browser!')
      }
    },
    methods: {
      base64ToBlob (dataurl) {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[0]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type: mime})
      },
      getResult (val) {
        this.getFileList(this.currentTabIndex, this.currentTabIndex === 3 ? 1 : 0, val)
      },
      change (value, label) {
        this.shareType = value
      },
      dele () {
        const item = this.list[this.currentIndex]
        const body = {
          userId: this.userId,
          fileId: item.id
        }
        const url = item.isShare ? '/api/delsharefile' : '/api/deletefile'
        axios.post(url, body)
        .then((res) => {
          !item.isShare && AlertModule.show({
            title: '删除成功！',
            content: this.list[this.currentIndex].isTrash ? '已永久删除！' : '已移到垃圾桶，如有需要可还原！'
          })
          this.getFileList(this.currentTabIndex, this.currentTabIndex === 3 ? 1 : 0)
        }).catch((error) => {
          console.log(error)
        })
      },
      share () {
        // eslint-disable-next-line
        const re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        if (this.shareType === 0) {
          this.$router.push({
            name: 'choosefriend',
            params: {
              fileId: this.list[this.currentIndex].id
            }
          })
        } else if (re.test(this.shareType) === true) {
          console.log('分享至邮箱')
          this.readySendMail(this.shareType)
        } else {
          AlertModule.show({
            title: '邮箱格式错误！'
          })
          this.show1 = true
        }
      },
      readySendMail (email) {
        axios
          .post(`/api/sendmail`, {
            from: getItem('user').name,
            to: email,
            content: this.list[this.currentIndex].content
          })
          .then((res) => {
            this.$vux.toast.text('分享成功')
            this.show1 = false
          }).catch((error) => {
            this.$vux.toast.text(error || '分享失败')
          })
      },
      revert (index) {
        const body = {
          userId: this.userId,
          fileId: this.list[this.currentIndex].fileId
        }
        axios.post(`/api/revertfile`, body)
        .then((res) => {
          this.getFileList(this.currentTabIndex, this.currentTabIndex === 2 ? 1 : 0)
        }).catch((error) => {
          console.log(error)
        })
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      switchTabitem (index) {
        this.currentTabIndex = index
        switch (index) {
          case 0: this.getFileList(0, 0)
            break
          case 1: this.getFileList(1, 0)
            break
          case 2: this.getFileList(2, 0)
            break
          case 3: this.getFileList(3, 1)
            break
          default: this.getFileList(0, 0)
            break
        }
      },
      jumpToShow (index) {
        const data = this.list[index]
        console.log(data)
        let opt = {}
        switch (data.fileType) {
          case 'md': opt = {
            name: 'noteAddMakdown',
            params: {
              fileId: data.id,
              fileAuth: data.fileAuth
            }
          }
            break
          case 'html': opt = {
            name: 'noteShow',
            params: {
              item: data
            }
          }
            break
          case 'voice': opt = {
            name: 'ShowVoice',
            params: {
              item: data
            }
          }
            break
          case 'img': opt = {
            name: 'noteShow',
            params: {
              item: data
            }
          }
            break
          default:
            break
        }
        this.$router.push(opt)
      },
      getFileList (type, isTrash, val) {
        axios.get(`/api/getfilelist`, {
          params: {
            id: this.userId,
            type,
            isTrash,
            val: val || ''
          }})
          .then((res) => {
            if (res.data.status) {
              res.data.list.map(el => {
                el.file_content = el.file_type === 'img' ? URL.createObjectURL(this.base64ToBlob(el.file_content)) : el.file_content
              })
              this.list = fileInfoTran(res.data.list)
              console.log(this.list)
            } else {
              AlertModule.show({
                content: res.data.msg
              })
            }
          }).catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
.filelist-title{
  text-align: center;
  margin: 2.5% auto;
}
.file-list{
  border-bottom: 1.5px solid rgb(223, 221, 221);
  padding:15px 20px;
}
.list{
  display: flex;
  flex-direction: row;
  margin: 6px 6px;
  background-color: white;
  color: rgb(90, 88, 88)
}
.list-left{
  width: 100px;
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
  text-align: center
}
.list-line{
  margin:8px 10px;
  background-color: #efeff4;
  width: 2px;
}
.day{
  font-weight: bold;
  font-size:20px
}
.week,.time{
  color: rgb(197, 194, 194);
  font-size: 12px
}
.list-right{
  width: 100%;
  text-align: center;
  padding: 6px 10px;
  display: flex;
  flex-direction: row;
  padding: 25px 10px
}
</style>