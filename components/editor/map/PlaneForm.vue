<template lang="pug">
  .editor-map-plane-form
    EditorActions.editor-map-plane-form__actions(:actions="actions", @click="onClick")
    EditorInput(label="Title")
      EditorTextfield(v-model="title")
    EditorInput(label="Key")
      EditorTextfield(v-model="key", :disabled="mode !== 'add'")
    EditorInput(label="Type")
      EditorSelect(v-model="type", :options="type_options")
</template>

<script>
export default {
  props: ['value', 'mode'],
  data() {
    return {
      key: this.value.key || '',
      title: this.value.title || '',
      type: this.value.type || '',
      type_options: {
        room: 'Room',
        empty: 'Empty',
      },
    };
  },
  computed: {
    actions() {
      switch (this.mode) {
        case 'add':
          return {
            close: {
              icon: 'close',
            },
            add: {
              type: 'primary',
              icon: 'plus',
            },
          };
        case 'edit':
          return {
            close: {
              icon: 'close',
            },
            del: {
              type: 'danger',
              icon: 'delete',
            },
            edit: {
              type: 'primary',
              icon: 'edit',
            },
          };
      }
    },
  },
  methods: {
    classes(action) {
      const classes = [];

      classes.push('editor-actions__action--' + action.type);
      return classes;
    },
    onClick(action, index) {
      switch (index) {
        case 'add':
          this.$emit('action', index, {
            key: this.key,
            title: this.title,
            type: this.type,
          });
          break;
        case 'close':
          this.$emit('action', index);
          break;
      }
    },
  },
}
</script>

<style lang="sass">
.editor-map-plane-form

  &__actions
    grid-template-columns: repeat(4, 1fr)
    margin-bottom: 5px

</style>
