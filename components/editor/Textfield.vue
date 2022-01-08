<template lang="pug">
  el-input.editor-textfield(:value="value", :placeholder="placeholder", :disabled="disabled", @input="$emit('input', $event)")
</template>

<script>
export default {
  props: ['value', 'placeholder', 'disabled'],
}
</script>

<style lang="sass">
.editor-textfield
  width: 100%

  & > .el-input__inner
    border: 0
    border-radius: 0
    width: 100%
    height: 100%
    min-height: 40px
    background: var(--editor-textfield--background, white)
    color: var(--editor-textfield--color, inherit)

  &.is-disabled > .el-input__inner
    background: var(--editor-textfield--background-disabled, grey)
</style>
