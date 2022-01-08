<template lang="pug">
  .cyber-frame(:class="classes")
    .cyber-frame__content(:style="styles")
      slot

</template>

<script>

export default {
  props: ['theme', 'border'],
  computed: {
    classes() {
      const classes = [];

      if (this.theme) {
        classes.push('cyber-input-frame--' + this.theme);
      } else {
        classes.push('cyber-input-frame--default');
      }
      return classes;
    },

    styles() {
      const styles = {};

      if (this.border) {
        styles.width = 'calc(100% - ' + this.border + ' * 2)';
        styles.height = 'calc(100% - ' + this.border + ' * 2)';
      }
      return styles;
    },
  },
};
</script>

<style lang="sass">
.cyber-frame
  +layout__center
  +layout__full
  clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)
  overflow: hidden

  &__content
    +layout__full
    clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)
    overflow: hidden

</style>
