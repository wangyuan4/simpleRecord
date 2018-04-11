<template>
  <div>
    <x-header>选择好友<span slot="right" @click="show=true">确定</span></x-header>
		<search
      @on-change="getResult"
      ref="search">
    </search>
    <checklist class="list-style" label-position="left" :options="list" @on-change="change"></checklist>
    <popup v-model="show">
      <popup-header
      right-text="确定"
      title="请选择文件分享权限:"
      :show-bottom-border="true"
      @on-click-left="show = false"
      @on-click-right="shareFile"></popup-header>
      <group gutter="0">
        <radio :options="options" v-model="opt"></radio>
      </group>
    </popup>
  </div>
</template>


<script>
import { XHeader, Search, Checklist, PopupHeader, Popup, Group, Radio, AlertModule } from 'vux'
import axios from 'axios'
import { getItem } from '../../utils/storage'
import { userInfoTran } from '../../utils/dataTran'
export default {
  components: {
    XHeader,
    Search,
    Checklist,
    PopupHeader,
    Popup,
    Group,
    Radio
  },
  data () {
    return {
      results: [],
      value: '',
      chooseItem: '',
      list: [],
      chooseIds: [],
      fileId: '',
      userId: getItem('user').id,
      options: [{
        key: 0,
        value: '只读'
      }, {
        key: 1,
        value: '编辑'
      }],
      show: false,
      opt: ''
    }
  },
  mounted () {
    this.fileId = this.$route.params.fileId || ''
    this.getResult()
  },
  methods: {
    change (value) {
      this.chooseIds = value
    },
    getResult (val) {
      axios
      .get(`/api/getfriendslist`, {
        params: {
          userId: this.userId,
          val: val || ''
        }
      })
      .then((res) => {
        const data = res.data.status && userInfoTran(res.data.list, false)
        data.forEach((el, index) => {
          this.list.push({
            key: el.id,
            value: el.name
          })
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    shareFile () {
      const body = {
        userId: this.userId,
        friendIds: this.chooseIds,
        fileId: this.fileId,
        fileAuth: this.opt
      }
      const _this = this
      axios
      .post(`/api/sharefile`, body)
      .then((res) => {
        res.data && AlertModule.show({
          title: '分享成功',
          onHide () {
            _this.$router.push({ path: '/note/list' })
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.list-style{
  height:60px;
  font-size:18px
}
</style>