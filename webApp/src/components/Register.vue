<template>
  <div>
    <div class="login-font">注  册</div>
    <div class="loginBg">
      <div class="login-icon"><i class='fa fa-user-plus' style="font-size:100px;color:#494949;"></i></div>
        <x-input class="input" placeholder="用户名" v-model="userName" :required="true"></x-input>
        <x-input class="input" placeholder="密码" v-model="userPwd" type="password" :required="true"></x-input>
      <button class="login-btn" @click="sign">注册</button>
    </div>
    <div class="fonts"><router-link to="/">已经有账号？点击这里登录</router-link></div>
  </div>
</template>

<script>
import {Group, XInput, Flexbox, FlexboxItem, AlertModule} from 'vux'
import 'font-awesome/css/font-awesome.min.css'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import {userInfoTran} from '../utils/dataTran'
import { setItem } from '../utils/storage'
export default {
  data () {
    return {
      userName: '',
      userPwd: ''
    }
  },
  components: {
    XInput,
    Flexbox,
    FlexboxItem,
    Icon,
    Group
  },
  methods: {
    fakeLogin () {
      this.$router.replace('/note/add')
    },
    sign () {
      const body = {
        name: this.userName,
        pwd: this.userPwd

      }
      this.userName === '' || this.userPwd === ''
      ? AlertModule.show({
        content: '请填写用户名和密码！'
      })
      : axios
        .post(`/api/adduser`, body)
        .then((res) => {
          if (res.data.status) {
            const user = userInfoTran(res.data.list, true)
            setItem('user', user)
            this.$router.push({path: '/app'})
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
    display: flex;
    flex-direction: row;
    justify-content: center
  }
  .input{
    border:1.5px solid rgb(202, 201, 201);;
    width:70%;
    height: 25px;
    border-radius: 25px;
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
    border-radius: 25px;
    margin-left: 10%;
    margin-right: 10%;
    margin-top:5%;
    margin-bottom: 10%;
  }
  .fonts{
    text-align: center
  }
  .fonts a{
    color:rgb(117, 116, 116);
    text-decoration-line: none
  }
</style>