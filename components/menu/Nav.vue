<template lang="pug">
  el-menu.nav(mode="horizontal", background-color="#545c64", text-color="#fff", active-text-color="#ffd04b", @select="select")
    MenuNavItem(v-for="item, key in menu", :key="key", :item="item")
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
    select(id) {
      api.gotoMenuItem(id);
    }
  },
  async fetch() {
    this.menu = (await api.menu());
  },
}
</script>

<style lang="sass">

</style>
