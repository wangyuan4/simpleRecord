<template>
  <div>
    <x-header>个人信息</x-header>
    <group style="margin-top:20px">
      <cell title="用户名" class="list-style" :value="name"></cell>
      <cell title="账号ID" class="list-style" :value="id"></cell>
      <cell title="更改密码" is-link class="list-style" link="/mine/changePwd"></cell>
    </group>
  </div>
</template>


<script>
import { Group, Cell, CellBox, XHeader } from 'vux'
import { getItem } from '../../utils/storage'
export default {
  components: {
    Group,
    Cell,
    CellBox,
    XHeader
  },
  data () {
    return {
      name: getItem('user').name,
      id: getItem('user').id
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