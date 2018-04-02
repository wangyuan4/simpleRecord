import Vue from 'vue'
import Router from 'vue-router'
import NoteAdd from '@/components/noteAdd'
import NoteList from '@/components/noteList'

import NoteAddInput from '@/components/noteAddInput'
import NoteAddScan from '@/components/noteAddScan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/note/add/scan',
      name: 'NoteAddScan',
      component: NoteAddScan
    }
  ]
})
