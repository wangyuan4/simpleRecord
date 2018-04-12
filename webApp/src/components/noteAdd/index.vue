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
          <input type="file" accept="image/*" capture="camera" v-if="false" />
        </div>
        <div slot="content" class="m-title" v-if="item.isInput">
          {{item.title}}
          <br/>
          <span class="m-desc">{{item.desc}}</span>
          <input type="file" accept="image/*" v-if="false" />
        </div>
      </masker>
    </div>
  </div>
</template>

<script>
import { Masker } from 'vux'
export default {
  data () {
    return {
      list: [{
        title: '新建笔记',
        desc: '输入文字以创建笔记',
        target: 'input',
        isInput: false,
        img: require('@/assets/note-add-input.jpg')
      }, {
        title: '新建MarkDown',
        desc: '以markdown的形式创建笔记',
        target: 'markdown',
        isInput: false,
        img: require('@/assets/note-add-input.jpg')
      }, {
        title: '新建语音笔记',
        desc: '随时随地记录灵感',
        target: 'voice',
        isInput: false,
        img: require('@/assets/note-add-input.jpg')
      }, {
        title: '文档扫描',
        desc: '使用摄像头对文档进行扫描',
        target: 'scan',
        isInput: true,
        img: require('@/assets/note-add-scan.jpg')
      }, {
        title: '上传图片',
        desc: '上传图片以创建笔记',
        target: 'uploadImg',
        isInput: true,
        img: require('@/assets/note-add-upload.png')
      }]
    }
  },
  methods: {
    onClickMask (item) {
      !item.isInput && this.$router.push(`/note/add/${item.target}`)
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