<template lang="pug">
  .layout-container(:class="classes")
    .layout-container__header(:class="headerClasses")
      .layout-container__title(v-if="$slots['title'] || title")
        slot(name="title")
          | {{ title }}
      .layout-container__controls(v-if="$slots['controls'] || $slots['filters']")
        slot(name="controls")
        .layout-container__expander(@click="open = !open")
          i.el-icon-s-operation
    .layout-container__filters(v-if="$slots['filters']")
      .layout-container__filters-form
        slot(name="filters")
    .layout-container__content(v-loading="loading")
      slot
    .layout-container__pager
      slot(name="pager")
    .layout-container__actions(v-if="$slots['actions']")
      slot(name="actions")
</template>

<script>
export default {
  props: ['title', 'type', 'loading', 'small'],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    classes() {
      const classes = [];

      classes.push('layout-container--' + (this.type || 'default'));
      if (this.small !== undefined) {
        classes.push('layout-container--small');
      } else {
        classes.push('layout-container--box');
      }
      if (this.$slots['filters']) {
        classes.push('layout-container--has-filters');
      }
      if (this.open) {
        classes.push('layout-container--filters-open');
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
    position: relative

  &--has-filters &__header
    padding-right: 66px

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

  &__filters
    height: 5px
    overflow: hidden
    transition: height .3s ease-in-out

  &--filters-open &__filters
    height: auto

  &__filters-form
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 10px
    box-sizing: border-box
    overflow: hidden
    background: #e4f1ff
    height: 0

  &--filters-open &__filters-form
    height: auto
    padding: 10px

  &__expander
    display: flex
    justify-content: center
    align-items: center
    padding: 20px
    position: absolute
    top: 0
    right: 0
    bottom: 0
    background: #8cc5ff
    cursor: pointer
    border-top-right-radius: 4px

    &:hover
      background: #d4e8ff
    
  &__pager
    display: flex
    justify-content: center
    padding: 10px

</style>
