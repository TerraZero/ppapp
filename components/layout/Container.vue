<template lang="pug">
  .container(:class="'container--' + (type || 'default')")
    .container__header
      .container__title
        slot(name="title")
          | {{ title }}
      .container__actions
        slot(name="actions")
    .container__content
      slot
</template>

<script>
export default {
  props: ['title', 'type'],
}
</script>

<style lang="sass">
.container
  margin: 20px
  box-shadow: 0 0 20px rgba(0, 0, 0, .3)
  border-radius: 4px

  &__header
    display: flex
    justify-content: space-between
    padding: 10px
    background: #DCDFE6
    border-top-right-radius: 4px
    border-top-left-radius: 4px

  &--danger &__header
    background: #F56C6C

  &__content
    padding: 10px
</style>
