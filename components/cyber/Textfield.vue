<template lang="pug">
  .cyber-textfield(:class="classes")
    input.cyber-textfield__input(type="text", :value="value", @input="$emit('input', $event.target.value)")

</template>

<script>

export default {
  props: ['theme', 'value'],
  computed: {
    classes() {
      const classes = [];

      if (this.theme) {
        classes.push('cyber-textfield--' + this.theme);
      } else {
        classes.push('cyber-textfield--default');
      }
      return classes;
    },
  },
  methods: {
    input(text) {
      this.$emit('input', text);
    },
  },
};
</script>

<style lang="sass">
+colors__theme_input('.cyber-textfield', 'input')

.cyber-textfield
  +colors__themeable

  &__input
    width: 100%
    padding: 20px 15px
    outline: 0
    font-size: 30px

</style>
