<template lang="pug">
  .cyber
    h1 Test - Cyber
    .cyber__test(v-for="name in themes")
      h2 Cyber > Textfield > {{ name }}
      .cyber__grid
        .cyber__item(v-for="color in backgrounds", :class="'cyber__' + color")
          CyberInputFrame(:theme="name")
            CyberTextfield(:theme="name")
    .cyber__test(v-for="name in themes")
      h2 Cyber > Frame > {{ name }}
      .cyber__grid
        .cyber__item(v-for="color in backgrounds", :class="'cyber__' + color")
          CyberInputFrame(:theme="name")
            CyberMaskfield(:theme="name")

</template>

<script>
export default {
  data() {
    return {
      themes: ['default', 'blue', 'red', 'yellow', 'black'],
      backgrounds: ['white', 'black', 'yellow', 'red', 'blue'],
    };
  },
  methods: {

  },
}
</script>

<style lang="sass">
.cyber

  &__grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr

  &__item
    display: flex
    justify-content: center
    align-items: center
    padding: 20px

  &__white
    @include colors__theme_background($white)

  &__yellow
    @include colors__theme_background($yellow)

  &__black
    @include colors__theme_background($black)

  &__red
    @include colors__theme_background($red)
  
  &__blue
    @include colors__theme_background($blue)

</style>
