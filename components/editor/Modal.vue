<template lang="pug">
  .editor-modal
    .editor-modal__content
      slot
</template>

<style lang="sass">
.editor-modal
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  justify-content: center
  align-items: center
  background: rgba(0, 0, 0, .5)
  z-index: 100000

  &__content
    border: 2px solid colors(editor, border)
    box-shadow: 0 0 2em 1em black
    background: colors(editor, sidebar)
    color: white

</style>
