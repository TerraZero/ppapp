<template lang="pug">
  el-button.menu-back(icon="el-icon-close", @click.native="handle") {{ label }}
</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['label'],
  data() {
    return {
      parent: null,
      current: this.$store.state.menu.current,
    };
  },
  async mounted() {
    const parts = this.current.id.split('.');
    parts.pop();
    this.parent = await api.getMenuItem(parts.join('.'));
  },
  methods: {
    handle() {
      api.gotoMenuItem(this.parent.id);
    },
  },
}
</script>

<style lang="sass">

</style>
