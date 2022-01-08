<template lang="pug">
  .editor-title(:class="classes")
    slot
</template>

<script>
export default {
  props: ['type'],
  computed: {
    classes() {
      const classes = [];

      classes.push('editor-title--' + this.type);
      return classes;
    }
  }
}
</script>

<style lang="sass">
.editor-title
  width: 100%
  padding: 5px 10px
  background: var(--editor-title--background, #dfe2e2)

  &--highlight
    border-bottom: 5px solid var(--editor-title--border, #{colors('orange')})
</style>
