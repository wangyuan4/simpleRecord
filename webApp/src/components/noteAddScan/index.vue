<template>
  <div class="hello">
    <x-header>手写笔记<span slot="right" @click="clear">清除</span><span slot="right" class="option-line">|</span><span slot="right" @click="save">保存</span></x-header>
    <x-input class="input" placeholder="标题" v-model="title"></x-input>
    <canvas id="canvas" width="375px" height="525px">Canvas画板</canvas>
   <!-- <img v-bind:src="url" alt=""> -->
   <popup v-model="show">
      <popup-header
      right-text="确定"
      title="请选择文件保存分类:"
      :show-bottom-border="true"
      @on-click-left="show = false"
      @on-click-right="save"></popup-header>
      <group gutter="0">
        <radio :options="options" v-model="opt"></radio>
      </group>
    </popup>
  </div>
 
</template>

<script>
import { XInput, XHeader, PopupHeader, Popup, Group, Radio, AlertModule } from 'vux'
import { getItem } from '../../utils/storage'
var draw
var preHandler = function (e) {
  e.preventDefault()
}
class Draw {
  constructor (el) {
    this.el = el
    this.canvas = document.getElementById(this.el)
    this.cxt = this.canvas.getContext('2d')
    this.stage_info = this.canvas.getBoundingClientRect()
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    }
  }
  init (btn) {
    var that = this
    this.canvas.addEventListener('touchstart', function (event) {
      document.addEventListener('touchstart', preHandler, false)
      that.drawBegin(event)
    })
    this.canvas.addEventListener('touchend', function (event) {
      document.addEventListener('touchend', preHandler, false)
      that.drawEnd()
    })
    this.clear(btn)
  }
  drawBegin (e) {
    var that = this
    window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
    this.cxt.strokeStyle = '#000'
    this.cxt.beginPath()
    this.cxt.moveTo(
        e.changedTouches[0].clientX - this.stage_info.left,
        e.changedTouches[0].clientY - this.stage_info.top
    )
    this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
    this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
    this.canvas.addEventListener('touchmove', function () {
      that.drawing(event)
    })
  }
  drawing (e) {
    this.cxt.lineTo(
        e.changedTouches[0].clientX - this.stage_info.left,
        e.changedTouches[0].clientY - this.stage_info.top
    )
    this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
    this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
    this.cxt.stroke()
  }
  drawEnd () {
    document.removeEventListener('touchstart', preHandler, false)
    document.removeEventListener('touchend', preHandler, false)
    document.removeEventListener('touchmove', preHandler, false)
    // canvas.ontouchmove = canvas.ontouchend = null
  }
  clear (btn) {
    this.cxt.clearRect(0, 0, 300, 600)
  }
  save () {
    return this.canvas.toDataURL('image/png')
  }
}

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      val: true,
      url: '',
      title: '',
      options: [{
        key: 0,
        value: '工作文件'
      }, {
        key: 1,
        value: '生活文件'
      }],
      show: false,
      opt: 0,
      userId: getItem('user').id
    }
  },
  components: {
    XInput,
    XHeader,
    PopupHeader,
    Popup,
    Group,
    Radio,
    AlertModule
  },
  mounted () {
    draw = new Draw('canvas')
    draw.init()
  },
  methods: {
    clear: function () {
      draw.clear()
    },
    save: function () {
      var data = draw.save()
      this.url = data
      console.log(data)
    },
    mutate (word) {
      this.$emit('input', word)
    }
  }
}
</script>
 <!-- Add "scoped" attribute to limit CSS to this component only --> 
 <style scoped> 
 .hello{
   width: 100%;
   height: 100%;
 }
 h1, h2 { font-weight: normal; } 
 ul { list-style-type: none; padding: 0; } 
 li { display: inline-block; margin: 0 10px; } 
 a { color: #42b983; } 
 #canvas { background: white; cursor: default; } 
 #keyword-box { margin: 10px 0; }
</style>