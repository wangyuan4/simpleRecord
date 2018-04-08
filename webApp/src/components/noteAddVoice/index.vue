<template>
  <div>
    <div class="animate-group">
      <vue-loading v-if="recordIng" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
      <vue-loading v-if="!recordIng" type="beat" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
    <box gap="10px 10px"></box>
    <div class="btn-group">
      <x-button class="record-btn" v-if="!recordIng" @click.native="startRecording" :gradients="['#1D62F0', '#19D5FD']">开始录制</x-button>
      <x-button class="record-btn" v-if="recordIng" @click.native="stopRecording" :gradients="['#1D62F0', '#19D5FD']">停止录制</x-button>
    </div>
  </div>
</template>

<script>
import Recorder from '@/../static/recorder.browser.min.js'
import vueLoading from 'vue-loading-template'
import { XButton, Box } from 'vux'

let audioContext
let recorder
export default {
  components: {
    XButton,
    vueLoading,
    Box
  },
  mounted () {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      window.URL = window.URL || window.webkitURL
      audioContext = new AudioContext()
      console.log('Audio context set up.')
      console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'))
    } catch (e) {
      alert('No web audio support in this browser!')
    }
    navigator.getUserMedia({
      audio: true
    }, this.startUserMedia, function (e) {
      console.log('No live audio input: ' + e)
    })
  },
  data () {
    return {
      recordIng: false
    }
  },
  methods: {
    startUserMedia (stream) {
      var input = audioContext.createMediaStreamSource(stream)
      console.log('Media stream created.')
      input.connect(audioContext.destination)
      console.log('Input connected to audio context destination.')
      recorder = new Recorder(input)
      console.log('Recorder initialised.')
    },
    startRecording (button) {
      console.log('startRecording', recorder)
      recorder && recorder.record()
      this.recordIng = true
      console.log('Recording...')
    },
    stopRecording (button) {
      recorder && recorder.stop()
      this.recordIng = false
      this.createDownloadLink()
      // recorder.clear()
    },
    createDownloadLink () {
      console.log(recorder)
      recorder && recorder.exportWAV(function (blob) {
        console.log('blob get --->', blob)
        var url = URL.createObjectURL(blob)
        var li = document.createElement('li')
        var au = document.createElement('audio')
        var hf = document.createElement('a')
        au.controls = true
        au.src = url
        hf.href = url
        hf.download = new Date().toISOString() + '.wav'
        hf.innerHTML = hf.download
        li.appendChild(au)
        li.appendChild(hf)
        hf.click()
        // recordingslist && recordingslist.appendChild(li)
      })
    }
  }
}
</script>

<style scoped>
.animate-group {
  margin: 50px 0;
}
.btn-group {
  position: absolute;
  bottom: 200px;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
}
.record-btn {
}
</style>