<template>
  <div>
    <icon name="camera" scale="2">
    </icon>
      <input type="file" accept="image/*" capture="camera">
  </div>
</template>


<script>
import 'vue-awesome/icons/camera'
import 'vue-awesome/icons/ban'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  }
}
</script>

<style scoped>

</style>