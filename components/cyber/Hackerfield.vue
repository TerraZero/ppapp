<template lang="pug">
  .cyber-hackerfield(:class="classes")
    h1 hacker
</template>

<script>

export default {
  props: ['theme'],
  data() {
    return {
      clean: this.value || '',
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.theme) {
        classes.push('cyber-hackerfield--' + this.theme);
      } else {
        classes.push('cyber-hackerfield--default');
      }
      return classes;
    },
  },
};
</script>

<style lang="sass">

</style>
