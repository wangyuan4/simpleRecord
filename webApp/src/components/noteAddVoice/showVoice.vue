<template>
  <div>
    <x-header>{{item.title||'播放音频文件'}}<span slot="right" @click="show=true" v-if="!item.title">保存</span></x-header>
    <div class="animate-group">
      <vue-loading v-if="recordIng" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
      <vue-loading v-if="!recordIng" type="beat" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
    <box gap="10px 10px"></box>   
    <div class="progress-bar-wrapper">
      <x-progress :percent="currentTime" :show-cancel="false"></x-progress>
      <x-button plain type="primary" class="btn" @click.native="showVoice">{{voiceOpt}}</x-button>
    </div>
    <audio 
      :src="item.url"
      ref="audio" 
      @play="ready" 
      @error="error"
      @timeupdate="updateTime"
      @ended="ended">
    </audio>
    <popup v-model="show">
      <popup-header
      right-text="确定"
      title="请选择文件保存分类:"
      :show-bottom-border="true"
      @on-click-left="show = false"
      @on-click-right="saveFile"></popup-header>
      <group gutter="0">
        <x-input v-model="title" placeholder="请输入标题"></x-input>
        <radio :options="options" v-model="opt"></radio>
      </group>
    </popup>
  </div>
</template>


<script>
import { XInput, Box, XButton, XHeader, PopupHeader, Popup, Group, Radio, XProgress } from 'vux'
import vueLoading from 'vue-loading-template'
import axios from 'axios'
import { getItem } from '../../utils/storage'
export default {
  components: {
    XButton,
    XHeader,
    PopupHeader,
    Popup,
    Group,
    Radio,
    XInput,
    Box,
    XProgress,
    vueLoading
  },
  data () {
    return {
      show: false,
      isOpen: true,
      duration: 0,
      currentTime: 0,
      recordIng: false,
      item: {},
      title: '',
      userId: getItem('user').id,
      options: [{
        key: 0,
        value: '工作文件'
      }, {
        key: 1,
        value: '生活文件'
      }],
      opt: 0,
      voiceOpt: '播放'
    }
  },
  created () {
    this.item = this.$route.params.item
    const blob = this.base64ToBlob(this.item.content)
    this.item.url = URL.createObjectURL(blob)
  },
  mounted () {
  },
  methods: {
    base64ToBlob (dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {type: mime})
    },
    updateTime (e) {
      this.currentTime = (e.target.currentTime / this.duration) * 100
      if (this.currentTime === 100) {
        this.voiceOpt = '播放'
        this.currentTime = 0
      }
    },
    ready () {
    },
    error () {
    },
    ended () {
    },
    showVoice () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.voiceOpt = '暂停'
        this.duration = this.$refs.audio.duration
        this.$refs.audio.play()
      } else {
        this.voiceOpt = '播放'
        this.$refs.audio.pause()
      }
    },
    saveFile () {
      const file = this.item.content
      const fileName = this.title === '' ? `语音_${Math.round(new Date().getTime() / 1000)}` : this.title
      const otherinfo = JSON.stringify({
        userId: this.userId,
        title: fileName,
        type: this.opt,
        fileType: 'voice'
      })
      let param = new FormData() // 创建form对象
      param.append('file', file) // 通过append向form对象添加数据
      param.append('otherinfo', otherinfo) // 添加form表单中其他数据
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 添加请求头
      axios.post(`/api/savemedia`, param, config)
      .then(res => {
        res.data && this.$router.push('/note/list')
      })
    }
  }
}
</script>

<style scoped>
.animate-group {
  margin: 150px 0;
}
.btn{
  border-radius:99px;
  width:80%;
  margin-top:10%;
  color: #494949;
  border: 1px #494949 solid
}
</style>