<template lang="pug">
  LayoutContainer.logs
    template(#title)
      h1 Logs
    template(#controls)
      el-button(v-for="button of debug", :key="button.type", @click="showDebug(button)", :type="button.type") {{ button.notify }}
      el-button(@click="seeAll", type="primary") See All
    template(#filters)
      el-select(v-model="filters.type")
        el-option(label="- Filter Type -", value="")
        el-option(label="Note", value="note")
        el-option(label="Info", value="info")
        el-option(label="Success", value="success")
        el-option(label="Warning", value="warning")
        el-option(label="Error", value="error")
      el-input(placeholder="- Filter Title -", v-model="filters.title")
      el-select(v-model="filters.channel", allow-create, filterable)
        el-option(label="- Filter Channel -", value="")
        el-option(v-for="option in getCannelOptions()", :key="option", :label="option", :value="option")
    el-table(:data="page", :cell-class-name="cellClass", @row-click="rowClick", @cell-click="cellClick")
      el-table-column(prop="icon", width="40")
        template(slot-scope="{ row }")
          i.el-icon-warning(v-if="row.isNew")
          i.el-icon-s-claim(v-if="!row.isNew")
      el-table-column(prop="type", label="Type")
      el-table-column(prop="channel", label="Channel")
      el-table-column(prop="title", label="Title")
    template(#pager)
      el-pagination(background, layout="prev, pager, next", :total="items.length", :current-page.sync="pager.current")
</template>

<script>
import System from '~/client/system';

const logger = System.logger('test');

export default {
  layout: "admin",
  data() {
    return {
      pager: {
        current: 1,
      },
      logs: this.$store.state.logs.logs,
      filters: {
        type: '',
        title: '',
      },
      debug: [
        {
          type: 'note',
          notify: 'note',
        },
        {
          type: 'info',
          notify: 'info',
        },
        {
          type: 'success',
          notify: 'success',
        },
        {
          type: 'warning',
          notify: 'warning',
        },
        {
          type: 'danger',
          notify: 'error',
        },
      ],
    };
  },
  computed: {
    items() {
      return this.logs.filter((v) => {
        for (const filter in this.filters) {
          if (this.filters[filter] === '') continue;
          if (v[filter].indexOf(this.filters[filter]) === -1) return false;
        }
        return true;
      });
    },

    page() {
      return this.items.slice(this.pager.current * 10 - 10, this.pager.current * 10);
    },
  },
  methods: {
    showDebug(button) {
      logger[button.notify]({
        title: 'Test ' + button.notify,
        message: 'My Message for ' + button.notify,
        context: button,
      });
    },

    cellClass({ row }) {
      return [
        'logs__cell',
        'message__color--' + row.type,
        row.isNew ? 'logs__cell--new' : '',
      ].join(' ');
    },

    rowClick(row, column) {
      if (column.property === 'icon') return;
      this.$router.push('/admin/system/logs/' + row.id);
    },

    cellClick(row, column, cell) {
      if (column.property === 'icon' && row.isNew === true) {
        System.store.commit('logs/see', row);
      }
    },

    getCannelOptions() {
      const channels = [];

      this.logs.map((v) => {
        if (!channels.includes(v.channel)) channels.push(v.channel);
      });
      return channels;
    },

    seeAll() {
      System.store.commit('logs/seeAll');
    },
  },
}
</script>

<style lang="sass">
.logs 

  &__cell
    cursor: pointer
    position: relative
    
  &__cell--new:first-child:after
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(255, 255, 255, .4)

</style>
