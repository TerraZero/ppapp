<template lang="pug">
  .test-mapeditor(:class="classes('page')")
    .test-mapeditor__grid(:style="styles('grid')")
      .test-mapeditor__item(v-for="item, index in items", :key="index", :class="classes('item', item)", :style="styles('item', item)", @click="action(item)", @mouseover="mouseover(item)")
</template>

<script>
import System from '~/client/system';

const logger = System.logger('Editor');

export default {
  data() {
    return {
      size: {
        x: 20,
        y: 15,
        size: 50,
        gap: 1,
      },
      planes: {
        empty: {type: 'empty', items: [{x: 0, y: 1, index: 0, plane: 'empty'}, {x: 1, y: 1, index: 1, plane: 'empty'}, {x: 2, y: 1, index: 2, plane: 'empty'}]},
        second: {type: 'room', items: [{x: 11, y: 4, index: 91, plane: 'second'}, {x: 10, y: 4, index: 90, plane: 'second'}, {x: 10, y: 5, index: 110, plane: 'second'}]}
      },
      grid: {},
      plane: 'first',
      highlight: null,
      mode: 'room',
    };
  },
  computed: {
    
    items() {
      const items = [];

      for (let y = 0; y < this.size.y; y++) {
        for (let x = 0; x < this.size.x; x++) {
          const item = this.grid[x] && this.grid[x][y] || {x, y, index: items.length};

          this.grid[x] = this.grid[x] || {};
          this.grid[x][y] = item;
          if (this.findPlane(x, y)) {
            this.addToPlane(this.findPlane(x, y), item);
          }
          items.push(item);
        }
      }

      return items;
    },

  },
  methods: {
    findPlane(x, y) {
      for (const plane in this.planes) {
        if (this.planes[plane].items.find((item) => {
          return item.x === x && item.y === y;
        })) return plane;
      }
      return null;
    },
    findInRoom(room, x, y) {
      return this.planes[room].items.find((item) => {
        return item.x === x && item.y === y;
      });
    },
    getSurroundPlanes(x, y) {
      return {
        top: this.findPlane(x, y - 1),
        right: this.findPlane(x + 1, y),
        bottom: this.findPlane(x, y + 1),
        left: this.findPlane(x - 1, y),
      };
    },
    classes(type, item = null) {
      const classes = [];
      switch (type) {
        case 'item':
          const options = [];
          if (item.plane && this.planes[item.plane].type === 'room') {
            if (!this.findInRoom(item.plane, item.x, item.y - 1)) options.push('top');
            if (!this.findInRoom(item.plane, item.x + 1, item.y)) options.push('right');
            if (!this.findInRoom(item.plane, item.x, item.y + 1)) options.push('bottom');
            if (!this.findInRoom(item.plane, item.x - 1, item.y)) options.push('left');

            if (options.length) {
              classes.push('test-mapeditor__item--border');
              for (const op of options) {
                classes.push('test-mapeditor__item--border-' + op);
              }
            }
          }

          if (this.plane && this.plane === item.plane) {
            classes.push('test-mapeditor__item--active');
          }
          if (this.highlight && this.highlight === item.plane) {
            classes.push('test-mapeditor__item--highlight');
          }
          classes.push('test-mapeditor__item--' + (this.planes[item.plane] && this.planes[item.plane].type || 'item'));
          break;
      }
      return classes;
    },
    styles(type, item = null) {
      const styles = {};

      switch (type) {
        case 'grid': 
          styles.width = this.size.size * this.size.x + this.size.gap * (this.size.x - 1) + 'px';
          styles.height = this.size.size * this.size.y + this.size.gap * (this.size.y - 1) + 'px';
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
    addToPlane(plane, item, type = 'room') {
      this.planes[plane] = this.planes[plane] || { type, items: []};
      this.planes[plane].items.push(item);
      item.plane = plane;
    },
    action(item) {
      switch(this.mode) {
        case 'room':
          const found = this.findPlane(item.x, item.y);
          if (found) {
            logger.warning('This field is already in plane "' + found + '"');
          } else {
            const surrounds = this.getSurroundPlanes(item.x, item.y);

            let ok = this.planes[this.plane] === undefined || this.planes[this.plane].items.length === 0;
            for (const pos in surrounds) {
              if (surrounds[pos] === this.plane) {
                ok = true;
                break;
              }
            }
            if (ok) {
              this.addToPlane(this.plane, item);
              this.$forceUpdate();
            } else {
              logger.warning('This field must be adjacent to plane "' + this.plane + '"');
            }
          }
          break;
      }
    },
    mouseover(item) {
      this.highlight = item.plane;
    },
  },
}
</script>

<style lang="sass">
.test-mapeditor
  +layout__screen
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
    top: -3px
    left: -3px
    right: -3px
    bottom: -3px
    border-style: solid
    border-color: black
    border-width: 0
    z-index: 1000

  &__item--border-top:after
    border-top-width: 5px

  &__item--border-right:after
    border-right-width: 5px

  &__item--border-bottom:after
    border-bottom-width: 5px

  &__item--border-left:after
    border-left-width: 5px

  &__item--active:after
    border-color: red
    z-index: 2000

  &__item--highlight:after
    border-color: green
    z-index: 3000

  &__item--empty
    background: colors(black)

</style>
