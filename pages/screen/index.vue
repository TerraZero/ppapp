<template lang="pug">
  .screen(:class="classes")
    .screen__content
      .screen__item(v-for="item, index in order", :key="index", :style="{order: index}")
        VisHackItem(v-if="item !== 'empty'", :text="item.text", :icon="'/' + item.icon", :address="item.address", :indicator="item.indicator")
    CyberBooter.screen__booter(text="Booting...", @finished="finished")
</template>

<script>
import Socket from '~/plugins/socket';

const list = {
  camera: {text: 'Kamera', icon: 'camera__t.svg'},
  door: {text: 'Tür', icon: 'door__t.svg'},
  encoded: {text: 'Encoded', icon: 'encoded__t.svg'},
  enforcer: {text: 'Enforcer', icon: 'enforcer__t.svg'},
  laptop: {text: 'Laptop', icon: 'laptop__t.svg'},
  pc: {text: 'PC', icon: 'pc__t.svg'},
  person: {text: 'Person', icon: 'person__t.svg'},
  phone: {text: 'Phone', icon: 'phone__t.svg'},
  router: {text: 'Router', icon: 'router__t.svg'},
  sentry: {text: 'Sentry', icon: 'sentry__t.svg'},
  server: {text: 'Server', icon: 'server__t.svg'},
  signal: {text: 'Signal', icon: 'signal__t.svg'},
};

export default {
  data() {
    return {
      booting: false,
      order: [],
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.booting) classes.push('screen--booting');
      return classes;
    },
  },
  methods: {
    finished() {
      this.booting = false;
    },
  },
  mounted() {
    this.socket = new Socket('/screen');
    this.socket.on('create', ({data}) => {
      this.order = Array(100).fill('empty');

      for (const info of data) {
        for (let i = 0; i < parseInt(info.count); i++) {
          let order = null;
          let item = null;
          let count = 0;
          do {
            order = Math.floor(Math.random() * 100);
            item = JSON.parse(JSON.stringify(list[info.type]));
            if (count++ > 3 && this.order[order] === 'empty') break;
          } while (this.order[order] !== 'empty' || this.order[order - 1] !== 'empty' || this.order[order + 1] !== 'empty' || this.order[order + 10] !== 'empty' || this.order[order - 10] !== 'empty');
          item.address = [
            Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase(),
            Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase(),
            Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase(),
          ];
          item.indicator = info.indicator;
          this.order[order] = item;
        }
      }
    });
  },
}
</script>

<style lang="sass">
.screen
  position: relative
  width: 100%
  height: calc(var(--vh, 1vh) * 100)
  background: #84e6f8
  overflow: hidden
  padding: 2em

  &__booter
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: none !important

  &--booting &__booter
    display: flex !important

  &__content
    display: grid
    grid-template-columns: repeat(10, 10%)
    grid-template-rows: repeat(10, 10%)
    width: 100%
    height: 100%
    max-width: 100%
    max-height: 100%

</style>
