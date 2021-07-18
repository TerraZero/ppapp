<template lang="pug">
  .page
    h1 Delete Schema "{{ params.entity }}:{{ params.bundle }}" [TODO]

</template>

<script>
export default {
  layout: "admin",
  async asyncData({ params }) {
    return { params };
  }
}
</script>

<style lang="sass">

</style>
