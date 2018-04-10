<template>
  <div>
		<div class="mine-head">
			<i class='fa fa-user' style="font-size:100px;color:#35495e"></i>
      <div>{{name}}</div>
    </div>
    <group>
      <cell title="个人信息"  is-link class="list-style" link="/mine/info"></cell>
      <cell title="好友列表"  is-link class="list-style" link="/mine/friends"></cell>
      <cell title="新朋友"  is-link class="list-style" link="/mine/newFriend"><badge></badge></cell>
      <cell title="个人二维码" is-link class="list-style" link="/mine/QRCode"></cell>
      <cell title="日历" is-link class="list-style" link="/mine/calender"></cell>
    </group>
    <group>
      <cell title="切换账号" class="list-style" link="/"></cell>
      <cell title="退出登录" class="list-style" link="/"></cell>
    </group>
  </div>
</template>


<script>
import 'font-awesome/css/font-awesome.min.css'
import { Group, Cell, CellBox, Badge } from 'vux'
export default {
  components: {
    Group,
    Cell,
    CellBox,
    Badge
  },
  data () {
    return {
      name: global.user.name
    }
  }
}
</script>

<style scoped>
.mine-head{
  margin:15% 35% 10px 35%;
  width: 120px;
  height: 120px;
  text-align: center;
}
.list-style{
  height:40px;
  font-size:18px
}
</style>