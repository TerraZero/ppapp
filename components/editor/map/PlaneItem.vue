<template lang="pug">
  .editor-map-plane-item
    .editor-map-plane-item__line
      | {{ plane.type }}: {{ plane.title }}
    EditorActions.editor-map-plane-item__actions(:actions="actions", @click="onClick")
</template>

<script>
import System from '~/client/system';
import API from '~/client/api/API';

const api = API.create('/api');
const logger = System.logger('editor');

export default {
  props: ['plane', 'plane_key', 'mode'],
  computed: {
    actions() {
      const actions = {
        edit: {
          icon: 'edit',
        },
        del: {
          icon: 'delete',
        },
        add: {
          icon: 'plus',
        },
      };

      if (this.mode) {
        actions[this.mode].type = 'primary';
      }

      return actions;
    },
  },
  methods: {
    async onClick(action, index) {
      this.$emit('action', index, this.plane, this.plane_key);
    },
  },
}
</script>

<style lang="sass">
.editor-map-plane-item
  width: 100%
  margin-top: 5px
  background: colors(black, light-background)
  color: white
  cursor: pointer
  padding: 10px
  transition: background .3s ease-in-out
  border-left: 5px solid transparent

  &:hover
    background: colors(black, hover-background)

  &--active
    border-left: 5px solid colors(red)

  &__actions
    grid-template-columns: repeat(4, 1fr)
    margin-top: 5px

  &__action--highlighted
    border-bottom: 5px solid colors(orange)

</style>
