<template>
  <div>
    <x-header class="head">{{item.title}}
      <i slot="right" class='fa fa-edit' style="font-size:20px;color:white" @click="editFile" v-if="!item.isDiff"></i>
      <i slot="right" class='fa fa-save' style="font-size:20px;color:white" @click="saveFile" v-if="item.isDiff"></i>
    </x-header>
    <div class="md"  v-if="item.isDiff">
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
      {{item.content}}
    </div>
    <div class="img" v-if="item.fileType==='img'">
      img
    </div>
    <div class="voice" v-if="item.fileType==='voice'">
      voice
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
    if (this.item.fileType === 'html') {
      this.$refs.htmlContent.innerHTML = this.item.content
    }
  },
  methods: {
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
          item: this.item
        }
      }
      this.$router.push(opt)
    },
    saveEver (index) {
      this.diffRes[index].removed = false
      this.diffRes.splice(++index, 1)
    },
    saveCur (index) {
      this.diffRes.splice(index, 1)
      this.diffRes[index].added = false
    },
    saveBoth (index) {
      this.diffRes[index].removed = false
      this.diffRes[++index].added = false
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
      !haveDiff && this.save(content)
    },
    save (content) {
      // userId,title,content,type,fileType,fileId
      const body = {
        userId: this.userId,
        fileId: this.item.id,
        ...this.item,
        content: content
      }
      axios
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