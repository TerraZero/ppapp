<template lang="pug">
  .interface(:class='classes')
    .interface__frame
      .interface__input
        .interface__input-mask
          CyberLabel.interface__label User
          CyberInputFrame(theme="blue")
            CyberTextfield(theme="blue").interface__user
          CyberLabel.interface__label Passwort
          CyberInputFrame(theme="blue")
            CyberTextfield(theme="blue").interface__pass
          CyberActions.interface__actions(:actions="actions", @click="action")
      .interface__hacking

    .interface__deco
      .interface__init-frame
        img.interface__init-frame-image(src="/images/hacker.gif")
        .interface__init-frame-text
          | {{ deco_init_frame_text }}
</template>

<script>
export default {
  data() {
    return {
      state: 0,
      actions: {
        breach: 'Breach',
        keylogger: 'Keylogger',
        rootkit: 'Rootkit',
        login: {
          text: 'Login',
          theme: 'yellow',
        },
      },
      deco_init_frame_text: '',
    };
  },
  computed: {
    classes() {
      const classes = [];

      classes.push('interface--state-' + this.state);
      return classes;
    },
  },
  methods: {
    action(index, item) {
      this.state = 1;
      this.deco_init_frame_text = 'Loading ' + item.text + ' ...';
    },
  },
}
</script>

<style lang="sass">
.interface
  width: 100vw
  height: 100vh
  background: black
  display: flex
  justify-content: center
  align-items: center

  &__frame
    display: flex
    width: 80vw
    height: 80vh
    border: 10px solid map.get($red, 'border')
    border-radius: 50px
    background: map.get($red, 'background')
    overflow: hidden

  &__label
    font-size: 26px

  &__input
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap

  &__hacking
    transition: all .3s 2s ease-in-out
    width: 0px
    height: 100%
    background: black

  &--state-1 &__hacking
    width: 100%

  &__actions
    font-size: 20px

  &__init-frame
    position: fixed
    top: 55vh
    left: 45vw
    width: 400px
    height: 300px
    background: #02d7f2F0
    z-index: 1000
    transform: scale(0)
    transform-origin: center center
    display: flex
    justify-content: center
    align-items: center

  &__init-frame:before
    content: ''
    position: absolute
    top: -10px
    left: -10px
    right: -10px
    bottom: -10px
    background: #FFFFFF90
    transform: scale(0)
    transform-origin: center center

  &--state-1 &__init-frame
    transition: all .3s .3s ease-in-out
    transform: scale(1)

  &--state-1 &__init-frame:before
    transition: all .3s ease-in-out
    transform: scale(1)

  &__init-frame-text
    z-index: 1000
    color: map.get($yellow, 'background')
    text-shadow: -2px 2px 0 map.get($yellow, 'deco-sub')
    font-size: 50px
    max-width: 90%

  &__init-frame-image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

</style>
