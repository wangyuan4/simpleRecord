<template>
  <div>
    <x-header class="head"  :left-options="{preventGoBack: true}" @on-click-back="backToList">{{item.title}}
      <i slot="right" class='fa fa-edit' style="font-size:20px;color:white" @click="editFile" v-if="!item.isDiff && item.fileType !== 'img'"></i>
      <i slot="right" class='fa fa-save' style="font-size:20px;color:white" @click="saveFile" v-if="item.isDiff"></i>
    </x-header>
    <div class="md"  v-if="item.isDiff && item.fileType === 'md'">
      <div v-for="(el,index) in diffRes" :key="index">
        <div v-if="!el.removed && !el.added">{{el.value}}</div>
        <div v-if="el.removed">
          <span class="opt" @click="() => saveEver(index)">保留之前的更改</span>
          <span class="opt" @click="() => saveCur(index)">保留传入的更改</span>
          <span class="opt" @click="() => saveBoth(index)">保留双方更改</span>
        </div>
        <div v-if="el.removed" class="remove">-  {{el.value}}</div>
        <div v-if="el.added" class="add">+  {{el.value}}</div>
      </div>
    </div>
    <div  class="html" v-if="item.fileType==='html'" ref="htmlContent">
      <div v-for="(el,index) in diffRes" :key="index">
        <div v-if="el.removed && item.isDiff">
          <span class="opt" @click="() => saveEver(index)">保留之前的更改</span>
          <span class="opt" @click="() => saveCur(index)">保留传入的更改</span>
          <span class="opt" @click="() => saveBoth(index)">保留双方更改</span> 
        </div>
      </div>
      <div ref="diffHtml">
      </div>
    </div>
    <div class="img" v-if="item.fileType==='img'">
      <img :src="item.content" width="375px" height="475px">
    </div>
  </div>
</template>

<script>
import { Group, Cell, CellBox, XHeader, InlineCalendar, AlertModule } from 'vux'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
export default {
  components: {
    Group,
    Cell,
    CellBox,
    XHeader,
    InlineCalendar
  },
  data () {
    return {
      item: {},
      diffRes: []
    }
  },
  created () {
    this.item = this.$route.params.item
    this.diffRes = this.item.diffRes
  },
  mounted () {
    if (this.item.fileType === 'html' && !this.item.isDiff) {
      this.$refs.htmlContent.innerHTML = this.item.content
    } else if (this.item.fileType === 'html' && this.item.isDiff) {
      this.renderHtml()
    }
  },
  methods: {
    backToList () {
      this.$router.push({
        path: this.item.id === '' ? '/note/add' : '/note/list'
      })
    },
    renderHtml () {
      console.log(this.diffRes)
      this.diffRes.map((el, index) => {
        el.removed && this.appendDiv(index, 0)
        el.added && this.appendDiv(index, 1)
        !el.removed && !el.added && this.appendDiv(index, 2)
      })
    },
    appendDiv (index, status) {
      const div = document.createElement('div')
      if (status === 2) {
        div.innerHTML = this.diffRes[index].value
      } else {
        const mark = status ? '+  ' : '-  '
        div.innerHTML = mark + this.diffRes[index].value
        div.className = status ? 'added' : 'removed'
        div.style = status ? 'color: rgb(1, 78, 1)' : 'color: rgb(150, 4, 4)'
      }
      this.$refs.diffHtml.appendChild(div)
    },
    editFile () {
      let name = ''
      switch (this.item.fileType) {
        case 'md': name = 'noteAddMakdown'
          break
        case 'html': name = 'noteAddInput'
          break
        default: name = 'noteAddMakdown'
          break
      }
      const opt = {
        name,
        params: {
          fileId: this.item.id,
          fileAuth: this.item.fileAuth
        }
      }
      this.$router.push(opt)
    },
    saveEver (index) {
      this.$refs.diffHtml.innerHTML = ''
      this.diffRes[index].removed = false
      this.diffRes.splice(++index, 1)
      this.renderHtml()
    },
    saveCur (index) {
      this.$refs.diffHtml.innerHTML = ''
      this.diffRes[index + 1].added = false
      this.diffRes.splice(index, 1)
      this.renderHtml()
    },
    saveBoth (index) {
      this.$refs.diffHtml.innerHTML = ''
      this.diffRes[index].removed = false
      this.diffRes[++index].added = false
      this.renderHtml()
    },
    saveFile () {
      let content = ''
      let haveDiff = false
      this.diffRes.forEach(el => {
        if (el.removed || el.added) {
          AlertModule.show({
            content: '还存在冲突，请解决冲突后再提交！'
          })
          haveDiff = true
        } else {
          content = content + el.value
        }
      })
      if (!haveDiff) {
        this.save(content)
        this.$refs.htmlContent.innerHTML = content
      }
    },
    save (content) {
      const body = {
        userId: this.userId,
        fileId: this.item.id,
        ...this.item,
        content: content
      }
      this.item.fileAuth === 0
      ? AlertModule.show({
        content: '您只有读取权限，无法提交修改！'
      })
      : axios
        .post(`/api/savefile`, body)
        .then((res) => {
          res.data.status && this.$router.push({
            path: '/note/list'
          })
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.head{
  margin-bottom: 10px
}
.remove{
  color: rgb(150, 4, 4)
}
.add{
  color: rgb(1, 78, 1)
}
.opt{
  font-size: 14px;
  color: rgb(2, 9, 116);
  margin-left: 6px;
  text-decoration-line: underline
}
</style>