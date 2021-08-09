<template lang="pug">
  SystemForm(v-if="info", id="create.bundle.form", :info="info")
</template>

<script>
export default {
  layout: "admin",
  async asyncData({ params }) {
    return {
      info: {
        entity: params.entity,
      },
    };
  },
}
</script>

<style lang="sass">

</style>
