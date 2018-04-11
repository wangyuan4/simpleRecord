<template>
  <div>
    <qrcode-reader
      @decode="onDecode"
    >
      <div>{{value}}</div>
    </qrcode-reader>
  </div>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'
export default {
  data () {
    return {
      value: ''
    }
  },
  components: { QrcodeReader },
  methods: {
    onDecode (content) {
      console.log(content)
    }
  }
}
</script>

<style scoped>

</style>