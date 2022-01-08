<template lang="pug">
  MobileFrameLayout.mobile-frame-qrscanner(:class='classes')
    template(#screen)
      .mobile-frame-qrscanner__screen.mobile-frame-qrscanner__screen-scan
        | Scan
      .mobile-frame-qrscanner__screen.mobile-frame-qrscanner__screen-menu
        | Menu
      .mobile-frame-qrscanner__screen.mobile-frame-qrscanner__screen-edit
        | Edit
    template(#actions)
      CyberActions(:actions='actions', @click="click")

</template>

<script>
import QRScanner from 'qr-scanner';

let qrScanner = null;

export default {
  data() {
    return {
      active: 'scan',
      actions: {
        scan: {
          text: 'Scan',
        },
        menu: {
          text: 'Menu',
        },
        edit: {
          text: 'Edit',
        },
      },
    };
  },
  computed: {
    classes() {
      const classes = [];

      classes.push('mobile-frame-qrscanner--' + this.active);
      return classes;
    },
  },
  methods: {
    click(action) {
      if (this.active === action || action === 'close') {
        this.active = 'scan';
      } else {
        this.active = action;
      }
      if (this.active === 'scan') {
        this.actions = {
          scan: {
            text: 'Scan',
          },
          menu: {
            text: 'Menu',
          },
          edit: {
            text: 'Edit',
          },
        };
      } else {
        this.actions = {
          close: {
            text: 'Close',
            theme: 'red',
          },
          menu: {
            text: 'Menu',
          },
          edit: {
            text: 'Edit',
          },
        };
      }
    },
    async scan() {
      try {
        await qrScanner.start();
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
  },
  async mounted() {
  },
}
</script>

<style lang="sass">
.mobile-frame-qrscanner
  background: black
  
  &__screen
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    transition: transform .3s cubic-bezier(.60,1,.60,1)
    background: black  
    color: white
    will-change: transform
    transform: translateX(100%)
    z-index: 75

  &__screen-scan
    transform: translateX(0)
    background: green
    z-index: 50

  &--edit &__screen-edit
    transform: translateX(0)
    z-index: 100
  
  &__screen-menu
    background: blue

  &--menu &__screen-menu
    transform: translateX(0)
    z-index: 100

</style>
