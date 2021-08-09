<template lang="pug">
  el-submenu.navi-item(v-if="items.length", :index="item.id", :popper-append-to-body="false")
    template(slot="title")
      | {{ item.title }}
    el-menu-item.navi-item(v-if="item.action", :index="item.id")
      | - {{ item.action }} -
    MenuNavItem(v-for="item, key in items", :key="key", :item="item")
  el-menu-item.navi-item(v-else, :index="item.id")
    | {{ item.title }}
</template>

<script>
export default {
  props: ['item'],
  computed: {
    items() {
      const items = [];
      for (const index in this.item.items) {
        if (this.item.items[index].menu === false) continue;
        items.push(this.item.items[index]);
      }
      return items;
    },
  },
}
</script>

<style lang="sass">

</style>
