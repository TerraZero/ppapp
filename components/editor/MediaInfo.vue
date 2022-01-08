<template lang="pug">
  .editor-media-info 
    .editor-media-info__field
      .editor-media-info__label Name
      .editor-media-info__value {{ item.name }}
    .editor-media-info__field
      .editor-media-info__label Type
      .editor-media-info__value {{ item.type }}
</template>

<script>
export default {
  props: ['value', 'media'],
  mounted() {
    this.item = this.media;
  },
  data() {
    return {
      item: '',
    };
  },
};
</script>

<style lang="sass">
.editor-media-info
  background: colors(editor, border)
  padding-top: 4px

  &__field
    display: flex
    justify-content: space-between
    padding: 0 4px 4px

  &__label,
  &__value
    padding: .3em
    width: calc(50% - 2px)
    background: colors(editor, formframe)
    text-overflow: ellipsis
    overflow: hidden

</style>
