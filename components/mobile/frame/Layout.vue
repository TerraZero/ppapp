<template lang="pug">
  .mobile-frame-layout(:class="classes")
    .mobile-frame-layout__screen
      slot(name="screen")
    .mobile-frame-layout__actions
      slot(name="actions")
      
</template>

<script>
export default {
  computed: {
    classes() {
      const classes = [];

      return classes;
    },
  },
}
</script>

<style lang="sass">
.mobile-frame-layout
  display: flex
  flex-wrap: wrap
  width: 100%
  height: calc(var(--vh, 1vh) * 100)

  &__screen
    width: 100%
    height: calc(100% - 100px)
    position: relative
    overflow: hidden

  &__actions
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100px
    background: black

</style>
