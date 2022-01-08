<template lang="pug">
  .cyber-button(:class="classes")
    .cyber-button__text
      slot
    .cyber-button__deco-one
    .cyber-button__deco-two
    .cyber-button__deco-three
    .cyber-button__deco-four

</template>

<script>

export default {
  props: ['theme', 'type'],
  computed: {
    classes() {
      const classes = [];

      if (this.theme) {
        classes.push('cyber-button--' + this.theme);
      } else {
        classes.push('cyber-button--default');
      }
      classes.push('cyber-button--type-' + (this.type || '0'));
      return classes;
    },
  },
};
</script>

<style lang="sass">
.cyber-button
  +colors__themeable
  display: inline-flex
  justify-content: center
  align-items: center
  padding: calc(var(--cyber-button--deco-size, 5px) * 2) calc(var(--cyber-button--deco-size, 5px) * 3)
  position: relative
  background: var(--colors--background)
  margin-right: calc(var(--cyber-button--deco-size, 5px) + 5px)
  cursor: pointer
  transition: all .1s ease-in-out
  user-select: none
  z-index: 1
  filter: drop-shadow(-2px 2px var(--colors--border))

  &:hover
    filter: drop-shadow(-2px 2px var(--colors--border)) drop-shadow(-2px 2px 2px var(--colors--deco-sub))

  &:active
    box-shadow: 0 0 0 var(--colors--deco-sub)
    transform: translate(-2px, 2px)

  &--type-0
    margin-left: calc(var(--cyber-button--deco-size, 5px) * 2)

  &--type-0 &__deco-one
    position: absolute
    bottom: 0
    right: 100%
    width: calc(var(--cyber-button--deco-size, 5px) * 2)
    height: calc(100% - var(--cyber-button--deco-size, 5px) * 2)
    background: var(--colors--background)

  &--type-0 &__deco-one:before
    content: ''
    position: absolute
    bottom: 100%
    right: 0
    @include triangle__bottom_right(calc(var(--cyber-button--deco-size, 5px) * 2), calc(var(--cyber-button--deco-size, 5px) * 2), var(--colors--background))

  &--type-2 &__deco-one
    position: absolute
    right: 100%
    top: calc(50% - 10px)
    width: var(--cyber-button--deco-size, 5px)
    height: 20px
    background: var(--colors--background)
    @include triangle__top_bottom_right(var(--cyber-button--deco-size, 5px), var(--cyber-button--deco-size, 5px), var(--colors--background))

  &--type-4 &__deco-two
    position: absolute
    top: 0
    left: 100%
    width: calc(var(--cyber-button--deco-size, 5px) * 2)
    height: calc(100% - var(--cyber-button--deco-size, 5px) * 2)
    background: var(--colors--background)

  &--type-4 &__deco-two:after
    content: ''
    position: absolute
    top: 100%
    right: 0
    @include triangle__top_left(calc(var(--cyber-button--deco-size, 5px) * 2), calc(var(--cyber-button--deco-size, 5px) * 2), var(--colors--background))

  &--type-0 &__deco-two,
  &--type-2 &__deco-two,
  &--type-3 &__deco-two
    position: absolute
    left: 100%
    top: calc(50% - 10px)
    width: var(--cyber-button--deco-size, 5px)
    height: 20px
    background: var(--colors--background)
    @include triangle__top_bottom_left(var(--cyber-button--deco-size, 5px), var(--cyber-button--deco-size, 5px), var(--colors--background))

  &--type-1 &__deco-two
    position: absolute
    left: 100%
    top: 0
    width: var(--cyber-button--deco-size, 5px)
    height: calc(50% - 15px)
    background: var(--colors--background)

  &--type-1 &__deco-two:after
    content: ''
    position: absolute
    top: 100%
    left: 0
    @include triangle__top_left(var(--cyber-button--deco-size, 5px), var(--cyber-button--deco-size, 5px), var(--colors--background))

  &--type-1 &__deco-one,
  &--type-3 &__deco-one,
  &--type-4 &__deco-one
    position: absolute
    right: 100%
    top: 0
    width: var(--cyber-button--deco-size, 5px)
    height: calc(50% - 15px)
    background: var(--colors--background)
  
  &--type-1 &__deco-one:after,
  &--type-3 &__deco-one:after,
  &--type-4 &__deco-one:after
    content: ''
    position: absolute
    top: 100%
    right: 0
    @include triangle__top_right(var(--cyber-button--deco-size, 5px), var(--cyber-button--deco-size, 5px), var(--colors--background))

  &--type-1 &__deco-three,
  &--type-3 &__deco-three,
  &--type-4 &__deco-three
    position: absolute
    right: 100%
    bottom: 0
    width: var(--cyber-button--deco-size, 5px)
    height: calc(50% - 15px)
    background: var(--colors--background)

  &--type-1 &__deco-three:after,
  &--type-3 &__deco-three:after,
  &--type-4 &__deco-three:after
    content: ''
    position: absolute
    bottom: 100%
    right: 0
    @include triangle__bottom_right(var(--cyber-button--deco-size, 5px), var(--cyber-button--deco-size, 5px), var(--colors--background))

  &--type-1 &__deco-four
    position: absolute
    left: 100%
    bottom: 0
    width: var(--cyber-button--deco-size, 5px)
    height: calc(50% - 15px)
    background: var(--colors--background)

  &--type-1 &__deco-four:after
    content: ''
    position: absolute
    bottom: 100%
    right: 0
    @include triangle__bottom_left(var(--cyber-button--deco-size, 5px), var(--cyber-button--deco-size, 5px), var(--colors--background))

</style>
