<template lang="pug">
  .card-pack-paycyber-display
    .card-pack-paycyber-display__background
    .card-pack-paycyber-display__content
      .card-pack-paycyber-display__head
        .card-pack-paycyber-display__type
          img.card-pack-paycyber-display__img(:src="source('type')")
        .card-pack-paycyber-display__title {{ card.title }}
      .card-pack-paycyber-display__middle
        .card-pack-paycyber-display__frame
          .card-pack-paycyber-display__media(:style="mediaStyle")
            EditorMedia.card-pack-paycyber-display__image(v-if="card.image", :value="card.image")
        .card-pack-paycyber-display__stats
          .card-pack-paycyber-display__stat.card-pack-paycyber-display__damage-dice
            img.card-pack-paycyber-display__damage-dice-image(:src="source('damage_dice', '.svg')")
      .card-pack-paycyber-display__bottom
        .card-pack-paycyber-display__description
          .card-pack-paycyber-display__line {{ card.line }}
          .card-pack-paycyber-display__text(v-html="card.description")
</template>

<script>
export default {
  props: ['card'],
  computed: {
    mediaStyle() {
      const style = {};

      if (this.card.mediaframe) {
        style.padding = this.card.mediaframe;
      }
      return style;
    },
  },
  methods: {
    source(field, ext = '') {
      return '/images/editor/paycyber/icons/' + this.card[field] + ext;
    },
  },
}
</script>

<style lang="sass">
.card-pack-paycyber-display
  +layout__full
  position: relative
  overflow: hidden
  
  &__background
    position: absolute
    top: 0
    left: 0
    +layout__full
    background: url('/images/editor/paycyber/paycyber-background.webp')
    background-size: cover
    background-position: center
    filter: invert(1)

  &__content
    position: relative

  &__head
    display: flex
    filter: drop-shadow(0 2px 4px black)

  &__type
    display: flex
    background: #bebebe
    flex-shrink: 0
    position: relative
    padding: 5px
    filter: drop-shadow(2px 0 4px black)

  &__img
    width: 40px
    filter: drop-shadow(1px 1px 2px black) drop-shadow(-1px -1px 2px black)

  &__type:after
    content: ''
    width: 0
    height: 0
    position: absolute
    left: 100%
    top: 0
    +triangle__top_left(51px, 20px, #bebebe)

  &__title
    background: #999999
    padding: 10px 10px 10px 20px
    max-height: 40px
    flex-grow: 1
    color: black
    font-weight: bold

  &__middle
    display: flex
    margin-top: 5px

  &__frame
    width: 200px
    height: 125px
    box-sizing: border-box
    padding: 5px
    flex-shrink: 0

  &__stats
    width: 100%
    padding: 5px 0

  &__stat
    border: 2px solid #474747
    border-right: 0
    display: flex
    background: rgba(0, 0, 0, .6)

  &__damage-dice
    padding: 5px 10px
  
  &__damage-dice-image
    filter: drop-shadow(0 0 2px white)

  &__media
    +layout__full
    +layout__center
    border: 5px outset #8D9D9E
    background: rgba(0, 0, 0, .4)
    box-shadow: .5em .5em 1em colors(editor, border)

  & &__image
    width: auto
    height: auto
    max-width: 100%
    max-height: 100%
    object-fit: fill
    filter: drop-shadow(1px 1px black)

  &__description
    width: calc(100% - 10px)
    height: 160px
    padding: 5px 10px 10px
    border: 5px outset #8D9D9E
    background: rgba(0, 0, 0, .6)
    margin: 5px 5px
    overflow: hidden
    font-size: 14px

  &__line
    font-size: 11px
    font-weight: bold
    color: #101010
    border-bottom: 2px solid #101010
    text-shadow: 0 0 4px white
    margin-bottom: 10px
    

</style>
