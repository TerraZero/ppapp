<template lang="pug">
  .editor-map-item-form
    EditorActions.editor-map-item-form__actions(:actions="actions", @click="onAction")
    EditorInput(label="Filter")
      EditorTextfield(v-model="filter", placeholder="Filter")
    .editor-map-item-form__content
      .editor-map-item-form__items
        EditorTitle.editor-map-item-form__title(type="highlight")
          | Aktive Items
        EditorMapIconItem.editor-map-item-form__item(v-for="item in filteredActive", :key="item.id", :item="item", :path="config.path", @click.native="onRemoveItem(item)")
      .editor-map-item-form__items
        EditorTitle.editor-map-item-form__title(type="highlight")
          | Items
        EditorMapIconItem.editor-map-item-form__item(v-for="item in filteredItems", :key="item.id", :item="item", :path="config.path", @click.native="onAddItem(item)")
</template>

<script>
import Config from '~/static/data/items.json';

export default {
  props: ['item', 'items'],
  data() {
    return {
      filter: '',
      config: Config,
      actions: {
        close: {
          icon: 'close',
        },
      },
    };
  },
  computed: {
    filteredActive() {
      const items = [];

      if (!this.items) return items;

      const item = this.items.find(v => v.x === this.item.x && v.y === this.item.y);
      if (item) {
        const icon = this.find(item.id);
        if (icon) {
          items.push(icon);
        }
      }
      return items;
    },
    filteredItems() {
      const items = [];

      for (const item of this.config.items) {
        if (item.search.includes(this.filter.toLowerCase())) {
          items.push(item);
        }
      }
      return items;
    },
  },
  methods: {
    find(id) {
      return Config.items.find((item) => {
        return item.id === id;
      }) || null;
    },
    onAction(action, key) {
      this.$emit('action', key, this.items);
    },
    onAddItem(item) {
      this.$emit('action', 'add', item);
    },
    onRemoveItem(item) {
      this.$emit('action', 'remove', item);
    },
  },
}
</script>

<style lang="sass">
.editor-map-item-form
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  overflow: auto

  &__content
    display: flex
    flex-direction: column

  &__title
    margin: 5px 0 
    color: white
    --editor-title--background: #{colors(black, light-background)}

  &__items
    max-height: 50%

  &__actions
    grid-template-columns: repeat(4, 1fr)
    margin-bottom: 5px
</style>
