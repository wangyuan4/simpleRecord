<template>
  <div>
    <x-header><span slot="right">回退版本</span><span slot="right" class="option-line">|</span><span slot="right" @click="saveFile">保存</span></x-header>
    <x-input class="input" placeholder="标题" v-model="title"></x-input>
    <mavon-editor
      v-model="value"
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
        :right-text="确定"
        title="请选择文件保存分类:"
        :show-bottom-border="false"
        @on-click-left="show = false"
        @on-click-right="show = false"></popup-header>
        <group gutter="0">
          <radio :options="options"></radio>
        </group>
      </popup>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import {mavonEditor} from 'mavon-editor'
import { XInput, XHeader, PopupHeader, Popup, Group, Radio } from 'vux'
import axios from 'axios'

export default {
  data () {
    return {
      value: '',
      title: '',
      fileId: '',
      options: ['生活文件', '工作文件'],
      show: false
    }
  },
  components: {
    mavonEditor,
    XInput,
    XHeader,
    PopupHeader,
    Popup,
    Group,
    Radio
  },
  methods: {
    saveFile () {
      const body = {
        id: global.user.id,
        title: this.title === '' ? '无标题' : this.title,
        content: this.value,
        type: 0,
        fileType: 'md',
        fileId: this.fileId
      }
      axios
        .post(`${global.IP}/saveFile`, body)
        .then((res) => {
          res.data && this.$router.push({path: '/note/list'})
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style  scoped>
.option-line{
  margin-left:4px;
  margin-right: 4px
}
</style>