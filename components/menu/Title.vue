<template lang="pug">
  .menu-title(:is="(tag || 'h1')", v-html="title")
</template>

<script>
import Menu from '~/client/api/Menu';

const menu = Menu.create();

export default {
  props: ['tag'],
  data() {
    return {
      title: null,
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    async update() {
      const current = menu.current();

      this.title = await menu.getParam(current, 'title');
    },
  },
}
</script>

<style lang="sass">

</style>
