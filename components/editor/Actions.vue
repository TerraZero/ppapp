<template lang="pug">
  .editor-actions
    EditorButton.editor-actions__action(v-for="action, index in actions", :key="index", :text="action.text", :type="action.type", :icon="action.icon", :classes="action.classes", @click.native="$emit('click', action, index)")
</template>

<script>
export default {
  props: ['actions'],
  methods: {
    classes(action) {
      const classes = [];

      classes.push('editor-actions__action--' + action.type);
      if (typeof action.class === 'string') {
        classes.push(action.class);
      }
      if (Array.isArray(action.classes)) {
        classes.concat(action.classes)
      }
      return classes;
    },
  },
}
</script>

<style lang="sass">
.editor-actions
  display: grid
  grid-gap: var(--editor-actions--gap, 2px)
  color: white

</style>
