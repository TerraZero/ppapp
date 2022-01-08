<template lang="pug">
  .cyber-maskfield(:class="classes")
    input.cyber-maskfield__input(type="password", :value="masked", @input="input")

</template>

<script>

export default {
  props: ['theme', 'value', 'mask'],
  data() {
    return {
      clean: this.value || '',
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.theme) {
        classes.push('cyber-maskfield--' + this.theme);
      } else {
        classes.push('cyber-maskfield--default');
      }
      return classes;
    },

    masked() {
      return (this.mask || '*').repeat(this.clean.length || 0);
    },
  },
  methods: {
    input(event) {
      if (event.data === null) {
        if (event.inputType === 'deleteContentBackward') {
          this.clean = this.clean.substring(0, this.clean.length - 1);
        }
      } else {
        this.clean += event.data;
      }
      this.$emit('input', this.clean);
    },
  },
};
</script>

<style lang="sass">
@include colors__theme_input('.cyber-maskfield', 'input')

.cyber-maskfield

  &__input
    padding: 20px 15px
    outline: 0
    font-size: 30px

</style>
