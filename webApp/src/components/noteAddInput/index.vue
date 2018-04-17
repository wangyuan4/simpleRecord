<template>
  <div>   
    <x-header>{{item.title}}<span slot="right" v-if="multiVer" @click="show1=true">回退版本</span><span slot="right" class="option-line" v-if="multiVer">|</span><span slot="right" @click="save">保存</span></x-header>
    <x-input class="input" placeholder="标题" v-model="item.title"></x-input>
    <vue-html5-editor :content="item.content" :height='450' @change="change=true" :z-index="100"></vue-html5-editor>
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
          <span @click="() => retVer(index)">{{item.month}}月{{item.day}}日{{item.time}}</span>
        </div>
        <div @click="show1=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VueHtml5Editor from 'vue-html5-editor'
import { XInput, XHeader, PopupHeader, Popup, Group, Radio, AlertModule, XDialog } from 'vux'
import axios from 'axios'
import { getItem } from '../../utils/storage'
import { fileInfoTran } from '../../utils/dataTran'

export default {
  name: 'h5Editor',
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
    XInput,
    XHeader,
    PopupHeader,
    Popup,
    Group,
    Radio,
    XDialog
  },
  mounted () {
    const { fileId } = this.$route.params
    console.log(fileId)
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
          this.item = data[0]
          if (res.data.list.length > 1) {
            this.multiVer = true
            this.everVer = data.slice(1)
          }
          console.log(this.everVer)
        } else {
          AlertModule.show({
            content: res.data.msg
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    console.log(this.item)
  },
  methods: {
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
      this.change ? axios
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
        }) : this.$router.push({
          path: '/note/list'
        })
    },
    retVer (index) {
      this.item = this.everVer[index]
    }
  }
}
Vue.use(VueHtml5Editor, {
  // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效 // global component name
  name: 'vue-html5-editor',
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  // if set true,will append module name to toolbar after icon
  showModuleName: false,
  // 自定义各个图标的class，默认使用的是font-awesome提供的图标
  // custom icon class of built-in modules,default using font-awesome
  icons: {
    text: 'fa fa-pencil',
    color: 'fa fa-paint-brush',
    font: 'fa fa-font',
    align: 'fa fa-align-justify',
    list: 'fa fa-list',
    link: 'fa fa-chain',
    unlink: 'fa fa-chain-broken',
    tabulation: 'fa fa-table',
    image: 'fa fa-file-image-o',
    hr: 'fa fa-minus',
    eraser: 'fa fa-eraser',
    undo: 'fa-undo fa',
    'full-screen': 'fa fa-arrows-alt',
    info: 'fa fa-info'
  },
  // 配置图片模块
  // config image module
  image: {
      // 文件最大体积，单位字节  max file size
    sizeLimit: 512 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: null,
      headers: {},
      params: {},
      fieldName: {}
    },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
    // set null to disable compression
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler (responseText) {
      // default accept json data like  {ok:false,msg:'unexpected'} or {ok:true,data:'image url'}
      var json = JSON.parse(responseText)
      if (!json.ok) {
        alert(json.msg)
      } else {
        return json.data
      }
    }
  },
  // 语言，内建的有英文（en-us）和中文（zh-cn）
  // default en-us, en-us and zh-cn are built-in
  language: 'zh-cn',
  // 自定义语言
  i18n: {
    // specify your language here
    'zh-cn': {
      'align': '对齐方式',
      'image': '图片',
      'list': '列表',
      'link': '链接',
      'unlink': '去除链接',
      'table': '表格',
      'font': '文字',
      'full screen': '全屏',
      'text': '排版',
      'eraser': '格式清除',
      'info': '关于',
      'color': '颜色',
      'please enter a url': '请输入地址',
      'create link': '创建链接',
      'bold': '加粗',
      'italic': '倾斜',
      'underline': '下划线',
      'strike through': '删除线',
      'subscript': '上标',
      'superscript': '下标',
      'heading': '标题',
      'font name': '字体',
      'font size': '文字大小',
      'left justify': '左对齐',
      'center justify': '居中',
      'right justify': '右对齐',
      'ordered list': '有序列表',
      'unordered list': '无序列表',
      'fore color': '前景色',
      'background color': '背景色',
      'row count': '行数',
      'column count': '列数',
      'save': '确定',
      'upload': '上传',
      'progress': '进度',
      'unknown': '未知',
      'please wait': '请稍等',
      'error': '错误',
      'abort': '中断',
      'reset': '重置'
    }
  },
  // 隐藏不想要显示出来的模块
  // the modules you don't want
  hiddenModules: [],
  // 自定义要显示的模块，并控制顺序
  // keep only the modules you want and customize the order.
  // can be used with hiddenModules together
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo',
    'full-screen',
    'info'
  ],
  // 扩展模块，具体可以参考examples或查看源码
  // extended modules
  modules: {
    // omit,reference to source code of build-in modules
  }
})
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
