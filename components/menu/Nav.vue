<template lang="pug">
  el-menu.nav(mode="horizontal", background-color="#545c64", text-color="#fff", active-text-color="#ffd04b", @select="select")
    MenuNavItem(v-for="item, key in menu", :key="key", :item="item", :index="item.index")
</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  data() {
    return {
      menu: null,
    };
  },
  methods: {
    select(path) {
      this.$router.push('/' + path);
    }
  },
  async fetch() {
    const menu = [
      {index: 'admin/content', title: 'Content'},
      {index: 'admin/schema', title: 'Schema'},
    ];

    
    const entities = (await api.request('schema.view')).content.entities;
    for (const entity in entities) {
      menu[0].items = menu[0].items || [];
      menu[1].items = menu[1].items || [];

      const index = menu[0].items.length;
      menu[0].items.push({index: entity, title: entities[entity]});
      menu[1].items.push({index: entity, title: entities[entity]});

      const bundles = (await api.request('schema.view', { entity })).content.bundles;

      for (const bundle in bundles) {
        menu[0].items[index].items = menu[0].items[index].items || [];
        menu[1].items[index].items = menu[1].items[index].items || [];

        menu[0].items[index].items.push({index: bundle, title: bundles[bundle]});
        menu[1].items[index].items.push({index: bundle, title: bundles[bundle]});
      }
    }

    this.menu = menu;
  },
}
</script>

<style lang="sass">

</style>
