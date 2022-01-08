<template lang="pug">
  .editor-map-load-form
    EditorActions.editor-map-load-form__actions(:actions="actions", @click="onClick")
    EditorInput(label="Load")
      EditorSelect(v-model="load", :options="list")
    EditorInput(label="Key")
      EditorTextfield(v-model="key")
    EditorInput(label="Title")
      EditorTextfield(v-model="title")
    EditorInput(label="Size X")
      EditorTextfield(v-model="size.x")
    EditorInput(label="Size Y")
      EditorTextfield(v-model="size.y")
    EditorInput(label="Size")
      EditorTextfield(v-model="size.size")
    EditorInput(label="Gap")
      EditorTextfield(v-model="size.gap")
</template>

<script>
import System from '~/client/system';
import API from '~/client/api/API';

const api = API.create('/api');
const logger = System.logger('editor');

export default {
  props: ['value'],
  async mounted() {
    const response = await api.request('editor.list');
    this.list = response.content.list;
  },
  data() {
    return {
      load: '',
      key: this.value.key || '',
      title: this.value.title || '',
      size: {
        x: this.value.size.x,
        y: this.value.size.y,
        size: this.value.size.size,
        gap: this.value.size.gap,
      },

      list: {},
    };
  },
  computed: {
    actions() {
      const actions = {
        close: {
          icon: 'close',
        },
        load: {
          type: 'danger',
          icon: 'download',
        },
      };
      if (this.key) {
        actions.save = {
          type: 'primary',
          icon: 'upload2',
        };
      }
      actions.edit = {
        type: 'primary',
        icon: 'edit',
      };
      return actions;
    },
  },
  methods: {
    async onClick(action, index) {
      switch (index) {
        case 'load':
          if (this.load === '') {
            logger.warning('Please select a map to load.');
            return;
          }
          const response = await api.request('editor.load', {id: this.load});
          this.$emit('action', 'load', {
            key: response.content.key,
            title: response.content.title,
            planes: response.content.planes,
            items: response.content.items,
            size: response.content.size,
          });
          break;
        default:
          this.$emit('action', index, {
            key: this.key,
            title: this.title,
            size: this.size,
          });
          break;
      }
    },
  },
}
</script>

<style lang="sass">
.editor-map-load-form

  &__actions
    grid-template-columns: repeat(4, 1fr)
    margin-bottom: 5px

</style>
