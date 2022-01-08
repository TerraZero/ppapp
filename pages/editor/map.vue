<template lang="pug">
  .editor-map(:class="classes")
    .editor-map__title
      | {{ title }}
    MapDisplay.editor-map__display(ref="display", :size="size", :planes="planes", :items="items", :active="plane", :highlight="highlight", :select="select", @hover="displayHover", @click="displayClick")
    .editor-map__sidebar(@mouseover="hover = true;", @mouseout="hover = false;")
      .editor-map__sidebar-form
        EditorMapLoadForm(v-if="form === 'load'", :value="form_data", @action="onLoadAction")
        EditorMapPlaneForm(v-if="form === 'plane'", :value="form_data", :mode="form_mode", @action="onPlaneAction")
        EditorMapItemForm(v-if="form === 'item'", ref="itemform", :item="form_data", :items="items", @action="onItemAction")
      .editor-map__sidebar-content
        EditorActions.editor-map__actions(:actions="actions", @click="onAction")
        .editor-map__planes
          EditorMapPlaneItem(v-for="item, key in planes", :key="key", :plane_key="key", :plane="item", :mode="(key === plane ? mode : null)", @action="onPlaneItemAction")
</template>

<script>
import System from '~/client/system';
import API from '~/client/api/API';

const api = API.create('/api');
const logger = System.logger('editor');

export default {
  data() {
    return {
      key: '',
      title: '#',
      size: {},
      planes: {},
      items: [],

      active: null,
      highlight: null,
      hover: false,
      select: null,

      form: null,
      form_mode: null,
      form_data: null,

      plane: null,
      mode: null,
    };
  },
  computed: {
    classes() {
      const classes = [];

      if (this.hover) classes.push('editor-map--hover');
      if (this.form !== null) {
        classes.push('editor-map--open');
        classes.push('editor-map--sidebar-' + this.form);
      }
      return classes;
    },

    actions() {
      const actions = {};

      if (this.key) {
        actions.add = {
          type: 'primary',
          icon: 'plus',
        };
      }
      actions.load = {
        icon: 'edit',
      };
      return actions;
    },
  },
  methods: {
    mouseover(plane, key) {
      this.highlight = key;
    },
    mouseout() {
      this.highlight = null;
    },
    async onAction(action, key) {
      switch (key) {
        case 'load':
          this.form = 'load';
          this.form_data = {
            key: this.key,
            title: this.title,
            size: this.size,
            planes: this.planes,
          };
          break;
        case 'add':
          this.form = 'plane';
          this.form_data = {};
          this.form_mode = 'add';
          break;
      };
    },
    async onForm(key) {
      switch (key) {
        case 'cancel':
          this.formReset();
          break;
        case 'save':
          if (this.form.original_key !== this.form.key) {
            this.planes[this.form.key] = this.planes[this.form.original_key];
            for (const item of this.planes[this.form.key].items) {
              item.plane = this.form.key;
            }
            delete this.planes[this.form.original_key];
          }
          this.planes[this.form.key].title = this.form.title;
          this.planes[this.form.key].type = this.form.type;
          this.formReset();
          break;
        case 'add':
          if (this.form.key === '' || this.form.title === '' || this.form.type === '') {
            logger.error('Please fill in all fields.');
            break;
          }
          if (this.planes[this.form.key] !== undefined) {
            logger.error('This key is already in use.');
            break;
          }
          this.planes[this.form.key] = {
            type: this.form.type,
            title: this.form.title,
            items: [],
          };
          this.current = this.form.key;
          this.mode = 'add';
          this.formReset();
          break;
        case 'load':
          console.log(this.form);
          if (this.form.load === '') {
            logger.error('Please select a file.');
            break;
          }
          const response = await api.request('editor.load', {id: this.form.load});
          this.title = response.content.title;
          this.size = response.content.size;
          this.planes = response.content.planes;
          this.formReset();
          break;
      }
    },
    async onLoadAction(key, value) {
      switch (key) {
        case 'save':
          value.planes = this.planes;
          value.items = this.items;
          await api.request('editor.save', {id: value.key}, value);
          logger.success('Saved ' + value.title);
        case 'load':
        case 'edit':
          this.key = value.key;
          this.title = value.title;
          this.size = value.size;
          if (value.planes !== undefined) this.planes = value.planes;
          if (value.items !== undefined) this.items = value.items;
      }
      this.formReset();
      this.$forceUpdate();
    },
    onPlaneAction(key, value) {
      switch (key) {
        case 'add':
          this.planes = this.planes || {};
          this.planes[value.key] = {title: value.title, type: value.type, items: []};
          this.plane = value.key;
          this.mode = 'add';
          this.formReset();
          break;
        case 'close':
          this.formReset();
          break;
      }
    },
    onPlaneItemAction(action, plane, key) {
      switch (action) {
        case 'add':
        case 'del':
          if (this.mode === action && this.plane === key) {
            this.mode = null;
            this.plane = null;
          } else {
            this.mode = action;
            this.plane = key;
          }
          break;
      }
    },
    onItemAction(action, item) {
      switch (action) {
        case 'add':
          if (this.items.find(v => v.x === this.select.x && v.y === this.select.y)) {
            logger.warning('The tile have already an item.');
            break;
          }
          this.items.push({
            x: this.select.x,
            y: this.select.y,
            id: item.id,
          });
          this.$refs.itemform.$forceUpdate();
          break;
        case 'remove':
          this.items.splice(this.items.findIndex(v => v.x === this.select.x && v.y === this.select.y && v.id === item.id), 1);
          this.$refs.itemform.$forceUpdate();
          this.$refs.display.$forceUpdate();
          break;
        case 'close':
          this.select = null;
          this.formReset();
          this.$refs.display.$forceUpdate();
          break;
      }
    },
    formReset() {
      this.form = null;
      this.form_data = null;
      this.form_mode = null;
    },
    displayHover(item) {
      this.highlight = item.plane;
    },
    displayClick(item) {
      switch (this.mode) {
        case 'add':
          if (!this.plane) {
            logger.warning('No plane is selected');
            break;
          }
          if (item.plane) {
            logger.warning('This item already are in a plane');
            break;
          }
          this.planes[this.plane].items.push(item);
          item.plane = this.plane;
          this.$refs.display.$forceUpdate();
          break;
        case 'del':
          if (this.plane !== item.plane) {
            logger.warning('Tile is not in the room.');
            break;
          }
          this.planes[this.plane].items.splice(this.planes[this.plane].items.findIndex(v => v.x === item.x && v.y === item.y), 1);
          item.plane = null;
          this.$refs.display.$forceUpdate();
          break;
        case null:
          this.form = 'item';
          this.form_data = item;
          this.select = item;
          this.$refs.display.$forceUpdate();
          break;
      }
    },
  },
}
</script>

<style lang="sass">
.editor-map
  +layout__screen
  background: colors(black)
  position: relative
  display: flex

  &__title
    position: absolute
    top: 0
    left: 50%
    transform: translateX(-50px)
    padding: 5px 10px
    z-index: 1000000
    background: colors(blue)
    font-weight: bold
    font-size: 20px
    filter: drop-shadow(0 2px 6px black)
    
    &:before
      content: ''
      position: absolute
      top: 0
      right: 100%
      +triangle__top_right(20px, 37px, colors(blue))

    &:after
      content: ''
      position: absolute
      top: 0
      left: 100%
      +triangle__top_left(37px, 20px, colors(blue))

  &__display
    overflow: hidden

  &__sidebar
    width: 25px
    height: 100%
    background: colors(black)
    box-shadow: -2px 0px 10px 0px colors(black, dark-background)
    z-index: 1000
    transition: width .3s $animations__smooth
    overflow: hidden
    display: flex
    flex-shrink: 0

  &--hover &__sidebar
    width: 300px

  &--open &__sidebar
    width: 700px

  &__actions
    grid-template-columns: repeat(4, 1fr)

  &__sidebar-form
    width: 0
    height: 100%
    overflow: hidden

  &--open &__sidebar-form
    width: 400px
    padding: 5px

  &__sidebar-content
    width: 300px
    height: 100%
    display: flex
    flex-direction: column
    flex-shrink: 0
    box-shadow: -2px 0px 10px 0px colors(black, dark-background)

  &__planes
    display: flex
    flex-wrap: wrap
    flex-direction: column
    height: calc(100% - 50px)
    overflow: auto
  
</style>
