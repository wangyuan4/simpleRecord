<template>
  <div>
		<div class="login-font">登  录</div>
		<div class="loginBg">
			<div class="login-icon"><icon name="user-circle" scale="8" color="black"></icon></div>
			<!-- <group> -->
				<x-input class="input" placeholder="用户名" v-model="userName" :required="ture"></x-input>
				<x-input class="input" placeholder="密码" v-model="userPwd"></x-input>
			<!-- </group> -->
			<div class="login-forget">忘记密码？</div>
			<button class="login-btn" @click="login">登录</button>
		</div>
		<div class="fonts"><span>新用户？点击这里注册</span></div>
  </div>
</template>

<script>
  import {Group,XInput,Flexbox,FlexboxItem,AlertModule} from 'vux'
	import Icon from 'vue-awesome/components/Icon'
	import {fetchJSONByGet,fetchJSONByPost} from '../utils/ajax'
	import {userInfoTran} from '../utils/dataTran'
  export default {
		data () {
			return {
				userName:'',
				userPwd:''
			}
  },
  methods: {
		login(){
			// this.$router.push({path:'/app'})
			const query = {
				name:this.userName,
				pwd:this.userPwd
			}
			fetchJSONByGet('searchuser')(query)
			.then(res => 
				{console.log(res)
				res.json()
				}
			)
			.then(res => {
				console.log(res)
				if(res.status){
					// setValue('userInfo',userInfoTran(res.data,true))
					global.user = userInfoTran(res.data,true)
					Actions.App();
				}else{
					AlertModule.show({
						content: res.msg,
						onShow () {
							console.log('Module: I\'m showing')
						},
						onHide () {
							console.log('Module: I\'m hiding now')
						}
					})
				}
			})
		}
  },
  components: {
		XInput,
		Flexbox,
		FlexboxItem,
		Icon,
		Group
  }
  }
</script>

<style scoped>
	.login-font{
		margin:10%;
		padding: 10 50% 10 50%;
		font-size: 20px;
		text-align:center;
	}
	.loginBg{
		margin: 15% 10% 10% 10%;
		padding: 10% 0 0 0;
		border-radius: 8px;
		width: 80%;
		height: 80%;
		box-shadow: 0 0 15px rgb(73, 73, 73);
	}
	.login-icon{
		/* border: 1px solid black; */
	}
	.input{
		border:1.5px solid rgb(202, 201, 201);;
		width:70%;
		height: 25px;
		border-radius: 20px;
		margin-left: 10%;
		margin-right: 10%;
		margin-top:10%;
		margin-bottom: 5%;
	}
	.login-forget{
		color:rgb(117, 116, 116);
		padding-left: 15%;
	}
	.login-btn{
		background-color: rgb(73, 73, 73);
		color: white;
		font-size:15px;
		width:80%;
		height: 50px;
		border-radius: 20px;
		margin-left: 10%;
		margin-right: 10%;
		margin-top:5%;
		margin-bottom: 10%;
	}
	.fonts{
		color:rgb(117, 116, 116);
		text-align: center
	}
</style>