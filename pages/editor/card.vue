<template lang="pug">
  .editor-card(:class="classes")
    .editor-card__content
      .editor-card__grid
        CardDisplay.editor-card__card(v-for="card, index in items", :key="JSON.stringify(card)", :card="card", :info="true", @click.native="onClick(card)")
      .editor-card__sidebar
        EditorActions.editor-card__actions(:actions="actions", @click="onAction")
    .editor-card__edit
      CardEdit.editor-card__form(ref="edit", v-if="card", v-model="card", @control="onControl")

</template>

<script>
import System from '~/client/system';
import API from '~/client/api/API';

const api = API.create('/api');
const logger = System.logger('card');

export default {
  mounted() {
    this.search();
  },
  data() {
    return {
      cards: [],
      card: null,
      filters: {},
      edit: false,
      actions: {
        add: {
          icon: 'plus',
          type: 'primary',
        },
        filter: {
          icon: 's-operation',
        },
        save: {
          icon: 'download',
        },
      },
    };
  },
  computed: {
    items() {
      return this.cards.sort((a, b) => {
        return b.title > a.title ? -1 : a.title > b.title ? 1 : 0;
      });
    },
    classes() {
      const classes = [];

      if (this.edit) {
        classes.push('editor-card--open');
      }
      return classes;
    },
  },
  methods: {
    onAction(action, id) {
      switch (id) {
        case 'add': 
          this.card = {new: true};
          this.edit = true;
          break;
        default:
          logger.note('TODO: Action "' + id + '"');
          break;
      }
    },
    onClick(card) {
      this.card = card;
      this.edit = true;
    },
    async onControl(event) {
      switch (event) {
        case 'delete':
          await api.request('cardeditor.remove', {id: this.card.id});
          this.cards.splice(this.cards.findIndex((c) => {
            return c.id === this.card.id;
          }), 1);
          break;
        case 'close':
          if (!this.card.new) {
            await api.request('cardeditor.save', this.card);
            this.search();
          }
          break;
        case 'add':
          this.card.new = false;
          await api.request('cardeditor.save', this.card);
          this.search();
          break;
      }
      this.edit = false;
      setTimeout(() => {
        this.card = null;
      }, 300);
    },
    async search() {
      const response = await api.request('cardeditor.list', {page: 1}, {number: 100});
      this.cards = response.content.items;
    },  
  },
}
</script>

<style lang="sass">
.editor-card
  +layout__screen
  background: colors(editor, dark-background)
  position: relative

  &__grid
    display: grid
    grid-template-columns: repeat(auto-fill, 6.6cm)
    grid-gap: 1em
    padding: 1em
    width: 100%
    justify-content: center
    align-items: center
    overflow: auto

  &__edit
    +layout__full
    position: absolute
    top: 100%
    left: 0
    transition: top .3s $animations__smooth
    z-index: 100

  &--open &__edit
    top: 0

  &__card
    cursor: pointer
    transition: box-shadow .2s $animations__smooth

  &__card:hover
    box-shadow: 0 0 1em 1em colors(editor, border)
    z-index: 10

  &__content
    +layout__full
    display: flex

  &__sidebar
    min-width: 4em
    flex: 0
    background: colors(editor, sidebar)
    +editor__border-left

</style>
