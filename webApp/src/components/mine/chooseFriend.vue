<template>
  <div>
    <x-header>选择好友<span slot="right" @click="shareFile">确定</span></x-header>
		<search
      @on-change="getResult"
      position="absolute"
      auto-scroll-to-top top="46px"
      ref="search">
    </search>
      <checklist class="list-style" label-position="left" :options="list" @on-change="change"></checklist>
  </div>
</template>


<script>
import { XHeader, Search, Checklist } from 'vux'
import axios from 'axios'
import { userInfoTran } from '../../utils/dataTran'
export default {
  components: {
    XHeader,
    Search,
    Checklist
  },
  data () {
    return {
      results: [],
      value: '',
      chooseItem: '',
      list: [],
      chooseIds: []
    }
  },
  methods: {
    change (value) {
      this.chooseIds = value
    },
    getResult (val) {
      axios
      .get(`/api/getfriendslist`, {
        params: {
          userId: global.user.id,
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
        userId: global.user.id,
        fileId: this.fileId
      }
      axios
      .post(`${global.IP}/sharefile`, body)
      .then((res) => {
        res.data && this.$router.push({ path: '/note/list' })
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
.list-style{
  height:60px;
  font-size:18px
}
</style>