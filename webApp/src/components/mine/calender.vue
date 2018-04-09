<template>
  <div>
    <x-header>日历</x-header>
    <inline-calendar
			ref="calendar"
			class="inline-calendar-demo"
			start-date="2016-04-01"
			end-date="2018-05-30"
			>
  </inline-calendar>
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
  }
}
</script>

<style scoped>
.inline-calendar-demo {
  background: rgba(255,255,255,0.9);
}
</style>