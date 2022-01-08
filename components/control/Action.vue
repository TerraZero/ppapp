<template lang="pug">
  .control-action
    .control-action__state
    .control-action__content
      .control-action__title
        | {{ action.title }}
      .control-action__actions

</template>

<script>

export default {
  props: ['action'],
  computed: {
    
  },
};
</script>

<style lang="sass">

</style>
