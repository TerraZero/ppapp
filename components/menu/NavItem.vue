<template lang="pug">
  el-submenu.navi-item(v-if="item.items", :index="item.id", :popper-append-to-body="false")
    template(slot="title")
      | {{ item.title }}
    el-menu-item.navi-item(:index="item.id")
      | - {{ item.title }} -
    MenuNavItem(v-for="item, key in item.items", :key="key", :item="item")
  el-menu-item.navi-item(v-else, :index="item.id")
    | {{ item.title }}
</template>

<script>
export default {
  props: ['item'],
}
</script>

<style lang="sass">

</style>
