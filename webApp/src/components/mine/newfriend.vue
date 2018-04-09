<template>
  <div>
		<x-header>新朋友<span slot="right" @click="add">扫二维码</span></x-header>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top top="46px"
      @on-submit="onSubmit"
      ref="search">
    </search>
		<div class="title">好友通知</div>
		<group style="margin-top:20px">
			<cell title="wang" class="list-style" value="已同意"></cell>
			<cell title="yuan" class="list-style" value="已同意"></cell>
    </group>
  </div>
</template>


<script>
import Icon from 'vue-awesome/components/Icon'
import { Group, Cell, CellBox, Search, XDialog, XHeader } from 'vux'
export default {
  components: {
    Icon,
    Group,
    Cell,
    CellBox,
    Search,
    XDialog,
    XHeader
  },
  method: {
    add () {

    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.list-style{
  height:40px;
  font-size:18px
}
.title{
	color: rgb(131, 130, 130);
	height: 10px;
	text-align: center;
	font-size: 14px;
	margin-top: 4px
}
</style>
    