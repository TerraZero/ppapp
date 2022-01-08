<template lang="pug">
  .editor-button(:class="buttonclasses")
    .editor-button__text(v-if="text") {{ text }}
    i.editor-button__icon(v-if="icon", :class="['el-icon-' + icon]")

</template>

<script>
export default {
  props: ['text', 'icon', 'type', 'classes'],
  computed: {
    buttonclasses() {
      const classes = [];

      classes.push('editor-button--' + this.type);
      if (Array.isArray(this.classes)) {
        classes.concat(this.classes)
      }
      return classes;
    },
  },
}
</script>

<style lang="sass">
.editor-button
  +layout__center
  background: colors(black, light-background)
  cursor: pointer
  min-height: var(--editor-button--height, 50px)

  &:hover
    background: colors(black, hover-background)
    
  &--primary
    background: colors(blue)

  &--primary:hover
    background: colors(blue, hover-background)

  &--danger
    background: colors(red)

  &--danger:hover
    background: colors(red, hover-background)

</style>
