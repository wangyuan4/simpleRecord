<template>
  <div class="bg">
    <x-header>二维码名片</x-header>
		<div class="qrcode">
			<div class="title">
				<icon name="camera" scale="5"></icon>
				<div>{{userName}}</div>
			</div>
			<div class="img">
    		<qrcode :value="userName" type="img"></qrcode>
			</div>
			<div class="footer">扫二维码，加我好友</div>
		</div>
  </div>
</template>


<script>
import { Qrcode, XHeader } from 'vux'
import Icon from 'vue-awesome/components/Icon'
import { getItem } from '../../utils/storage'
export default {
  components: {
    Qrcode,
    XHeader,
    Icon
  },
  data () {
    return {
      userId: getItem('user').id,
      userName: getItem('user').id
    }
  }
}
</script>

<style scoped>
.bg{
	flex: 1;
	background: rgb(32, 32, 32);
	padding-bottom: 30%
}
.qrcode{
	background: white;
	width:80%;
	height: 100%;
	margin: 30% 10%;
	padding-left: 10px
}
.title{
	display: flex;
	flex-direction: row;
}
.title div{
	width: 100%;
	height: 100%;
	padding-top: 30px;
	padding-left: 5px
}
.img{
	margin:20% 20% 10% 20%
}
.footer{
	color: rgb(143, 141, 141);
	text-align: center;
	margin-bottom: 10%
}
</style>