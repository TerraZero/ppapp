<template lang="pug">
  .card-display 
    .card-display__info(v-if="info")
      component(:is="infoComponent", :key="pack", :card="card")
    .card-display__content
      component(:is="component", :key="pack", :card="card")
</template>

<script>
export default {
  props: ['card', 'info'],
  computed: {
    pack() {
      return this.card.pack || 'none';
    },
    component() {
      return 'CardPack' + this.pack.substring(0, 1).toUpperCase() + this.pack.substring(1) + 'Display';
    },
    infoComponent() {
      return 'CardPack' + this.pack.substring(0, 1).toUpperCase() + this.pack.substring(1) + 'Info';
    },
  },
}
</script>

<style lang="sass">
.card-display
  
  &__content
    width: 6.6cm
    height: 9.3cm

</style>
