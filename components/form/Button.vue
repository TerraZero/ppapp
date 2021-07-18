<template lang="pug">
  .button(@mouseover="circle = false", @mouseleave="circle = true")
    el-button(:type="type", :icon="icon", :circle="circle")
      span(v-if="!circle") {{ text }}
</template>

<script>
export default {
  props: ['type', 'icon', 'text'],
  data() {
    return {
      circle: true,
    };
  }
}
</script>

<style lang="sass">
.button
  display: inline-block

  & + &
    margin-left: 10px
</style>
