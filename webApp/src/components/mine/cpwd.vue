<template>
  <div>
    <x-header>修改密码<span slot="right" @click="save">完成</span></x-header>
    <group style="margin-top:20px">
      <cell title="用户名" class="list-style" value="wang"></cell>
      <cell title="账号ID" class="list-style" value="123456"></cell>
			<x-input title="密码" :is-type="be2333" placeholder="填写密码" class="list-style"></x-input>
			<x-input title="密码" :is-type="be2333" placeholder="再次填写确认" class="list-style"></x-input>
    </group>
  </div>
</template>


<script>
import { Group, Cell, CellBox, XHeader, XInput } from 'vux'
export default {
  components: {
    Group,
    Cell,
    CellBox,
    XHeader,
    XInput
  },
  methods: {
    save () {
      this.$router.replace('/mine/info')
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