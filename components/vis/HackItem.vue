<template lang="pug">
  .vis-hack-item(:class="classes", :style="styles", @click="decode()")
    .vis-hack-item__frame
      .vis-hack-item__indicator
      .vis-hack-item__address-wrapper
        .vis-hack-item__address
          .vis-hack-item__address-item(v-for="item, index in address", :key="index")
            | {{ item }}
      .vis-hack-item__wrapper
        .vis-hack-item__content
          .vis-hack-item__top
            LayoutRatio.vis-hack-item__icon-wrapper(ratio="1/1")
              MediaIcon.vis-hack-item__icon.vis-hack-item__icon-encoded(src="/help__t.svg")
              MediaIcon.vis-hack-item__icon.vis-hack-item__icon-decoded(:src="icon")
            .vis-hack-item__prop(v-for="i in 3", :key="i")
          .vis-hack-item__bottom
            .vis-hack-item__text
              | {{ showtext }}
</template>

<script>
export default {
  props: ['icon', 'text', 'address', 'indicator'],
  data() {
    return {
      showtext: '',
      open: false,
      decoded: false,
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.open) classes.push('vis-hack-item--open');
      if (this.decoded) classes.push('vis-hack-item--decoded');
      classes.push('vis-hack-item--indicator-' + this.indicator);
      return classes;
    },
    styles() {
      return {
        'animation-delay': '-' + Math.floor(Math.random() * 100) + 's',
        'animation-duration': (Math.floor(Math.random() * 10) + 100) + 's',
      };
    },
    encoded() {
      let encoded = '';
      for (let i = 0; i < this.text.length; i++) {
        encoded += this.text.charCodeAt(i).toString(16).toUpperCase();
      }
      return encoded;
    },
  },
  methods: {
    decode() {
      this.decoded = true;
      for (let i = 0; i <= this.text.length; i++) {
        setTimeout(() => {
          this.showtext = this.text.substring(0, i) + this.encoded.substring((i + 1) * 2);
        }, 100 * i);
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.open = true;
      this.showtext = this.encoded;
    }, Math.random() * 1000 + 150);
  },
}
</script>

<style lang="sass">
.vis-hack-item
  display: flex
  justify-content: center
  align-items: flex-end
  +layout__full
  color: white
  font-family: $fonts__mono
  animation: vis-hack-item--swim 15s ease-in-out alternate-reverse infinite

  &__frame
    position: relative
    width: 85%
    height: 60%
    margin-bottom: 5px

  &__wrapper
    +layout__full
    overflow: hidden

  &__content
    +layout__full
    display: flex
    flex-direction: column
    background: colors('black')
    transform: translateX(calc(-100% - 1px))
    transition: transform .3s .3s ease-out
    padding: 3px

  &__top
    display: grid
    grid-template-columns: 1fr 2fr 2fr 2fr
    height: 50%

  &__bottom
    height: 50%

  &--open &__content
    transform: translateX(0)

  &__icon
    +layout__full
    --icons--fill: white
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
  
  &__icon-encoded
    opacity: 1
    transition: opacity .3s ease-in-out

  &--decoded &__icon-encoded
    opacity: 0

  &__icon-decoded
    opacity: 0
    transition: opacity .3s ease-in-out

  &--decoded &__icon-decoded
    opacity: 1

  &__address-wrapper
    position: absolute
    bottom: calc(100% - 1px)
    right: 0
    width: 70%
    overflow: hidden

  &__address
    +layout__full
    display: grid
    grid-template-columns: repeat(4, 1fr)
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%)
    background: colors('black')
    transform: translateY(100%)
    transition: transform .3s .6s ease-out

  &--open &__address
    transform: translateY(0)

  &__address:before
    content: ''

  &__text
    +layout__full
    box-sizing: border-box
    text-overflow: ellipsis
    overflow: hidden

  &__indicator
    position: absolute
    right: 100%
    top: 0
    width: 10%
    height: 100%
    clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 90%)
    border-right: 4px solid
    opacity: 0
    transition: all .3s ease-out

  &--indicator-0 &__indicator
    background: colors('black')
    border-color: colors('black', 'dark-background')

  &--indicator-1 &__indicator
    background: colors('blue')
    border-color: colors('blue', 'dark-background')

  &--indicator-2 &__indicator
    background: colors('yellow')
    border-color: colors('yellow', 'dark-background')

  &--indicator-3 &__indicator
    background: colors('red')
    border-color: colors('red', 'dark-background')

  &--open &__indicator
    opacity: 1

@keyframes vis-hack-item--swim
  0%
     transform: translate(0, 0)
  10%
     transform: translate(2em, -2em)
  20%
     transform: translate(2em, 0px)
  30%
     transform: translate(-2em, 0)
  40%
     transform: translate(2em, 2em)
  50%
     transform: translate(-2em, -2em)
  60%
     transform: translate(0, 2em)
  70%
     transform: translate(-2em, 0)
  80%
     transform: translate(0, -2em)
  90%
     transform: translate(2em, 2em)
  100%
     transform: translate(0, 2em)

</style>
