<template lang="pug">
  .editor-mediafield(:class="classes")
    EditorTextfield.editor-mediafield__textfield(:value="display", :disabled="true", @click.native="onClick")
    EditorActions.editor-mediafield__actions(:actions="actions", @click="onAction")
    EditorModal(v-if="mode")
      EditorModalMedia(v-if="mode !== 'delete'", :key="mode + value", :mode="mode", :value="value", @action="onModal")
      EditorModalOptions(v-if="mode === 'delete'", title="Wirklich löschen?", :actions="remove", type="warning", @action="onModal") 
        | Wollen Sie wirklich diese Media löschen?
</template>

<script>
import System from '~/client/system';
import API from '~/client/api/API';

const api = API.create('/api');
const logger = System.logger('media');

export default {
  props: ['value'],
  async mounted() {
    if (!this.media && this.value) {
      const response = await api.request('mediaeditor.load', {id: this.value});
      this.media = response.content.media;
    }
    this.display = this.media && this.media.path || 'no image';
  },
  data() {
    return {
      mode: null,
      display: '',
      media: null,
      remove: {
        remove_item: {
          text: 'Entfernen',
          type: 'primary',
        },
        remove_abort: {
          text: 'Abbrechen',
        },
        remove: {
          type: 'danger',
          text: 'Löschen',
        },
      },
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.value) classes.push('editor-mediafield--filled');
      return classes;
    },
    actions() {
      const actions = {
        select: {
          icon: 'menu',
          type: 'primary',
        },
      };

      if (this.value) {
        actions.delete = {
          icon: 'circle-close',
          type: 'danger',
        };
      }
      return actions;
    }
  },
  methods: {
    onClick() {
      if (this.media) {
        this.onAction(null, 'edit');
      } else {
        this.onAction(null, 'create');
      }
    },
    onAction(action, id) {
      switch (id) {
        case 'select':
          this.mode = 'select';
          break;
        case 'create':
          this.mode = 'create';
          break;
        case 'delete':
          this.mode = 'delete';
          break;
        case 'edit':
          this.mode = 'edit';
          break;
      }   
    },
    async onModal(action, id) {
      switch (id) {
        case 'close': 
          this.mode = null;
          break;
        case 'clear':
          this.mode = 'create';
          this.media = null;
          this.display = 'no image';
          this.$emit('input', null);
          break;
        case 'select':
        case 'save':
          this.mode = null;
          this.media = action;
          this.display = this.media.path;
          this.$emit('input', this.media.id);
          break;
        case 'remove_abort':
          this.mode = null;
          break;
        case 'remove':
          const response = await api.request('mediaeditor.remove', {id: this.value});
          logger.note('Delete "' + response.content.media.name + '"');
        case 'remove_item':
          this.media = null;
          this.mode = null;
          this.display = 'no image';
          this.$emit('input', null);
          break;
      }
    },
  },
}
</script>

<style lang="sass">
.editor-mediafield
  width: 100%
  display: flex

  &__actions
    grid-template-columns: 40px
    height: 40px
    --editor-button--height: 0
    --editor-actions--gap: 0

  &--filled &__actions
    grid-template-columns: 40px 40px

  &__textfield > .el-input__inner
    cursor: pointer !important

</style>
