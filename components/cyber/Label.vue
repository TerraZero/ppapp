<template lang="pug">
  .cyber-label(:class="classes")
    slot
    .cyber-label__deco-one
    .cyber-label__deco-two

</template>

<script>

export default {
  props: ['theme'],
  computed: {
    classes() {
      const classes = [];

      if (this.theme) {
        classes.push('cyber-label--' + this.theme);
      } else {
        classes.push('cyber-label--default');
      }
      return classes;
    },
  },
};
</script>

<style lang="sass">
.cyber-label
  +colors__themeable
  padding: 10px 20px 10px 15px
  background: var(--colors--background)
  display: inline-block
  position: relative
  margin: 10px 10px 10px 0

  &:before
    content: ''
    position: absolute
    top: 0
    right: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 0 20px 20px 0
    border-color: transparent var(--colors--deco-sub) transparent transparent
    filter: drop-shadow(-4px 0 var(--colors--border))

  &__deco-one
    position: absolute
    left: 5px 
    top: 15px
    bottom: 5px
    width: 5px
    background: var(--colors--deco-sub)
    filter: drop-shadow(2px 0 var(--colors--border))

  &__deco-one:after
    content: ''
    position: absolute
    left: 100%
    bottom: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 5px 0 0 5px
    border-color: transparent transparent transparent var(--colors--deco-sub)

  &__deco-one:before
    content: ''
    position: absolute
    left: 0
    bottom: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 5px 0 0 5px
    border-color: transparent transparent transparent var(--colors--deco-sub)

  &__deco-two
    position: absolute
    bottom: 100%
    left: 0
    background: var(--colors--deco-sub)
    width: 30px
    height: 8px
    filter: drop-shadow(-2px 2px var(--colors--border))

  &__deco-two:before
    content: ''
    position: absolute
    top: 0
    right: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 0 8px 8px 0
    border-color: transparent var(--colors--deco-sub) transparent transparent

  &__deco-two:after
    content: ''
    position: absolute
    top: 0
    left: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 8px 0 0 8px
    border-color: transparent transparent transparent var(--colors--deco-sub)

</style>
