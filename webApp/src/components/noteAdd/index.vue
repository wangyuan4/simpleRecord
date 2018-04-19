<template>
  <div>
    <div style="margin: 10px" v-for="(item, index) in list" :key="index">
      <masker style="border-radius: 2px;" @click.native="onClickMask(item)">
        <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
        <div slot="content" class="m-title" v-if="!item.isInput">
          {{item.title}}
          <br/>
          <span class="m-desc">{{item.desc}}</span>
        </div>
        <div slot="content" class="m-title" v-if="item.isInput">
          {{item.title}}
          <br/>
          <span class="m-desc">{{item.desc}}</span>
        </div>
        <div slot="content" class="m-title" v-if="item.isInput">
          {{item.title}}
          <br/>
          <span class="m-desc">{{item.desc}}</span>
        </div>
      </masker>
    </div>
    <input type="file" accept="image/*" ref="photo" @change="saveImg" style="width:0px;height:0px"/>
    <x-dialog v-model="show" class="dialog-demo">
      <div style="margin:10% 5%">
        <div class="dialog-title"><span>图片信息</span></div>
        <x-input title="标题" v-model="title" class="input" placeholder="请填写图片标题" style="font-size:16px" ></x-input>
        <group gutter="0">
          <radio :options="options" v-model="opt" class="radio" style="font-size:16px"></radio>
        </group>
      </div>
      <div class="btn">
        <span @click="save" style="margin-left:40px">确定</span>
        <span @click="show=false;herf=''">取消</span>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { Masker, XDialog, XInput, Group, Radio } from 'vux'
import axios from 'axios'
import { getItem } from '../../utils/storage'

export default {
  data () {
    return {
      list: [{
        title: '新建笔记',
        desc: '输入文字以创建笔记',
        target: 'input',
        img: require('@/assets/note-add-input.jpg')
      }, {
        title: '新建MarkDown',
        desc: '以markdown的形式创建笔记',
        target: 'markdown',
        img: require('@/assets/note-add-input.jpg')
      }, {
        title: '新建语音笔记',
        desc: '随时随地记录灵感',
        target: 'voice',
        img: require('@/assets/note-add-input.jpg')
      }, {
        title: '新建图片文件',
        desc: '拍照或上传图片以创建笔记',
        target: 'img',
        img: require('@/assets/note-add-scan.jpg')
      }, {
        title: '新建手写笔记',
        desc: '使用画笔创建手写笔记',
        target: 'canvas',
        img: require('@/assets/note-add-upload.png')
      }],
      options: [{
        key: 0,
        value: '工作文件'
      }, {
        key: 1,
        value: '生活文件'
      }],
      show: false,
      opt: -1,
      title: '',
      file: {},
      userId: getItem('user').id
    }
  },
  methods: {
    onClickMask (item) {
      item.target === 'img'
      ? this.$refs.photo.dispatchEvent(new MouseEvent('click'))
      : this.$router.push(`/note/add/${item.target}`)
    },
    saveImg (e) {
      this.file = e.target.files[0]
      this.show = true
    },
    save () {
      const reader = new FileReader()
      const _this = this
      reader.onloadend = function () {
        const dataURL = reader.result
        const fileName = _this.title === '' ? `图片_${Math.round(new Date().getTime() / 1000)}` : _this.title
        const otherinfo = JSON.stringify({
          userId: _this.userId,
          title: fileName,
          type: _this.opt,
          fileType: 'img'
        })
        console.log(otherinfo)
        let param = new FormData() // 创建form对象
        param.append('file', dataURL) // 通过append向form对象添加数据
        param.append('otherinfo', otherinfo) // 添加form表单中其他数据
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        // 添加请求头
        axios.post(`/api/savemedia`, param, config)
        .then(res => {
          res.data && _this.$router.push('/note/list')
        })
      }
      reader.readAsDataURL(this.file) // 读出 base64
    }
  },
  components: {
    Masker,
    XDialog,
    XInput,
    Group,
    Radio
  }
}
</script>

<style  scoped lang='less'>
@import '~vux/src/styles/close';
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-desc {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
.dialog-title {
  text-align: left;
  margin: 30px 20px;
  font-size: 20px;
}
.radio {
  text-align: left
}
.btn {
  text-align:right;
  margin-right:30px;
  margin-bottom:30px;
}
.btn span{
  margin-left: 30px;
}
</style>