<template>
  <div>
    <div class="filelist-title">文件列表</div>
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
    <tab>
      <tab-item selected @on-item-click="switchTabitem">工作文件</tab-item>
      <tab-item @on-item-click="switchTabitem">生活文件</tab-item>
    </tab>
    <swipeout style="margin-top:5%">
      <swipeout-item transition-mode="follow" v-for="(item,index) in list" :key="index">
        <div slot="right-menu" >
          <swipeout-button type="primary" background-color="rgb(73, 73, 73)" >分享</swipeout-button>
          <swipeout-button type="warn" background-color="rgb(73, 73, 73)" >删除</swipeout-button>
        </div>
        <div slot="content" class="file-list">{{item.title}}</div>
      </swipeout-item>
    </swipeout>
  </div>
</template>

<script>
  import {AlertModule, Search, Tab, TabItem, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import axios from 'axios'
  import {fileInfoTran} from '../../utils/dataTran'
  export default {
    components: {
      Search,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Tab,
      TabItem
    },
    data () {
      return {
        results: [],
        value: '',
        list: [],
        index01: 0
      }
    },
    methods: {
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log('on-change', val)
        this.results = val ? this.getResult(this.value) : []
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
        console.log(index)
      },
      searchWorkFiles () {
        axios.get(`/getFileList`, {
          params: {
            id: global.user.id,
            type: 0
          }
        }).then((res) => {
          if (res.data.status) {
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
    },
    beforeCreate () {
      console.log(global)
      axios.get(`/getFileList`, {
        params: {
          id: global.user.id,
          type: 0
        }})
        .then((res) => {
          if (res.data.status) {
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
</style>