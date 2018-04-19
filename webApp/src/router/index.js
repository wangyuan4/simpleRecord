import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import App from '../App'
import NoteAdd from '@/components/noteAdd'
import NoteList from '@/components/noteList'
import NoteShow from '@/components/noteList/showFileInfo'

import NoteAddInput from '@/components/noteAddInput'
import NoteAddMakdown from '@/components/noteAddMarkdown'
import NoteAddCanvas from '@/components/noteAddCanvas'
import Mine from '@/components/mine/index'
import Info from '@/components/mine/info'
import Friends from '@/components/mine/friends'
import QRCode from '@/components/mine/qrcode'
import CPwd from '@/components/mine/cpwd'
import NFriends from '@/components/mine/newfriend'
import NoteAddVoice from '@/components/noteAddVoice'
import ShowVoice from '@/components/noteAddVoice/showVoice'
import Calender from '@/components/mine/calender'
import ChooseFriend from '@/components/mine/chooseFriend'
import QrcodeScanner from '@/components/mine/qrcodeScanner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/app',
      name: 'app',
      component: App,
      children: [
        {
          path: '/note/add',
          name: 'noteAdd',
          component: NoteAdd
        }, {
          path: '/note/list',
          name: 'noteList',
          component: NoteList
        }, {
          path: '/note/show',
          name: 'noteShow',
          component: NoteShow
        }, {
          path: '/note/add/input',
          name: 'noteAddInput',
          component: NoteAddInput
        }, {
          path: '/note/add/markdown',
          name: 'noteAddMakdown',
          component: NoteAddMakdown
        }, {
          path: '/note/add/canvas',
          name: 'NoteAddCanvas',
          component: NoteAddCanvas
        }, {
          path: '/note/add/voice',
          name: 'NoteAddVoice',
          component: NoteAddVoice
        }, {
          path: '/note/showvoice',
          name: 'ShowVoice',
          component: ShowVoice
        }, {
          path: '/mine',
          name: 'mine',
          component: Mine
        }, {
          path: '/mine/info',
          name: 'info',
          component: Info
        }, {
          path: '/mine/friends',
          name: 'friends',
          component: Friends
        }, {
          path: '/mine/qrcode',
          name: 'qrcode',
          component: QRCode
        }, {
          path: '/mine/changePwd',
          name: 'changepwd',
          component: CPwd
        }, {
          path: '/mine/newfriend',
          name: 'newfriend',
          component: NFriends
        }, {
          path: '/mine/calender',
          name: 'calender',
          component: Calender
        }, {
          path: '/mine/choosefriend',
          name: 'choosefriend',
          component: ChooseFriend
        }, {
          path: '/mine/qrcode/scanner',
          name: 'qrcodeScanner',
          component: QrcodeScanner
        }
      ]
    }
  ]
})
