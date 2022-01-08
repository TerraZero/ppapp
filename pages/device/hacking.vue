<template lang="pug">
  .device-hacking(:class="classes")
    CyberHackingFrame
</template>

<script>
import Socket from '~/plugins/socket';

export default {
  data() {
    return {};
  },
  computed: {
    classes() {
      const classes = [];

      return classes;
    },
  },
  mounted() {
    this.socket = new Socket('/device/hacking');
  },
}
</script>

<style lang="sass">
.device-hacking
  +layout__screen
</style>
