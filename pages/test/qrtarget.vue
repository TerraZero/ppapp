<template lang="pug">
  .qrtarget(:class="classes")
    | {{ text }}
</template>

<script>
import Socket from '~/plugins/socket';

export default {
  data() {
    return {
      text: '',
    };
  },
  computed: {
    classes() {
      const classes = [];

      return classes;
    },
  },
  async mounted() {
    this.socket = new Socket('/test/qrtarget');
    this.socket.on('scanned', ({data}) => {
      this.text = data;
    });
  },
}
</script>

<style lang="sass">
.qrtarget
  display: flex
  justify-content: center
  align-items: center
  width: 100vw
  height: 100vh
  background: map.get($blue, 'background')
  font-size: 20px

</style>
