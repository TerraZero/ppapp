<template lang="pug">
  .qrscanner(:class="classes")
    .qrscanner__main
      video.qrscanner__video(ref="video")
    .qrscanner__actions
      .qrscanner__button(@click="click")
        | {{ text }} | {{ scan }}
</template>

<script>
import QRScanner from 'qr-scanner';
import Socket from '~/plugins/socket';
import Session from '~/client/session';

let qrScanner = null;
Session.instance.on((session) => {

});

export default {
  data() {
    return {
      state: 'load',
      text: 'Start',
      scan: '',
      scanning: false,
    };
  },
  computed: {
    classes() {
      const classes = [];

      return classes;
    },
  },
  methods: {
    async click() {
      if (qrScanner) {
        if (this.scanning) {
          await qrScanner.stop();
        } else {
          await qrScanner.start();
        }
        this.scanning = !this.scanning;
        this.text = (this.scanning ? 'Stop' : 'Start');
      }
    },
  },
  async mounted() {
    this.socket = new Socket('/test/qrscanner');
    if (await QRScanner.hasCamera()) {
      qrScanner = new QRScanner(this.$refs.video, (result) => {
        if (this.scan !== result) {
          this.scan = result;
          this.socket.emit('/test/qrtarget', 'scanned', result);
        }
      });
    } else {
      this.state = 'no_camera';
    }
  },
}
</script>

<style lang="sass">
.qrscanner
  display: flex
  flex-wrap: wrap
  height: 100vh

  &__video
    width: 100%
    height: 100%

  &__main
    width: 100%
    height: calc(100% - 100px)
  
  &__actions
    display: flex
    width: 100%
    height: 100px

  &__button
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    background: green
    color: white
    user-select: none

</style>
