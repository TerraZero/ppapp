<template lang="pug">
  .map-display(ref="display", :style="{'--map-display--gap': (size.gap || 1) +  'px'}")
    .map-display__grid(ref="grid", :style="styles('grid')")
      .map-display__item(v-for="item, index in itemsdata", :key="index", :class="classes(item)", :style="styles('item', item)", @click="$emit('click', item)", @mouseover="$emit('hover', item)")
        img.map-display__icon(v-if="icon(item)", :src="icon(item)")
</template>

<script>
import Path from 'path';
import Tinykeys from 'tinykeys';
import Config from '~/static/data/items.json';

export default {
  mounted() {
    let last = null;
    let scroll = 5;

    Tinykeys(window, {
      'Shift+D': () => {
        if (last === 'A') {
          scroll += 0.1;
        } else {
          last = 'A';
        }
        this.x = Math.max(this.$refs.display.clientWidth - this.$refs.grid.clientWidth - 50, this.x - scroll);
      },
      'Shift+W': () => {
        if (last === 'S') {
          scroll += 0.1;
        } else {
          last = 'S';
        }
        this.y = Math.min(50, this.y + scroll);
      },
      'Shift+A': () => {
        if (last === 'D') {
          scroll += 0.1;
        } else {
          last = 'D';
        }
        this.x = Math.min(50, this.x + scroll);
      },
      'Shift+S': () => {
        if (last === 'W') {
          scroll += 0.1;
        } else {
          last = 'W';
        }
        this.y = Math.max(this.$refs.display.clientHeight - this.$refs.grid.clientHeight - 50, this.y - scroll);
      },
      'Shift': () => {
        last = null;
        scroll = 5;
      },
    });
  },
  props: ['size', 'planes', 'items', 'active', 'highlight', 'pos', 'select'],
  data() {
    return {
      x: 50,
      y: 50,
    };
  },
  computed: {
    
    itemsdata() {
      const items = [];

      for (let y = 0; y < this.size.y; y++) {
        for (let x = 0; x < this.size.x; x++) {
          items.push(this.findItem(x, y) || {x, y, index: items.length});
        }
      }

      return items;
    },

  },
  methods: {
    findItem(x, y) {
      for (const plane in this.planes) {
        let item = null;
        if (item = this.planes[plane].items.find((item) => {
          return item.x === x && item.y === y;
        })) return item;
      }
      return null;
    },
    findPlane(x, y) {
      for (const plane in this.planes) {
        if (this.planes[plane].items.find((item) => {
          return item.x === x && item.y === y;
        })) return plane;
      }
      return null;
    },
    getSurroundPlanes(x, y) {
      return {
        top: this.findPlane(x, y - 1),
        right: this.findPlane(x + 1, y),
        bottom: this.findPlane(x, y + 1),
        left: this.findPlane(x - 1, y),
      };
    },
    classes(item) {
      const classes = [];
      const options = [];
      if (item.plane && this.planes[item.plane].type === 'room') {
        const surrounds = this.getSurroundPlanes(item.x, item.y);
        for (const index in surrounds) {
          if (surrounds[index] !== item.plane) options.push(index);
        }

        if (options.length) {
          classes.push('map-display__item--border');
          for (const op of options) {
            classes.push('map-display__item--border-' + op);
          }
        }
      }

      if (this.active && this.active === item.plane) {
        classes.push('map-display__item--active');
      }
      if (this.highlight && this.highlight === item.plane) {
        classes.push('map-display__item--highlight');
      }
      if (this.select && this.select.x === item.x && this.select.y === item.y) {
        classes.push('map-display__item--select');
      }
      classes.push('map-display__item--' + (this.planes[item.plane] && this.planes[item.plane].type || 'item'));
      return classes;
    },
    icon(item) {
      const icon = this.items.find(v => v.x === item.x && v.y === item.y);
      if (icon) {
        const data = Config.items.find(v => v.id === icon.id);
        return Path.join(Config.path, data.icon);
      }
      return null;
    },
    styles(type, item = null) {
      const styles = {};

      switch (type) {
        case 'grid':
          styles.width = this.size.size * this.size.x + this.size.gap * (this.size.x - 1) + 'px';
          styles.height = this.size.size * this.size.y + this.size.gap * (this.size.y - 1) + 'px';
          styles.top = this.y + 'px';
          styles.left = this.x + 'px';
          break;
        case 'item':
          styles.width = this.size.size + 'px';
          styles.height = this.size.size + 'px';
          if (item.x !== this.size.x - 1) {
            styles['margin-right'] = this.size.gap + 'px';
          }
          styles['margin-bottom'] = this.size.gap + 'px';
          break;
      }
      return styles;
    },
  },
}
</script>

<style lang="sass">
.map-display
  +layout__full
  background: colors(black)
  position: relative

  &__grid
    display: flex
    flex-wrap: wrap
    position: absolute
    top: 50px
    left: 50px

  &__item
    background: white
    cursor: pointer
    position: relative

  &__item:hover
    background: rgba(255, 255, 255, .7)

  &__item--border:after
    content: ''
    position: absolute
    top: calc((var(--map-display--gap, 1px) + 2px) * -1)
    left: calc((var(--map-display--gap, 1px) + 2px) * -1)
    right: calc((var(--map-display--gap, 1px) + 2px) * -1)
    bottom: calc((var(--map-display--gap, 1px) + 2px) * -1)
    border-style: solid
    border-color: black
    border-width: 0
    z-index: 1000

  &__item--border-top:after
    border-top-width: calc(var(--map-display--gap, 1px) + 4px)

  &__item--border-right:after
    border-right-width: calc(var(--map-display--gap, 1px) + 4px)

  &__item--border-bottom:after
    border-bottom-width: calc(var(--map-display--gap, 1px) + 4px)

  &__item--border-left:after
    border-left-width: calc(var(--map-display--gap, 1px) + 4px)

  &__item--active:after
    border-color: red
    z-index: 2000

  &__item--select
    box-shadow: 0 0 5px 5px colors(orange)
    z-index: 3000

  &__item--highlight:after
    border-color: green
    z-index: 3000

  &__item--empty
    background: colors(black)

  &__item--empty#{&}__item--highlight
    background: colors(black, hover-background)

  &__icon
    padding: 5%
    box-sizing: border-box

</style>
