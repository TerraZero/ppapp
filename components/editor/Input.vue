<template lang="pug">
  .editor-input
    .editor-input__label(v-if="label")
      | {{ label }}
    .editor-input__input
      slot
</template>

<script>
export default {
  props: ['label'],
}
</script>

<style lang="sass">
.editor-input
  width: 100%
  border: 4px solid var(--editor-input--label--background, #dfe2e2)

  & + &
    margin-top: 5px

  &__label
    border: 0
    border-radius: 0
    width: 100%
    padding: 5px 10px
    background: var(--editor-input--label--background, #dfe2e2)

</style>
