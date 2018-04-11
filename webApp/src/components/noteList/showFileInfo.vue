<template>
  <div>
    <x-header class="head">{{item.title}}
      <i slot="right" class='fa fa-edit' style="font-size:20px;color:white" @click="editFile"></i>
    </x-header>
    <div class="md" v-if="item.fileType==='md'">
      md
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
      item: {}
    }
  },
  mounted () {
    this.item = this.$route.params.item
    if (this.item.fileType === 'html') {
      setTimeout(() => {
        this.$refs.htmlContent.innerHTML = this.item.content
      }, 50)
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
    }
  }
}
</script>

<style scoped>
.head{
  margin-bottom: 10px
}
</style>