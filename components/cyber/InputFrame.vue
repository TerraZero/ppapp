<template lang="pug">
  .cyber-input-frame(:class="classes")
    slot
    .cyber-input-frame__deco-one
    .cyber-input-frame__deco-two
    .cyber-input-frame__deco-three
    .cyber-input-frame__deco-four
    .cyber-input-frame__deco-five

</template>

<script>

export default {
  props: ['theme'],
  computed: {
    classes() {
      const classes = [];

      if (this.theme) {
        classes.push('cyber-input-frame--' + this.theme);
      } else {
        classes.push('cyber-input-frame--default');
      }
      return classes;
    },
  },
};
</script>

<style lang="sass">
.cyber-input-frame
  +colors__themeable
  border: 1px solid var(--colors--background)
  padding: 5px
  position: relative
  box-sizing: border-box
  margin-bottom: 20px

  &:before
    content: ''
    width: 0
    height: 0
    border-style: solid
    border-width: 30px 30px 0 0
    border-color: var(--colors--deco-main) transparent transparent transparent
    position: absolute
    top: 0
    left: 0
    filter: drop-shadow(2px 2px var(--colors--deco-sub))

  &__deco-one
    position: absolute
    right: -1px
    top: calc(100% + 4px)
    height: 7px
    width: 50px
    background: var(--colors--deco-main)

  &__deco-one:after
    content: ''
    position: absolute
    top: 0
    right: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 0 18px 7px 0
    border-color: transparent var(--colors--deco-main) transparent transparent

  &__deco-two
    position: absolute
    top: 100%
    left: 100px
    width: 100px
    height: 10px
    background: var(--colors--deco-main)
    filter: drop-shadow(2px 2px var(--colors--deco-sub))

  &__deco-two:before
    content: ''
    position: absolute
    top: 0
    right: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 0 0 10px 10px
    border-color: transparent transparent var(--colors--deco-main) transparent
    filter: drop-shadow(0 .5px var(--colors--deco-sub))

  &__deco-two:after
    content: ''
    position: absolute
    top: 0
    left: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 10px 10px 0 0
    border-color: var(--colors--deco-main) transparent transparent transparent
    filter: drop-shadow(.5px .5px var(--colors--deco-sub))

  &__deco-three
    position: absolute
    top: 100%
    left: -1px
    width: 30px
    height: 15px
    background: var(--colors--deco-main)
    box-shadow: 2px 2px var(--colors--deco-sub)

  &__deco-three:after
    content: ''
    position: absolute
    top: 0
    left: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 15px 15px 0 0
    border-color: var(--colors--deco-main) transparent transparent transparent
    filter: drop-shadow(2px 2px var(--colors--deco-sub))

  &__deco-four
    position: absolute
    top: 100%
    left: 220px
    width: 12px
    height: 8px
    background: var(--colors--deco-sub)

  &__deco-four:before
    content: ''
    position: absolute
    top: 0
    right: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 0 15px 8px 0
    border-color: transparent var(--colors--deco-sub) transparent transparent

  &__deco-four:after
    content: ''
    position: absolute
    top: 0
    left: 100%
    width: 0
    height: 0
    border-style: solid
    border-width: 8px 15px 0 0
    border-color: var(--colors--deco-sub) transparent transparent transparent

  &__deco-five
    position: absolute
    top: 10px
    right: 10px
    width: 8px
    height: 40px
    background: var(--colors--deco-sub)
    filter: drop-shadow(-4px 0 var(--colors--deco-main))

  &__deco-five:after
    content: ''
    position: absolute
    top: 100%
    right: 0
    width: 0
    height: 0
    border-style: solid
    border-width: 0 8px 16px 0
    border-color: transparent var(--colors--deco-sub) transparent transparent
    filter: drop-shadow(0 0 var(--colors--deco-main))

</style>
