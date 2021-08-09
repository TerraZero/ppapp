<template lang="pug">
  .layout-container(:class="classes")
    .layout-container__header(:class="headerClasses")
      .layout-container__title(v-if="$slots['title'] || title")
        slot(name="title")
          | {{ title }}
      .layout-container__controls(v-if="$slots['controls']")
        slot(name="controls")
    .layout-container__content(v-loading="loading")
      slot
    .layout-container__actions(v-if="$slots['actions']")
      slot(name="actions")
</template>

<script>
export default {
  props: ['title', 'type', 'loading', 'small'],
  computed: {
    classes() {
      const classes = [];

      classes.push('layout-container--' + (this.type || 'default'));
      if (this.small !== undefined) {
        classes.push('layout-container--small');
      } else {
        classes.push('layout-container--box');
      }
      return classes;
    },

    headerClasses() {
      const classes = [];

      classes.push('message__color--' + this.type);
      return classes;
    },
  },
}
</script>

<style lang="sass">
.layout-container
  box-shadow: 0 0 20px rgba(0, 0, 0, .3)
  border-radius: 4px

  &--box
    margin: 20px

  &__header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    background: #DCDFE6
    border-top-right-radius: 4px
    border-top-left-radius: 4px

  &--small &__header
    background: #909399

  &--danger &__header
    background: #F56C6C

  &__content
    padding: 10px

  &__controls
    display: flex
    justify-content: right
    gap: 10px

  &__actions
    text-align: right
    padding: 10px
</style>
