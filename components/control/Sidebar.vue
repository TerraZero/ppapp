<template lang="pug">
  .control-sidebar
    .control-sidebar__state
      | {{ number }}
    .control-sidebar__content
      ControlAction.control-sidebar__action(v-for="action in actions", :key="action.title", :action="action")

</template>

<script>

export default {
  props: ['actions'],
  computed: {
    number() {
      return this.actions.length;
    },
  },
};
</script>

<style lang="sass">
.control-sidebar
  width: 50px
  background: colors(black)
  transition: width .2s .2s $animations__smooth, height .2s $animations__smooth
  position: relative
  height: 50px
  overflow: hidden

  &:hover
    width: 30%
    height: 100%
    transition: width .2s $animations__smooth, height .2s .2s $animations__smooth

  &__state
    height: 50px
    background: colors(red)
</style>
