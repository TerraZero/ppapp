<template lang="pug">
  el-menu.nav(mode="horizontal", background-color="#545c64", text-color="#fff", active-text-color="#ffd04b", @select="select")
    MenuNavItem(v-for="item, key in items", :key="key", :item="item")
    el-menu-item(index="system.logs")
      el-badge.nav__badge(:hidden="logdata.number === 0", :value="logdata.number", :type="logdata.type")
        i.el-icon-message-solid
</template>

<script>
import System from '~/client/system';
import Menu from '~/client/api/Menu';

const menu = Menu.create();

export default {
  data() {
    return {
      logs: this.$store.state.logs.logs,
      menu: null,
    };
  },
  computed: {
    items() {
      const items = [];

      for (const index in this.menu) {
        if (this.menu[index].menu === false) continue;
        items.push(this.menu[index]);
      }
      return items;
    },

    logdata() {
      let number = 0;
      let type = 0;

      this.logs.map((v) => {
        if (v.isNew) {
          number++;
          if (v.type === 'warning' && type < 1) type = 1;
          if (v.type === 'error' && type < 2) type = 2;
        }
      });

      return {
        number,
        type: ['primary', 'warning', 'danger'][type],
      };
    },
  },
  methods: {
    select(id) {
      menu.goto(id);
    },

    async updateMenu() {
      this.menu = await menu.getTree();
    },
  },
  async fetch() {
    await System.instance.handler.on('rebuild', (response, rebuild) => {
      if (rebuild.menu) {
        this.updateMenu();
      }
    });
    await this.updateMenu();
  },
}
</script>

<style lang="sass">
.nav

  &__badge .el-badge__content
    top: 15px

</style>
