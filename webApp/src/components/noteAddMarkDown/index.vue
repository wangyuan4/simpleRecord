<template>
  <div>
    <x-header><a slot="right">图标</a></x-header>
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
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import {mavonEditor} from 'mavon-editor'
import { XInput, XHeader } from 'vux'
import axios from 'axios'

export default {
  data () {
    return {
      value: '',
      title: ''
    }
  },
  components: {
    mavonEditor,
    XInput,
    XHeader
  },
  method: {
    saveFile (title, content, fileId) {
      console.log(fileId)
      const body = {
        id: global.user.id,
        title,
        content,
        type: 0,
        fileId
      }
      axios
        .post(`${global.IP}/addFile`, body)
        .then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>