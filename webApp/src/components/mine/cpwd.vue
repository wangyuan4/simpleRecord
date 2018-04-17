<template>
  <div>
    <x-header>修改密码<span slot="right" @click="save">完成</span></x-header>
    <group style="margin-top:20px">
      <cell title="用户名" class="list-style" :value="name"></cell>
      <cell title="账号ID" class="list-style" :value="id"></cell>
			<x-input title="密码" placeholder="填写密码" class="list-style" type="password" v-model="pwd"></x-input>
			<x-input title="确认密码" placeholder="再次填写确认" class="list-style" type="password" v-model="rePwd" ></x-input>
    </group>
  </div>
</template>


<script>
import { Group, Cell, CellBox, XHeader, XInput, AlertModule } from 'vux'
import { getItem } from '../../utils/storage'
import axios from 'axios'

export default {
  components: {
    Group,
    Cell,
    CellBox,
    XHeader,
    XInput
  },
  data () {
    return {
      pwd: '',
      rePwd: '',
      name: getItem('user').name,
      userId: getItem('user').id
    }
  },
  methods: {
    save () {
      const _this = this
      this.pwd === this.rePwd
      ? axios
        .post(`/api/adduser`, {
          userId: this.userId,
          newPwd: this.pwd
        })
        .then((res) => {
          res.status
          ? AlertModule.show({
            content: '修改成功！',
            onHide () {
              _this.$router.replace('/mine')
            }
          })
          : AlertModule.show({
            content: '请求失败！'
          })
        }).catch((error) => {
          console.log(error)
        })
        : AlertModule.show({
          content: '两次输入密码不一致！',
          onHide () {
            _this.pwd = ''
            _this.rePwd = ''
          }
        })
    }
  }
}
</script>

<style scoped>
.list-style{
  height:40px;
  font-size:18px
}
</style>