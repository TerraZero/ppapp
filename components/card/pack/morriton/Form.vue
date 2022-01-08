<template lang="pug">
  .card-pack-morriton-form
    EditorInput.card-pack-morriton-form__field(label="Title")
      EditorTextfield(:value="value.title", @input="onInput('title', $event)")
    EditorInput.card-pack-morriton-form__field(label="ID")
      EditorTextfield(:value="value.id", @input="onInput('id', $event)")
</template>

<script>
export default {
  props: ['value'],
  methods: {
    onInput(index, value) {
      this.value[index] = value;
      this.$emit('input', this.value);
      this.$forceUpdate();
    },
  },
}
</script>

<style lang="sass">
.card-pack-morriton-form
  display: flex
  flex-wrap: wrap

  &__field
    width: 50%
  
  &__field + &__field
    margin-top: 0

</style>
