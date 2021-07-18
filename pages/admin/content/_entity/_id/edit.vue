<template lang="pug">
  .content-edit-page
    EntityForm(:entity="params.entity", :id="params.id", :page="true")
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
