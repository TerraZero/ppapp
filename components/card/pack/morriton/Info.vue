<template lang="pug">
  .card-pack-paycyber-info 
    .card-pack-paycyber-info__field
      .card-pack-paycyber-info__label Pack
      .card-pack-paycyber-info__value {{ card.pack }}
    .card-pack-paycyber-info__field
      .card-pack-paycyber-info__label Title
      .card-pack-paycyber-info__value {{ card.title }}
    .card-pack-paycyber-info__field
      .card-pack-paycyber-info__label ID
      .card-pack-paycyber-info__value {{ card.id }}
</template>

<script>
export default {
  props: ['card'],
};
</script>

<style lang="sass">
.card-pack-paycyber-info
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

</style>
