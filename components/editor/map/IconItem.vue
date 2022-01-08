<template lang="pug">
  .editor-map-icon-item
    img.editor-map-icon-item__icon(:src="icon")
    .editor-map-icon-item__title
      | {{ item.name }}
</template>

<script>
import Path from 'path';
import System from '~/client/system';
import API from '~/client/api/API';

const api = API.create('/api');
const logger = System.logger('editor');

export default {
  props: ['item', 'path'],
  computed: {
    icon() {
      return Path.join(this.path, this.item.icon);
    },
  },
  methods: {
    
  },
}
</script>

<style lang="sass">
.editor-map-icon-item
  display: flex
  color: white
  background: colors(black, light-background)
  transition: background .3s ease-in-out
  cursor: pointer

  & + &
    margin-top: 5px

  &:hover
    background: colors(black, hover-background)

  &__icon
    background: colors(black, hover-background)
    height: 50px
    flex-shrink: 0
    padding: 3px

  &__title
    padding: 10px
    width: 100%
    display: flex
    align-items: center
  
</style>
