<template lang="pug">
  .control(:class="classes")
    .control__left
      .control__form
        .control__rows
          .control__row(v-for="row, index in form", :key="index")
            el-select.control__item(v-model="form[index].type", placeholder="Type")
              el-option(v-for="name, option in define.types", :key="option", :label="name.text", :value="option")
            el-select.control__item(v-model="form[index].indicator", placeholder="Level")
              el-option(v-for="number in 4", :key="number - 1", :label="'Level ' + (number - 1)", :value="number - 1")
            el-input.control__item(v-model="form[index].count", placeholder="Anzahl")
            el-button(type="primary", icon="el-icon-minus", @click="remove(index)")
        .control__actions
          el-button(type="primary", icon="el-icon-plus", @click="add") 
          el-button(type="primary", @click="submit") Submit
    ControlSidebar.control__right(:actions="actions")

</template>

<script>
import Socket from '~/plugins/socket';
import Session from '~/client/session';

const list = {
  camera: {text: 'Kamera', icon: 'camera__t.svg'},
  door: {text: 'Tür', icon: 'door__t.svg'},
  encoded: {text: 'Encoded', icon: 'encoded__t.svg'},
  enforcer: {text: 'Enforcer', icon: 'enforcer__t.svg'},
  laptop: {text: 'Laptop', icon: 'laptop__t.svg'},
  pc: {text: 'PC', icon: 'pc__t.svg'},
  person: {text: 'Person', icon: 'person__t.svg'},
  phone: {text: 'Phone', icon: 'phone__t.svg'},
  router: {text: 'Router', icon: 'router__t.svg'},
  sentry: {text: 'Sentry', icon: 'sentry__t.svg'},
  server: {text: 'Server', icon: 'server__t.svg'},
  signal: {text: 'Signal', icon: 'signal__t.svg'},
};

export default {
  data() {
    return {
      define: {
        types: list,
      },
      form: [],
      actions: [
        {
          title: 'Scan Station',
        },
        {
          title: 'Scan Station 2',
        }
      ],
    };
  },
  computed: {
    state() {
      return this.actions.length;
    },
    classes() {
      const classes = [];

      return classes;
    },
  },
  methods: {
    submit() {
      this.socket.emit('/screen', 'create', this.form);
    },
    add() {
      this.form.push({
        type: '',
        indicator: 0,
        count: '',
      });
    },
    remove(index) {
      this.form.splice(index, 1);
    },
  },
  mounted() {
    Session.instance.on('ready', (session) => {
      this.session = session;
    });
    this.socket = new Socket('/control');
    this.socket.on('input', ({ data }) => {
      this.session.set('scanned', data.scanned);
      switch (data.scanned) {
        case '2400_loc000':
          this.form = [
            {type: 'door', indicator: 0, count: '2'},
            {type: 'camera', indicator: 0, count: '3'},
            {type: 'camera', indicator: 1, count: '1'},
            {type: 'person', indicator: 2, count: '2'},
          ];
          break;
        case '2400_locA':
          this.form = [
            {type: 'laptop', indicator: 0, count: '2'},
            {type: 'pc', indicator: 0, count: '3'},
            {type: 'person', indicator: 2, count: '5'},
          ];
          break;
      }
    });
  },
}
</script>

<style lang="sass">
.control
  display: flex
  width: 100%
  height: calc(var(--vh, 1vh) * 100)
  position: relative

  &__left
    width: 100%

  &__rows
    padding-top: 10px

  &__row
    display: grid
    grid-template-columns: max-content max-content auto min-content
    grid-gap: 10px
    padding: 0 10px 10px

</style>
