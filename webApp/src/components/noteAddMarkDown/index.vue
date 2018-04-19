<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="backToList">{{item.title}}<span slot="right" v-if="multiVer" @click="show1=true">回退版本</span><span slot="right" class="option-line" v-if="multiVer">|</span><span slot="right" @click="save">保存</span></x-header>
    <x-input class="input" placeholder="标题" v-model="item.title"></x-input>
    <mavon-editor
      class="md"
      v-model="item.content"
      @change="change=true"
      @save="saveFile"
      :toolbarsFlag="true"
      :toolbars="{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: false, // 引用
        ol: false, // 有序列表
        ul: false, // 无序列表
        link: false, // 链接
        imagelink: true, // 图片链接
        code: false, // code
        table: false, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: false, // 预览
      }"
    />
    <popup v-model="show">
      <popup-header
      right-text="确定"
      title="请选择文件保存分类:"
      :show-bottom-border="true"
      @on-click-left="show = false"
      @on-click-right="saveFile"></popup-header>
      <group gutter="0">
        <radio :options="options" v-model="opt"></radio>
      </group>
    </popup>
    <x-dialog v-model="show1" class="dialog-demo">
        <div style="padding:15px;" v-for="(item,index) in everVer" :key="index">
          <cell :title="item.month+'月'+item.day+'日'+item.time" @click.native="() => retVer(index)" is-link></cell>
        </div>
        <div @click="show1=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import {mavonEditor} from 'mavon-editor'
import { XInput, XHeader, PopupHeader, Popup, Group, Radio, AlertModule, XDialog, Cell } from 'vux'
import axios from 'axios'
import { getItem } from '../../utils/storage'
import { fileInfoTran } from '../../utils/dataTran'

export default {
  data () {
    return {
      item: {},
      options: [{
        key: 0,
        value: '工作文件'
      }, {
        key: 1,
        value: '生活文件'
      }],
      show: false,
      show1: false,
      opt: 0,
      userId: getItem('user').id,
      multiVer: false,
      everVer: [],
      change: false
    }
  },
  components: {
    mavonEditor,
    XInput,
    XHeader,
    PopupHeader,
    Popup,
    Group,
    Radio,
    XDialog,
    Cell
  },
  mounted () {
    const { fileId, fileAuth } = this.$route.params
    !fileId
    ? this.item = {
      title: '',
      content: '',
      type: 0,
      fileType: 'md',
      id: ''
    }
    : axios.get(`/api/getfileinfo`, {
      params: {
        fileId
      }})
      .then((res) => {
        if (res.data.status) {
          const data = fileInfoTran(res.data.list)
          this.item = {
            ...data[0],
            fileAuth
          }
          if (res.data.list.length > 1) {
            this.multiVer = true
            this.everVer = data.slice(1)
          }
        } else {
          AlertModule.show({
            content: res.data.msg
          })
        }
      }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    backToList () {
      this.$router.push({
        path: this.item.id === '' ? '/note/add' : '/note/list'
      })
    },
    save () {
      this.item.id === '' ? this.show = true : this.saveFile()
    },
    saveFile () {
      this.show = false
      const body = {
        ...this.item,
        userId: this.userId,
        fileId: this.item.id,
        title: this.item.title === '' ? '无标题' : this.item.title,
        type: this.item.id === '' ? this.opt : this.item.type
      }
      this.change
      ? (this.item.fileAuth === 0
      ? AlertModule.show({
        content: '您只有读取权限，无法提交修改！'
      })
      : axios
        .post(`/api/savefile`, body)
        .then((res) => {
          const opt = res.data.status && res.data.isDiff ? {
            name: 'noteShow',
            params: {
              item: fileInfoTran([res.data.fileInfo], true, res.data.isDiff)
            }
          } : {
            path: '/note/list'
          }
          this.$router.push(opt)
        }).catch((error) => {
          console.log(error)
        })) : this.$router.push({
          path: '/note/list'
        })
    },
    retVer (index) {
      this.show1 = false
      this.item = this.everVer[index]
    }
  }
}
</script>

<style  scoped lang='less'>
@import '~vux/src/styles/close';
.option-line{
  margin-left:4px;
  margin-right: 4px
}
.md{
  min-height:520px;
  z-index: 100;
}
</style>