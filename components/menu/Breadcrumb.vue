<template lang="pug">
  el-breadcrumb.menu-breadcrumb(v-if="items.length", separator-class="el-icon-arrow-right")
    el-breadcrumb-item.menu-breadcrumb__item(v-for="item in breadcrumb", :key="item.id", @click.native="handle(item)") {{ item.breadcrumb }}
</template>

<script>
import System from '~/client/system';
import API from '~/client/api/API';
import Menu from '~/client/api/Menu';

const api = API.create('/api');
const menu = Menu.create();

export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    System.instance.handler.on('goto', async () => {
      this.items = await menu.getBreadcrumb(this.$route);
    });
    System.instance.handler.on('menu.tree', async (menu) => {
      this.items = await menu.getBreadcrumb(this.$route);
    });
  },
  computed: {
    breadcrumb() {
      const items = [];
      for (const item of this.items) {
        if (item.breadcrumb) items.push(item);
      }
      return items;
    },
  },
  methods: {
    async handle(item) {
      menu.goto(item.id);
    },
  },
}
</script>

<style lang="sass">
.menu-breadcrumb
  padding: 10px
  background: #DCDFE6

  &__item
    cursor: pointer
</style>
