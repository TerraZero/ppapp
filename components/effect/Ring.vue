<template lang="pug">
  .effect-ring(:class="classes")
    slot
</template>

<script>
export default {
  props: ['animate'],
  computed: {
    classes() {
      const classes = [];
      
      if (this.animate) classes.push('effect-ring--animate');
      return classes;
    },
  },
  methods: {

  },
}
</script>

<style lang="sass">
.effect-ring
  position: relative

  &:before,
  &:after
    content: ''
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    border: 5px solid var(--effect-ring__color, black)
    border-radius: 100%
    opacity: 0
    width: 10%
    height: 10%
    will-change: width, height, opacity

  &--animate#{&}:before
    animation: effect-ring 1.5s infinite linear

  &--animate#{&}:after
    animation: effect-ring 1.5s .8s infinite linear

@keyframes effect-ring
  0%
    width: 10%
    height: 10%
    opacity: 0
    border-width: 3px

  50%
    width: calc((var(--effect-ring__target, 150%) - 10%) / 2 + 5%)
    height: calc((var(--effect-ring__target, 150%) - 10%) / 2 + 5%)
    opacity: 1
    border-width: 5px

  100% 
    width: var(--effect-ring__target, 150%)
    height: var(--effect-ring__target, 150%)
    opacity: 0
    border-width: 1px

</style>
