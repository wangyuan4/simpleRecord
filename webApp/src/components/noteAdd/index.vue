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
  </div>
</template>

<script>
import { Masker } from 'vux'
import axios from 'axios'

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
        target: 'scan',
        img: require('@/assets/note-add-upload.png')
      }]
    }
  },
  methods: {
    onClickMask (item) {
      item.target === 'img'
      ? this.$refs.photo.dispatchEvent(new MouseEvent('click'))
      : this.$router.push(`/note/add/${item.target}`)
    },
    saveImg (e) {
      const file = e.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 添加请求头
      axios.post(`/api/savemedia`, param, config)
      .then(res => {
        console.log(res)
      })
    }
  },
  components: {
    Masker
  }
}
</script>

<style scoped>
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
</style>