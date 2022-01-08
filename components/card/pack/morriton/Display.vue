<template lang="pug">
  .card-pack-morriton-display 
    | {{ card.title }}
</template>

<script>
export default {
  props: ['card'],
}
</script>

<style lang="sass">
.card-pack-morriton-display
  +layout__full
  background: blue

</style>
