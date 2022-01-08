<template lang="pug">
  .cyber-hacking-frame(:class="classes")
    .cyber-hacking-frame__wrapper
      .cyber-hacking-frame__grid(:style="styles")
        .cyber-hacking-frame__item(v-for="item, index in items", :key="index", :class="itemClasses(item, index)", @click="itemClick(item, index)")
          .cyber-hacking-frame__content
            | {{ item.text }}
</template>

<script>

export default {
  data() {
    return {
      grid: 5,
      _items: null,
    };
  },
  computed: {
    classes() {
      const classes = [];

      return classes;
    },
    items() {
      if (this._items) return this._items;

      this._items = [];
      for (let i = 0; i < this.grid * this.grid; i++) {
        this._items.push({
          text: i,
          active: false,
        });
      }
      return this._items;
    },
    styles() {
      return {
        'grid-template-columns': 'repeat(' + this.grid + ', 1fr)',
      };
    },
  },
  methods: {
    itemClasses(item, index) {
      const classes = [];

      if (item.active) classes.push('cyber-hacking-frame__item--active');
      return classes;
    },
    itemClick(item, index) {
      item.active = !item.active;
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="sass">
.cyber-hacking-frame
  +layout__full
  +layout__center
  padding: 20px

  &__wrapper
    padding-bottom: 100%
    width: 100%
    height: 0
    position: relative

  &__grid
    +layout__full
    display: grid
    grid-gap: 6px
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

  &__item
    padding-bottom: 100%
    width: 100%
    height: 0
    position: relative

  &__content
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: green

  &__item--active &__content
    background: blue
</style>
