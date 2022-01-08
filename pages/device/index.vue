<template lang="pug">
  .device(:class="classes")
    .device__top
      CyberFrame(border="2px").device__frame
        WidgetQRScanner(@state="state", @scanned="scanned")
    .device__bottom
      CyberScanFrame.device__scan-frame(border="2px")
        .device__area(@click="click")
          EffectRing(:animate="!scanning")
            .device__button
              img.device__image(src="/images/finger-print.png", alt="Scannen")

    CyberBooter.device__booter(text="Booting...", @finished="finished")
</template>

<script>
import Socket from '~/plugins/socket';
import System from '~/client/system';

export default {
  data() {
    return {
      booting: true,
      scanning: false,
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.booting) classes.push('device--booting');
      if (this.scanning) classes.push('device--scanning');
      return classes;
    },
  },
  methods: {
    finished() {
      this.booting = false;
    },    
    async scanned(text) {
      this.qr.stop();
      this.qr.clear();
      this.scanning = false;
      this.socket.emit('/control', 'input', {scanned: text});
    },
    async state(state, data) {
      console.log('state', state, data);
      if (state === 'ready') {
        this.qr = data;
      }
    },
    async click() {
      System.router.push('/device/hacking');
      if (this.qr) {
        if (this.scanning) {
          await this.qr.stop();
          this.qr.clear();
        } else {
          await this.qr.scan();
        }
      }
      this.scanning = !this.scanning;
    },
  },
  mounted() {
    this.socket = new Socket('/device');
  },
}
</script>

<style lang="sass">
.device
  display: flex
  flex-direction: column
  width: 100%
  height: calc(var(--vh, 1vh) * 100)
  background: black
  font-family: $fonts__mono
  color: map.get($red, 'color')
  position: relative

  &__booter
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: none !important

  &--booting &__booter
    opacity: 1

  &__top
    display: flex
    flex-direction: column
    justify-content: space-evenly
    height: 60%
    transition: height .3s ease-in-out
    will-change: height
    padding: 20px

  &--scanning &__top
    height: 80%

  &__bottom
    +layout__center
    height: 40%
    background: black
    transition: height .3s ease-in-out
    will-change: height
  
  &--scanning &__bottom
    height: 20%

  &__button
    +layout__center
    position: relative
    font-size: 25px

  &__image
    width: 100px

  &__frame
    max-width: 400px
    max-height: 400px
    transition: background .3s ease-in-out
    will-change: background

  &--scanning &__frame
    background: red

  &__scan-frame
    background: #{map.get($red, 'deco-sub')}
    --cyber-scan-frame__border: #{map.get($blue, 'background')}
    --cyber-scan-frame__background: #{map.get($red, 'background')}
    --cyber-scan-frame__deco: #{map.get($red, 'deco-sub')}

  &__area
    +layout__full
    +layout__center
    --effect-ring__color: #{map.get($blue, 'background')}
    background: url('/images/cyberbackground.png') 
    background-size: cover
    background-position: center center

</style>
