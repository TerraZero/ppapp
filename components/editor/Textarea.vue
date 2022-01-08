<template lang="pug">
  el-input.editor-textarea(type="textarea", :rows="4", :value="value", :placeholder="placeholder", :disabled="disabled", @input="$emit('input', $event)")
</template>

<script>
export default {
  props: ['value', 'placeholder', 'disabled'],
}
</script>

<style lang="sass">
.editor-textarea
  width: 100%

  & > textarea
    border: 0
    border-radius: 0
    width: 100%
    background: var(--editor-textfield--background, white)
    color: var(--editor-textfield--color, inherit)
</style>
