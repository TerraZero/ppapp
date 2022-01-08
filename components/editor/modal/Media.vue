<template lang="pug">
  .editor-modal-media
    .editor-modal-media__top
      .editor-modal-media__title {{ title }}
      EditorButton.editor-modal-media__icon(icon="close", type="danger", @click.native="onAction(null, 'close')")
    .editor-modal-media__select(v-if="mode === 'select'")
      .editor-modal-media__filters
        EditorInput.editor-modal-media__filter(label="Filter Name")
          EditorTextfield(v-model="filters.name", @input="search")
        EditorInput.editor-modal-media__filter(label="Filter Type")
          EditorSelect(v-model="filters.type", :options="meta.types", @input="search")
        EditorInput.editor-modal-media__filter(label="Filter Search")
          EditorTextfield(v-model="filters.search", @input="search")
      .editor-modal-media__content
        .editor-modal-media__frame
          .editor-modal-media__item(v-for="item in items", :key="item.id", @click="onAction(item, 'select')")
            EditorMediaInfo.editor-modal-media__media-info(:media="item")
            EditorMedia.editor-modal-media__media(:media="item")
    .editor-modal-media__create(v-if="mode === 'create' || mode === 'edit'")
      EditorInput.editor-modal-media__field(v-if="mode === 'edit'", label="ID")
        EditorTextfield(v-model="media.id", :disabled="true")
      EditorInput.editor-modal-media__field(v-if="mode === 'edit'", label="Path")
        EditorTextfield(v-model="media.path", :disabled="mode === 'edit'")
      EditorInput.editor-modal-media__field(label="Url")
        EditorTextfield(v-model="media.url", :disabled="mode === 'edit'")
      EditorInput.editor-modal-media__field(label="Name")
        EditorTextfield(v-model="media.name")
      EditorInput.editor-modal-media__field(v-if="meta.types", label="Type")
        EditorSelect(v-model="media.type", :options="meta.types", :create="true")
      EditorInput.editor-modal-media__field(label="Search")
        EditorTextfield(v-model="media.search")
      EditorActions.editor-modal-media__actions(:actions="actions", @click="onAction")

</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['mode', 'value'],
  async mounted() {
    const response = await api.request('mediaeditor.meta');
    const types = {};
    for (const type of response.content.types) {
      types[type] = type;
    }
    this.meta.types = types;
    if (this.mode === 'select') {
      this.search();
    }
    if (this.value) {
      const response = await api.request('mediaeditor.load', {id: this.value});
      this.media = response.content.media;
    }
  },
  data() {
    return {
      page: 0,
      meta: {
        types: null,
      },
      filters: {
        name: '',
        type: '',
        search: '',
      },
      media: {
        url: '',
        name: '',
        type: '',
        search: '',
      },
      id: '',
      items: [],
    };
  },
  computed: {
    async types() {
      const types = {};
      const response = await api.request('mediaeditor.meta');
      for (const type of response.content.types) {
        types[type] = type;
      }
      return types;
    },
    title() {
      switch (this.mode) {
        case 'select': 
          return 'Select a media';
        case 'create':
          return 'Create a media';
        default:
          return 'Edit media';
      }
    },
    actions() {
      const actions = {
        save: {
          text: 'Speichern',
          type: 'primary',
        },
        close: {
          text: 'Abbrechen',
        },
      };
      if (this.mode === 'edit') {
        actions.clear = {
          text: 'Entfernen',
        };
      }
      return actions;
    },  
  },
  methods: {
    async search() {
      const response = await api.request('mediaeditor.list', {page: 1}, {filters: this.filters, number: 50});
      this.items = response.content.items;
    },
    async onAction(action, id) {
      switch (id) {
        case 'clear':
        case 'close':
          this.$emit('action', action, id);
          break;
        case 'save':
          if (this.mode === 'create') {
            const response = await api.request('mediaeditor.create', this.media);
            this.$emit('action', response.content.media, 'save');
          } else {
            const response = await api.request('mediaeditor.update', this.media);
            this.$emit('action', response.content.media, 'save');
          }
          break;
        case 'select':
          this.$emit('action', action, 'select');
          break;
      }
    },
  },
};
</script>

<style lang="sass">
.editor-modal-media
  display: flex
  flex-direction: column
  width: calc(100vw - 4em)
  height: calc(100vh - 4em)

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
    padding: .5em 1em

  &__select
    display: flex
    flex-direction: column
    overflow: hidden

  &__filters
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(300px, 33.333333%))

  &__filter 
    margin-top: 0 !important

  &__actions
    grid-template-columns: repeat(auto-fit, minmax(100px, 150px))
    justify-content: flex-end
    grid-gap: 1em
    padding: 1em

  &__actions > .editor-actions__action
    padding: 0 2em
    box-sizing: border-box

  &__content  
    height: calc(100% - 79px)
    overflow: auto

  &__frame
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(100px, 15%))
    justify-content: space-around
    padding: 1em
    grid-gap: .5em

  &__item
    padding: 1em
    display: flex
    flex-direction: column
    background: colors(editor, formframe)

  &__item:hover
    cursor: pointer
    box-shadow: 0 0 1em 1em colors(editor, border)
    transition: box-shadow .1s ease-in-out
    z-index: 10

  &__media
    max-width: 100%
    max-height: 200px
    width: auto
    height: auto
    object-fit: contain

</style>
