<template>
  <div>
    <x-header><span slot="right">回退版本</span><span slot="right" class="option-line">|</span><span slot="right" @click="show=true">保存</span></x-header>
    <x-input class="input" placeholder="标题" v-model="item.title"></x-input>
    <mavon-editor
      v-model="item.content"
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
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import {mavonEditor} from 'mavon-editor'
import { XInput, XHeader, PopupHeader, Popup, Group, Radio } from 'vux'
import { saveFiles } from '../../utils/comAjax'

export default {
  props: ['item'],
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
      opt: 0
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
  created () {
    console.log(this.$router.params)
    this.item = this.$router.params.item || {
      title: '',
      content: ''
    }
  },
  methods: {
    saveFile () {
      this.show = !this.show
      saveFiles({
        id: global.user.id,
        title: this.title === '' ? '无标题' : this.title,
        content: this.content,
        type: this.opt,
        fileType: this.fileType,
        fileId: this.fileId
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