<template lang="pug">
  LayoutContainer
    template(#title)
      MenuTitle
    template(#controls)
      MenuBack(label="Back")
    EntityInfo
    template(#actions, v-if="ready")
      el-button(type="primary", icon="el-icon-check", :loading="loading", @click="save()") Save
      MenuBack(label="Abort")
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      ready: false,
    };
  },
  async asyncData({ params }) {
    return { params };
  }
}
</script>

<style lang="sass">

</style>
