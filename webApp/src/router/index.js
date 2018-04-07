import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import App from '../App'
import NoteAdd from '@/components/noteAdd'
import NoteList from '@/components/noteList'

import NoteAddInput from '@/components/noteAddInput'
import NoteAddMakdown from '@/components/noteAddMarkdown'
import NoteAddScan from '@/components/noteAddScan'
import NoteAddVoice from '@/components/noteAddVoice'
import Mine from '@/components/Mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
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
          path: '/note/add/input',
          name: 'noteAddInput',
          component: NoteAddInput
        }, {
          path: '/note/add/markdown',
          name: 'noteAddMakdown',
          component: NoteAddMakdown
        }, {
          path: '/note/add/scan',
          name: 'NoteAddScan',
          component: NoteAddScan
        }, {
          path: '/note/add/voice',
          name: 'NoteAddVoice',
          component: NoteAddVoice
        }, {
          path: '/me',
          name: 'mine',
          component: Mine
        }
      ]
    }
  ]
})
