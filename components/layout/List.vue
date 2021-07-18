<template lang="pug">
  LayoutContainer.list
    template(#title)
      slot(name="title")
    template(#actions)
      slot(name="actions")
    .list__item(v-for="item, index in items")
      slot(:item="item", :index="index", :items="items")
</template>

<script>
export default {
  props: ['items'],
}
</script>

<style lang="sass">
.list

  &__item
    padding: 10px 0

  &__item + &__item
    border-top: 4px solid #DCDFE6
</style>
