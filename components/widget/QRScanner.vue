<template lang="pug">
  .widget-qrscanner(:class="classes")
    video.widget-qrscanner__video(ref="video")
    .widget-qrscanner__target(ref="target")
</template>

<script>
import QRScanner from 'qr-scanner';

let qrScanner = null;

export default {
  data() {
    return {
      init: false,
      last: null,
    };
  },
  computed: {
    classes() {
      const classes = [];

      return classes;
    },
  },
  methods: {
    async scan() {
      try {
        await qrScanner.start();
        if (!this.init) {
          this.$refs.target.appendChild(qrScanner.$canvas);
          qrScanner.$canvas.classList.add('widget-qrscanner__canvas');
          this.init = true;
        }
        this.$emit('state', 'scanning');
        return true;
      } catch (error) {
        this.$emit('state', 'error', {error, method: 'scan'});
        return false;
      } 
    },
    async stop() {
      try {
        await qrScanner.stop();
        this.$emit('state', 'stopped');
        return true;
      } catch (error) {
        this.$emit('state', 'error', {error, method: 'stop'});
        return false;
      }
    },
    clear() {
      this.$refs.target.removeChild(qrScanner.$canvas);
      this.init = false;
    },
  },
  async mounted() {
    try {
      if (await QRScanner.hasCamera()) {
        qrScanner = new QRScanner(this.$refs.video, (result) => {
          if (this.last !== result) {
            this.last = result;
            this.$emit('scanned', result);
          }
        });
        this.$emit('state', 'ready', this);
      } else {
        this.$emit('state', 'no_camera');
      }
    } catch (error) {
      this.$emit('state', 'error', {error, method: 'mounted'});
    }
  },
}
</script>

<style lang="sass">
.widget-qrscanner
  display: flex
  width: 100%
  height: 100%
  position: relative
  background: black

  &__video
    width: 0
    height: 0

  &__target
    +layout__full

  &__canvas
    display: block
    +layout__full

</style>
