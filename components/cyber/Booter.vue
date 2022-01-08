<template lang="pug">
  .cyber-booter(:class="classes")
    .cyber-booter__wrapper
      .cyber-booter__frame
        .cyber-booter__title
        .cyber-booter__body
        .cyber-booter__loading
</template>

<script>
import Typer from 'typer-js';

export default {
  data() {
    return {
      state: 0,
    }
  },
  computed: {
    classes() {
      const classes = [];

      classes.push('cyber-booter--state-' + this.state);
      return classes;
    },
  },
  mounted() {
    const title = Typer('.cyber-booter__title')
      .cursor({block: true, blink: 'hard', color: '#fd0130'})
      .run(() => {
        this.state = 1;
      })
      .line('Booting ...')
      .run(() => {
        this.state = 2;
      })
      .end(() => {
        setTimeout(() => {
          this.state = 3;
          const body = Typer('.cyber-booter__body')
            .cursor({block: true, blink: 'hard', color: '#fd0130'})
            .line('Loading system ...', {speed: 15})
            .line('Loading resources ...', {speed: 15})
            .line('Execute breach protocol ...', {speed: 15})
            .line('Access granted ...', {speed: 15})
            .end(() => {
              setTimeout(() => {
                this.state = 4;
                setTimeout(() => {
                  this.$emit('finished');
                }, 500);
              }, 400);
            });
        }, 700);
      });
  }
};
</script>

<style lang="sass">
.cyber-booter
  color: map.get($red, 'background')
  background: black
  z-index: 10000
  display: flex
  justify-content: center
  align-items: center
  font-family: $fonts__console
  font-size: 18px

  &__wrapper
    padding: 5px
    position: relative
    display: flex
    justify-content: center
    align-items: center
    border: 2px solid map.get($red, 'background')
    width: 110px
    height: 72px
    transition: all .3s ease-in-out

  &--state-2 &__wrapper,
  &--state-3 &__wrapper
    width: 240px
    height: 170px

  &--state-4 &__wrapper
    width: 240px
    height: 72px

  &__wrapper:before,
  &__wrapper:after
    content: ''
    position: absolute
    background: black
    z-index: 0

  &__wrapper:before
    width: calc(100% + 4px - 15px)
    height: calc(100% + 4px)
    top: -2px
    left: 50%
    transform: translateX(-50%)
  
  &__wrapper:after
    height: calc(100% + 4px - 15px)
    width: calc(100% + 4px)
    top: 50%
    left: -2px
    transform: translateY(-50%)

  &__title
    border: 2px solid map.get($red, 'background')
    background: map.get($red, 'input-background')
    width: 100%

  &__frame
    display: flex
    flex-direction: column
    border: 2px solid map.get($red, 'background')
    position: relative
    z-index: 1
    width: 96px
    height: 55px
    transition: all .3s .4s ease-in-out
    padding: 2px

  &--state-2 &__frame,
  &--state-3 &__frame
    width: 226px
    height: 156px

  &--state-4 &__frame
    transition: all .3s ease-in-out
    width: 226px
    height: 55px

  &__body
    padding: 2px 0
    overflow: hidden
    height: 100%

  &__loading
    width: 100%
    min-height: 20px
    border: 2px solid map.get($red, 'background')
    position: relative

  &__loading:after
      content: ''
      position: absolute
      top: 2px 
      left: 2px 
      bottom: 2px 
      width: 0
      background: map.get($red, 'background')
      transition: width .3s linear
      will-change: width

  &--state-1 &__loading:after,
  &--state-2 &__loading:after
    width: 10%

  &--state-3 &__loading:after
    width: 90%
    transition: width 4s linear

  &--state-4 &__loading:after
    width: calc(100% - 4px)
    transition: width 1s linear

</style>
