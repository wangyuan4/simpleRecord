<template>
  <div>
		<div class="mine-head">
			<icon name="camera" scale="5"></icon>
      <div>用户名</div>
    </div>
    <group>
      <cell title="个人信息"  is-link class="list-style" link="/mine/info"></cell>
      <cell title="好友列表"  is-link class="list-style" link="/mine/friends"></cell>
      <cell title="新朋友"  is-link class="list-style" link="/mine/newFriend"></cell>
      <cell title="个人二维码" is-link class="list-style" link="/mine/QRCode"></cell>
    </group>
    <group>
      <cell title="切换账号" class="list-style" link="/"></cell>
      <cell title="退出登录" class="list-style" link="/"></cell>
    </group>
  </div>
</template>


<script>
import Icon from 'vue-awesome/components/Icon'
import { Group, Cell, CellBox } from 'vux'
export default {
  components: {
    Icon,
    Group,
    Cell,
    CellBox
  }
}
</script>

<style scoped>
.mine-head{
  margin:20% 30% 10px 30%;
  width: 150px;
  height: 150px;
  text-align: center
}
.list-style{
  height:40px;
  font-size:18px
}
</style>