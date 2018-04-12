<template>
  <div>
    <x-header class="head">{{item.title}}
      <i slot="right" class='fa fa-edit' style="font-size:20px;color:white" @click="editFile"></i>
    </x-header>
    <div class="md">
      <div v-for="(el,index) in diffRes" :key="index">
        <div v-if="!el.removed && !el.added">{{el.value}}</div>
        <div v-if="index===1">
          <span class="opt">保留之前的更改</span>
          <span class="opt">保留传入的更改</span>
          <span class="opt">保留双方更改</span>
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
import { Group, Cell, CellBox, XHeader, InlineCalendar } from 'vux'
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
  mounted () {
    this.item = this.$route.params.item
    if (this.item.fileType === 'html') {
      setTimeout(() => {
        this.$refs.htmlContent.innerHTML = this.item.content
      }, 50)
    }
    this.diffRes = this.item.content
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
    }
  }
}
</script>

<style scoped>
.head{
  margin-bottom: 10px
}
.remove{
  color: rgb(116, 4, 4)
}
.add{
  color: rgb(2, 49, 2)
}
.opt{
  font-size: 14px;
  color: rgb(2, 9, 116);
  margin-left: 6px;
  text-decoration-line: underline
}
</style>