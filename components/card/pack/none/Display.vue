<template lang="pug">
  .card-pack-none-display 
    .card-pack-none-display__content
      .card-pack-none-display__text
        | No Pack Selected
      i.card-pack-none-display__icon(:class="['el-icon-error']")
</template>

<script>
export default {
  props: ['card'],
}
</script>

<style lang="sass">
.card-pack-none-display
  +layout__full
  +layout__center
  background: colors(editor, state-error)
  text-align: center
  font-size: 25px

  &__icon
    margin-top: .5em
    font-size: 40px

</style>
