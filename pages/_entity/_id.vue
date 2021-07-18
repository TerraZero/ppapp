<template lang="pug">
  .page
    h1 Show "{{ params.entity }}:{{ params.id }}" [TODO]

</template>

<script>
export default {
  async asyncData({ params }) {
    return { params };
  }
}
</script>

<style lang="sass">

</style>
