<template lang="pug">
  .menu-title(:is="(tag || 'h1')")
    | {{ current.title }}
</template>

<script>

export default {
  props: ['tag'],
  data() {
    return {
      current: this.$store.state.menu.current,
    };
  },
}
</script>

<style lang="sass">

</style>
