<template lang="pug">
  .layout-ratio(:style="{'--layout-ratio': ratio}")
    .layout-ratio__content
      slot
</template>

<script>
export default {
  props: ['ratio'],
}
</script>

<style lang="sass">
.layout-ratio
  display: inline-block
  position: relative
  width: var(--layout-ratio--width, 100%)
  height: 0
  padding-bottom: calc(var(--layout-ratio--width, 100%) / var(--layout-ratio))

  &__content
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

</style>
