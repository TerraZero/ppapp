<template lang="pug">
  el-submenu.navi-item(v-if="item.items && item.items.length", :index="index", :popper-append-to-body="false")
    template(slot="title")
      | {{ item.title }}
    el-menu-item.navi-item(:index="index")
      | - {{ item.title }} -
    MenuNavItem(v-for="item in item.items", :key="item.index", :item="item", :index="index + '/' + item.index")
  el-menu-item.navi-item(v-else, :index="index")
    | {{ item.title }}
</template>

<script>
export default {
  props: ['item', 'index'],
}
</script>

<style lang="sass">

</style>
