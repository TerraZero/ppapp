<template lang="pug">
  .editor-modal-options(:class="classes")
    .editor-modal-options__top
      .editor-modal-options__title {{ title }}
      i.editor-modal-options__icon(v-if="icon", :class="['el-icon-' + icon]")
    .editor-modal-options__message
      slot
    EditorActions.editor-modal-options__actions(:actions="actions", @click="onAction")
</template>

<script>
export default {
  props: ['title', 'actions', 'type'],
  computed: {
    classes() {
      const classes = [];

      classes.push('editor-modal-options--' + this.type);
      return classes;
    },
    icon() {
      switch (this.type) {
        case 'warning':
          return 'warning';
      }
    },
  },
  methods: {
    onAction(action, id) {
      this.$emit('action', action, id);
    },
  },
};
</script>

<style lang="sass">
.editor-modal-options
  min-width: 480px

  &__top
    +editor__border-bottom
    background: colors(editor, control)
    font-size: 22px
    font-weight: bold
    display: flex
    justify-content: space-between

  &__title
    padding: .5em 1em
  
  &__icon
    display: flex
    padding: .5em 1em
    justify-content: center
    align-items: center

  &--warning &__icon
    background: colors(editor, state-error)

  &__message
    padding: 1em

  &__actions
    grid-template-columns: repeat(auto-fit, 30%)
    justify-content: flex-end
    grid-gap: 1em
    padding: 1em

  &__actions > .editor-actions__action
    padding: 0 2em
    box-sizing: border-box

</style>
