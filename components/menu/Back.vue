<template lang="pug">
  el-button.menu-back(icon="el-icon-close", @click.native="handle") {{ label }}
</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['label', 'id'],
  methods: {
    handle() {
      api.gotoParent(this.id || null);
    },
  },
}
</script>

<style lang="sass">

</style>
