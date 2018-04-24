<template>
  <div class="bg">
    <button class="btn" @click="jumpToLogin">探索「简记」</button>
  </div>
</template>


<script>
import { Group, Cell, CellBox, XHeader, InlineCalendar } from 'vux'
export default {
  components: {
    Group,
    Cell,
    CellBox,
    XHeader,
    InlineCalendar
  },
  methods: {
    jumpToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.bg{
    background-image: url('../assets/begin.png');
    width: 100%;
    height: 620px;
}
.btn{
    position: relative;
    margin: 460px 23% auto 23%;
    width: 190px;
    height: 48px;
    border-radius: 25px;
    background-color: #021a4d;
    opacity: 0.7;
    color: white;
    border: none;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
}
</style>