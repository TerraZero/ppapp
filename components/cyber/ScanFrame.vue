<template lang="pug">
  .scan-frame(:class="classes")
    .scan-frame__frame
      .scan-frame__content(:style="styles")
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
        styles.height = 'calc(100% - ' + this.border + ' * 2)';
      }
      return styles;
    },
  },
};
</script>

<style lang="sass">
.scan-frame
  +layout__full
  position: relative

  &__frame
    +layout__center
    +layout__full
    overflow: hidden
    background: var(--cyber-scan-frame__border)
    clip-path: polygon(0 0, 60px 0, 75px 15px, calc(100% - 35px) 15px, calc(100% - 20px) 0, 100% 0, 100% 100%, calc(100% - 90px) 100%, calc(100% - 105px) calc(100% - 15px), 0 calc(100% - 15px))

  &__content
    +layout__full
    clip-path: polygon(0 0, 60px 0, 75px 15px, calc(100% - 35px) 15px, calc(100% - 20px) 0, 100% 0, 100% 100%, calc(100% - 90px) 100%, calc(100% - 105px) calc(100% - 15px), 0 calc(100% - 15px))
    padding: 15px 0
    background: var(--cyber-scan-frame__background)
    position: relative

  &:before
    content: ''
    position: absolute
    top: 11px
    left: 75px
    background: var(--cyber-scan-frame__deco)
    width: calc(100% - 110px)
    height: 2px
    display: inline-block

  &:after
    content: ''
    position: absolute
    bottom: 11px
    left: 0
    background: var(--cyber-scan-frame__deco)
    width: calc(100% - 105px)
    height: 2px
    display: inline-block

</style>
