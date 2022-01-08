<template lang="pug">
  el-select.editor-select(:value="value", :placeholder="placeholder", @input="$emit('input', $event)", popper-class="editor-select__dropdown", :filterable="create", :allow-create="create")
    el-option.editor-select__option(v-for="option, index in options", :key="index", :label="option", :value="index")
</template>

<script>
export default {
  props: ['value', 'placeholder', 'options', 'create'],
  data() {
    return {
      options: [
        {}
      ]
    }
  },
}
</script>

<style lang="sass">
.editor-select
  width: 100%

  & input
    border: 0
    border-radius: 0
    width: 100%
    background: var(--editor-select--background, white)
    color: var(--editor-select--color, inherit)

.editor-select__dropdown.el-select-dropdown
  border: 0
  border-radius: 0
  margin: 0 !important
  z-index: 100000

  & > .popper__arrow
    display: none

.editor-select__dropdown .el-select-dropdown

  &__list
    padding: 0
  
  &__item
    padding: 0 30px 0 15px
    background: var(--editor-select--background, white) !important
    color: var(--editor-select--color, inherit) !important
  
  &__item.hover
    background: var(--editor-select--background-hover, white) !important

</style>
